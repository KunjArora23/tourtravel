import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema({
  day: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});


const tourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: String, required: true },
  destinations: [{ type: String, required: true }],
  itinerary: [itinerarySchema],
  // images: [{ type: String }], // ✅ Store image URLs or file paths
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CityTour",
    required: true
  },
  image: { type: String }, // Store the image URL or path
  featured: { type: Boolean, default: false }, // Mark tours for hero section display
  order: { type: Number, default: 0 }, // Custom ordering for admin panel
}, { timestamps: true });

export default mongoose.model("Tour", tourSchema);