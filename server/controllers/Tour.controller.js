import Tour from "../models/tourSchema.models.js";
import CityTour from "../models/CitytourSchema.models.js";
import fs from "fs";


export const createTour = async (req, res) => {
  try {
    // console.log("Files received:", req.files);
    console.log("Body received:", req.body);
    const { title, duration, destinations, itinerary,cityId } = req.body;
   
    let parsedItinerary;
    let parsedDestinations;

   
    console.log("City ID:", cityId);
    console.log("Title:", title);
    console.log("Duration:", duration);
    console.log("Destinations:", destinations);   
    console.log("Itinerary:", itinerary);

    if (!title || !duration || !destinations || !cityId || !itinerary) {
      return res.status(400).json({ message: "All fields are required." });
    }

     try {
      parsedItinerary = JSON.parse(itinerary);
      parsedDestinations = JSON.parse(destinations);
    } catch (err) {
      return res.status(400).json({ message: "Invalid JSON format in itinerary or destinations." });
    }

   

    const city = await CityTour.findById(cityId);
    if (!city) {
      return res.status(404).json({ message: "City not found." });
    }

    // const imageUrls = [];

    // ✅ Upload images to Cloudinary
    // for (const file of req.files.slice(0, 5)) {
    //   const result = await uploadMedia(file.path, "TourTravels");

    //   if (result?.secure_url) {
    //     imageUrls.push(result.secure_url);

    //     // Clean up local file
    //     fs.unlink(file.path, (err) => {
    //       if (err) console.error("Error deleting temp file:", err);
    //     });
    //   }
    // }

    const newTour = new Tour({
      title,
      duration,
      destinations:parsedDestinations,
      itinerary:parsedItinerary,
      city: city._id,
      // images: imageUrls
    });

    const savedTour = await newTour.save();

    city.tours.push(savedTour._id);
    await city.save();

    return res.status(201).json({
      message: "Tour created and linked to city successfully.",
      tour: savedTour
    });

  } catch (error) {
    console.error("Error creating tour:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};


export const getTourById = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findById(id);

    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    return res.status(200).json({ tour });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching tour",
      error: error.message,
    });
  }
};



export const getToursByCityId = async (req, res) => {
  try {
    const { cityId } = req.params;
    console.log("Fetching tours for city ID:", cityId);

    const tours = await Tour.find({ cityId });

    if (!tours || tours.length === 0) {
      return res.status(404).json({ message: "No tours found for this city" });
    }

    return res.status(200).json({
      message: "Tours for the city fetched successfully",
      totalTours: tours.length,
      tours,
    });
  } catch (error) {
    console.error("Error fetching tours by city:", error);
    return res.status(500).json({
      message: "Error fetching tours by city",
      error: error.message,
    });
  }
};