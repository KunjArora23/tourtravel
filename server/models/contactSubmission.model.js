import mongoose from 'mongoose';

const contactSubmissionSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  inquiryType: String,
  subject: String,
  message: String,
  // Tailor-made fields
  countryCode: String,
  country: String,
  adults: Number,
  children: Number,
  startDate: String,
  endDate: String,
  destinations: [String],
  hotelCategory: String,
  interests: String,
  specialRequests: String,
  // Booking slot fields
  meetingDate: String,
  meetingTime: String,
  userTimeZone: String,
  slotIST: String,
  slotUser: String,
  // Metadata
  createdAt: { type: Date, default: Date.now },
}, { collection: 'contact_submissions' });

export default mongoose.model('ContactSubmission', contactSubmissionSchema); 