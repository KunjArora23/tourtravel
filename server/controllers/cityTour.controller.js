
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
    const cities = await CityTour.find({}, "_id title description image tours order")
      .sort({ order: 1, createdAt: -1 }); // Sort by order first, then by creation date

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
      select: "title duration destinations image", // only fetch required fields
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

// controllers/cityController.js


export const getCityById = async (req, res) => {
  try {
    const { id } = req.params;

    const city = await CityTour.findById(id);

    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    return res.status(200).json({
      message: "City fetched successfully",
      city,
    });
  } catch (error) {
    console.error("Error fetching city by ID:", error);
    return res.status(500).json({
      message: "Error fetching city",
      error: error.message,
    });
  }
};


// Update City Controller
export const updateCity = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // Find the existing city
    const city = await CityTour.findById(id);
    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    // If a new image file is provided, upload it and delete the old one
    let newImageUrl = city.image; // default to existing image
    if (req.file) {
      // Upload new image to Cloudinary
      const uploaded = await uploadMedia(req.file.path, "TourTravels");

      // Delete old image from Cloudinary
      if (city.image) {
        const publicId = city.image.split('/').pop().split('.')[0];
        await deleteMediaFromCloudinary(publicId);
      }

      newImageUrl = uploaded.secure_url;
    }

    // Update the city fields
    city.title = title || city.title;
    city.description = description || city.description;
    city.image = newImageUrl;

    // Save the updated city
    const updatedCity = await city.save();

    return res.status(200).json({
      message: "City updated successfully",
      city: updatedCity,
    });

  } catch (error) {
    console.error("Error updating city:", error);
    return res.status(500).json({
      message: "Internal server error while updating city",
      error: error.message,
    });
  }
};

// Update city order
export const updateCityOrder = async (req, res) => {
  try {
    const { cityId, newOrder } = req.body;
    
    if (!cityId || newOrder === undefined) {
      return res.status(400).json({
        success: false,
        message: "City ID and new order are required"
      });
    }

    const city = await CityTour.findById(cityId);
    if (!city) {
      return res.status(404).json({
        success: false,
        message: "City not found"
      });
    }

    city.order = newOrder;
    await city.save();

    return res.status(200).json({
      success: true,
      message: "City order updated successfully",
      city: {
        _id: city._id,
        title: city.title,
        order: city.order
      }
    });
  } catch (error) {
    console.error("Error updating city order:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating city order",
      error: error.message,
    });
  }
};

// Reorder multiple cities at once
export const reorderCities = async (req, res) => {
  try {
    const { cityOrders } = req.body; // Array of { cityId, order }
    
    if (!cityOrders || !Array.isArray(cityOrders)) {
      return res.status(400).json({
        success: false,
        message: "City orders array is required"
      });
    }

    // Update all cities with their new orders
    const updatePromises = cityOrders.map(({ cityId, order }) => 
      CityTour.findByIdAndUpdate(cityId, { order }, { new: true })
    );

    await Promise.all(updatePromises);

    return res.status(200).json({
      success: true,
      message: "Cities reordered successfully"
    });
  } catch (error) {
    console.error("Error reordering cities:", error);
    return res.status(500).json({
      success: false,
      message: "Error reordering cities",
      error: error.message,
    });
  }
};