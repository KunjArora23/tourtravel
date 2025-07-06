import mongoose from "mongoose";


const cityTourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  tours: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour', // ✅ reference matches model name
  }],
});

export default mongoose.model('CityTour', cityTourSchema);