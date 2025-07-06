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
}, { timestamps: true });

export default mongoose.model("Tour", tourSchema);