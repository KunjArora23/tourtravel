import Tour from "../models/tourSchema.models.js";
import CityTour from "../models/CitytourSchema.models.js";
import fs from "fs";
import mongoose from "mongoose";
import { uploadMedia } from "../utils/cloudinary.js";


export const createTour = async (req, res) => {
  try {
    const { title, duration, destinations, itinerary, cityId } = req.body;

    if (!title || !duration || !destinations || !cityId || !itinerary) {
      return res.status(400).json({ message: "All fields are required." });
    }

    let parsedItinerary;
    let parsedDestinations;

    try {
      parsedItinerary = JSON.parse(itinerary);
      parsedDestinations = JSON.parse(destinations);
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Invalid JSON format in itinerary or destinations." });
    }

    const city = await CityTour.findById(cityId);
    if (!city) {
      return res.status(404).json({ message: "City not found." });
    }

    let imageUrl = "";
    if (req.file) {
      try {
        const cloudinaryResponse = await uploadMedia(req.file.path);
        imageUrl = cloudinaryResponse.secure_url; // Get the secure URL of the uploaded image
      } catch (uploadErr) {
        return res.status(500).json({
          message: "Image upload failed.",
          error: uploadErr.message,
        });
      }
    }

    const newTour = new Tour({
      title,
      duration,
      destinations: parsedDestinations,
      itinerary: parsedItinerary,
      city: city._id,
      image: imageUrl || "", // optional
    });

    const savedTour = await newTour.save();

    city.tours.push(savedTour._id);
    await city.save();

    return res.status(201).json({
      message: "Tour created and linked to city successfully.",
      tour: savedTour,
    });
  } catch (error) {
    console.error("Error creating tour:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
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

export const getToursByCityId = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid city ID format" });
    }

    const tours = await Tour.find({ city: id });

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


export const updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, duration, destinations, itinerary } = req.body;
    console.log("Update Tour Request Body:", req.body);
    // Parse stringified arrays if necessary
    const parsedDestinations = typeof destinations === "string" ? JSON.parse(destinations) : destinations;
    const parsedItinerary = typeof itinerary === "string" ? JSON.parse(itinerary) : itinerary;

    // Find existing tour
    const tour = await Tour.findById(id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });

    // Handle image replacement
    if (req.file) {
      // Delete old image from Cloudinary
      if (tour.image) {
        const publicId = tour.image.split('/').pop().split('.')[0];
        await deleteMediaFromCloudinary(publicId);
      }

      // Upload new image
      const uploaded = await uploadMedia(req.file.path, "TourTravels");

      tour.image = uploaded.secure_url;
    }

    // Update other fields
    tour.title = title || tour.title;
    tour.duration = duration || tour.duration;
    tour.destinations = parsedDestinations || tour.destinations;
    tour.itinerary = parsedItinerary || tour.itinerary;

    await tour.save();
    console.log("Tour updated successfully:", tour);

    return res.status(200).json({
      message: "Tour updated successfully",
      tour,
    });
  } catch (error) {
    console.error("Error updating tour:", error);
    return res.status(500).json({
      message: "Error updating tour",
      error: error.message,
    });
  }
};

// Get featured tours for hero section
export const getFeaturedTours = async (req, res) => {
  try {
    const featuredTours = await Tour.find({ featured: true })
      .populate('city', 'name')
      .sort({ order: 1, createdAt: -1 }) // Sort by order first, then by creation date
      .limit(5); // Limit to 5 featured tours

    return res.status(200).json({
      success: true,
      count: featuredTours.length,
      tours: featuredTours,
    });
  } catch (error) {
    console.error("Error fetching featured tours:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching featured tours",
      error: error.message,
    });
  }
};

// Toggle featured status of a tour
export const toggleFeaturedTour = async (req, res) => {
  try {
    const { id } = req.params;
    
    const tour = await Tour.findById(id);
    if (!tour) {
      return res.status(404).json({ 
        success: false,
        message: "Tour not found" 
      });
    }

    // Toggle the featured status
    tour.featured = !tour.featured;
    await tour.save();

    return res.status(200).json({
      success: true,
      message: `Tour ${tour.featured ? 'marked as featured' : 'removed from featured'}`,
      tour: {
        _id: tour._id,
        title: tour.title,
        featured: tour.featured
      }
    });
  } catch (error) {
    console.error("Error toggling featured tour:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating featured status",
      error: error.message,
    });
  }
};

// Get all tours with featured status for admin management
export const getAllToursWithFeatured = async (req, res) => {
  try {
    const tours = await Tour.find()
      .populate('city', 'name')
      .sort({ order: 1, createdAt: -1 }); // Sort by order first, then by creation date

    return res.status(200).json({
      success: true,
      count: tours.length,
      tours: tours,
    });
  } catch (error) {
    console.error("Error fetching tours:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching tours",
      error: error.message,
    });
  }
};

// Update tour order
export const updateTourOrder = async (req, res) => {
  try {
    const { tourId, newOrder } = req.body;
    
    if (!tourId || newOrder === undefined) {
      return res.status(400).json({
        success: false,
        message: "Tour ID and new order are required"
      });
    }

    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found"
      });
    }

    tour.order = newOrder;
    await tour.save();

    return res.status(200).json({
      success: true,
      message: "Tour order updated successfully",
      tour: {
        _id: tour._id,
        title: tour.title,
        order: tour.order
      }
    });
  } catch (error) {
    console.error("Error updating tour order:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating tour order",
      error: error.message,
    });
  }
};

// Reorder multiple tours at once
export const reorderTours = async (req, res) => {
  try {
    const { tourOrders } = req.body; // Array of { tourId, order }
    
    if (!tourOrders || !Array.isArray(tourOrders)) {
      return res.status(400).json({
        success: false,
        message: "Tour orders array is required"
      });
    }

    // Update all tours with their new orders
    const updatePromises = tourOrders.map(({ tourId, order }) => 
      Tour.findByIdAndUpdate(tourId, { order }, { new: true })
    );

    await Promise.all(updatePromises);

    return res.status(200).json({
      success: true,
      message: "Tours reordered successfully"
    });
  } catch (error) {
    console.error("Error reordering tours:", error);
    return res.status(500).json({
      success: false,
      message: "Error reordering tours",
      error: error.message,
    });
  }
};