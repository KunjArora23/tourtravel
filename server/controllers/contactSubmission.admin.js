import ContactSubmission from '../models/contactSubmission.model.js';

// GET /api/v1/contact/admin/submissions?page=1&limit=20&email=...&date=...
export const getAllContactSubmissions = async (req, res) => {
  try {
    const { page = 1, limit = 20, email, date } = req.query;
    const query = {};
    if (email) query.email = email;
    if (date) query.meetingDate = date;
    const submissions = await ContactSubmission.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await ContactSubmission.countDocuments(query);
    res.json({
      success: true,
      data: submissions,
      total,
      page: Number(page),
      limit: Number(limit),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch submissions', error: error.message });
  }
}; 