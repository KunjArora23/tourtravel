
import CityTour from "../models/CitytourSchema.models.js";
import Tour from "../models/tourSchema.models.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";


export const createCity = async (req, res) => {
  try {

    const { title, description } = req.body;
    const image = req.file?.path; // Assuming you're using multer to handle file uploads


    if (!title || !description) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }
    if (!image) {
      return res.status(400).json({
        message: "Image is required"
      });
    }



    const cloudinaryResponse = await uploadMedia(image);

    const imageUrl = cloudinaryResponse.secure_url; // Get the secure URL of the uploaded image


    const newCity = new CityTour({
      title,
      description,
      image: imageUrl // Use the secure URL from Cloudinary
    });

    const savedCity = await newCity.save();
    return res.status(201).json({
      message: "City created successfully",
      city: savedCity
    });

  } catch (error) {
    console.log("error in createCity controller", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
}



export const getAllCities = async (req, res) => {
  try {
    const cities = await CityTour.find({}, "_id title description image "); // exclude tours

    res.status(200).json({
      success: true,
      count: cities.length,
      data: cities,
    });
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// controllers/cityTour.controller.js


export const getCityWithTours = async (req, res) => {
  try {
    const { id } = req.params;

    const city = await CityTour.findById(id).populate({
      path: "tours",
      select: "title duration destinations", // only fetch required fields
    });

    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    return res.status(200).json({ city });
  } catch (error) {
    console.error("Error fetching city with tours:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

export const deleteCity = async (req, res) => {
  try {
    const { id } = req.params;

    // Step 1: Delete the city
    const city = await CityTour.findByIdAndDelete(id);
    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    // Step 2: Delete the city's image from Cloudinary (if any)
    if (city.image) {
      const publicId = city.image.split('/').pop().split('.')[0];
      await deleteMediaFromCloudinary(publicId);
    }

    // Step 3: Find all tours linked to this city
    const tours = await Tour.find({ cityId: id });

    // Step 4: Delete each tour's image from Cloudinary
    for (const tour of tours) {
      if (tour.image) {
        const tourImagePublicId = tour.image.split('/').pop().split('.')[0];
        await deleteMediaFromCloudinary(tourImagePublicId);
      }
    }

    // Step 5: Delete all tour documents from the DB
    await Tour.deleteMany({ cityId: id });

    return res.status(200).json({
      message: "City and its linked tours deleted successfully",
      deletedCity: city,
      deletedToursCount: tours.length,
    });

  } catch (error) {
    console.error("Error deleting city and its tours:", error);
    return res.status(500).json({
      message: "Error deleting city and its linked tours",
      error: error.message,
    });
  }
};



export const deleteTour = async (req, res) => {
  try {
    const { id } = req.params;

    // Step 1: Find and delete the tour from DB
    const tour = await Tour.findByIdAndDelete(id);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    // Step 2: Delete tour image from Cloudinary (if exists)
    if (tour.image) {
      const publicId = tour.image.split('/').pop().split('.')[0];
      await deleteMediaFromCloudinary(publicId);
    }

    return res.status(200).json({
      message: "Tour deleted successfully",
      deletedTour: tour,
    });

  } catch (error) {
    console.error("Error deleting tour:", error);
    return res.status(500).json({
      message: "Error deleting tour",
      error: error.message,
    });
  }
};