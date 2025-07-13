import Review from "../models/review.model.js";
import { uploadMedia, deleteMediaFromCloudinary } from "../utils/cloudinary.js";

// Create a new review
export const createReview = async (req, res) => {
  try {
    const { customerName, rating, review } = req.body;

    if (!customerName || !rating || !review) {
      return res.status(400).json({ 
        success: false, 
        message: "Customer name, rating, and review are required." 
      });
    }

    // Validate rating
    const ratingNum = parseInt(rating);
    if (ratingNum < 1 || ratingNum > 5) {
      return res.status(400).json({ 
        success: false, 
        message: "Rating must be between 1 and 5." 
      });
    }

    let imageUrl = "";
    if (req.file) {
      try {
        const cloudinaryResponse = await uploadMedia(req.file.path, "Reviews");
        imageUrl = cloudinaryResponse.secure_url;
      } catch (uploadErr) {
        return res.status(500).json({
          success: false,
          message: "Image upload failed.",
          error: uploadErr.message,
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Customer image is required."
      });
    }

    const newReview = new Review({
      customerName,
      rating: ratingNum,
      review,
      image: imageUrl
    });

    const savedReview = await newReview.save();

    return res.status(201).json({
      success: true,
      message: "Review created successfully.",
      review: savedReview,
    });
  } catch (error) {
    console.error("Error creating review:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get all reviews (for admin)
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({}).sort({ order: 1, createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching reviews",
      error: error.message,
    });
  }
};

// Get active reviews (for public display)
export const getActiveReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ isActive: true }).sort({ order: 1, createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    console.error("Error fetching active reviews:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching reviews",
      error: error.message,
    });
  }
};

// Get review by ID
export const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({ 
        success: false, 
        message: "Review not found" 
      });
    }

    return res.status(200).json({ 
      success: true, 
      review 
    });
  } catch (error) {
    console.error("Error fetching review:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching review",
      error: error.message,
    });
  }
};

// Update review
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { customerName, rating, review, isActive } = req.body;

    const existingReview = await Review.findById(id);
    if (!existingReview) {
      return res.status(404).json({ 
        success: false, 
        message: "Review not found" 
      });
    }

    // Validate rating if provided
    if (rating) {
      const ratingNum = parseInt(rating);
      if (ratingNum < 1 || ratingNum > 5) {
        return res.status(400).json({ 
          success: false, 
          message: "Rating must be between 1 and 5." 
        });
      }
      existingReview.rating = ratingNum;
    }

    // Handle image replacement
    if (req.file) {
      // Delete old image from Cloudinary
      if (existingReview.image) {
        const publicId = existingReview.image.split('/').pop().split('.')[0];
        await deleteMediaFromCloudinary(publicId);
      }

      // Upload new image
      const uploaded = await uploadMedia(req.file.path, "Reviews");
      existingReview.image = uploaded.secure_url;
    }

    // Update other fields
    if (customerName) existingReview.customerName = customerName;
    if (review) existingReview.review = review;
    if (typeof isActive === 'boolean') existingReview.isActive = isActive;

    await existingReview.save();

    return res.status(200).json({
      success: true,
      message: "Review updated successfully",
      review: existingReview,
    });
  } catch (error) {
    console.error("Error updating review:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating review",
      error: error.message,
    });
  }
};

// Delete review
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ 
        success: false, 
        message: "Review not found" 
      });
    }

    // Delete image from Cloudinary
    if (review.image) {
      const publicId = review.image.split('/').pop().split('.')[0];
      await deleteMediaFromCloudinary(publicId);
    }

    await Review.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting review",
      error: error.message,
    });
  }
};

// Toggle review status (active/inactive)
export const toggleReviewStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ 
        success: false, 
        message: "Review not found" 
      });
    }

    review.isActive = !review.isActive;
    await review.save();

    return res.status(200).json({
      success: true,
      message: `Review ${review.isActive ? 'activated' : 'deactivated'} successfully`,
      review,
    });
  } catch (error) {
    console.error("Error toggling review status:", error);
    return res.status(500).json({
      success: false,
      message: "Error toggling review status",
      error: error.message,
    });
  }
}; 

// Update review order
export const updateReviewOrder = async (req, res) => {
  try {
    const { reviewId, newOrder } = req.body;
    
    if (!reviewId || newOrder === undefined) {
      return res.status(400).json({
        success: false,
        message: "Review ID and new order are required"
      });
    }

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found"
      });
    }

    review.order = newOrder;
    await review.save();

    return res.status(200).json({
      success: true,
      message: "Review order updated successfully",
      review: {
        _id: review._id,
        customerName: review.customerName,
        order: review.order
      }
    });
  } catch (error) {
    console.error("Error updating review order:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating review order",
      error: error.message,
    });
  }
};

// Reorder multiple reviews at once
export const reorderReviews = async (req, res) => {
  try {
    const { reviewOrders } = req.body; // Array of { reviewId, order }
    
    if (!reviewOrders || !Array.isArray(reviewOrders)) {
      return res.status(400).json({
        success: false,
        message: "Review orders array is required"
      });
    }

    // Update all reviews with their new orders
    const updatePromises = reviewOrders.map(({ reviewId, order }) => 
      Review.findByIdAndUpdate(reviewId, { order }, { new: true })
    );

    await Promise.all(updatePromises);

    return res.status(200).json({
      success: true,
      message: "Reviews reordered successfully"
    });
  } catch (error) {
    console.error("Error reordering reviews:", error);
    return res.status(500).json({
      success: false,
      message: "Error reordering reviews",
      error: error.message,
    });
  }
}; 