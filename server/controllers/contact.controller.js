import { sendMail } from '../utils/email.js';

export const submitContactForm = async (req, res) => {
  try {
    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ success: false, message: 'No form data received.' });
    }

    // Build email content dynamically
    let subject = `New Contact Form Submission`;
    let text = '';
    let html = '<h2>New Contact Form Submission</h2><ul>';
    for (const [key, value] of Object.entries(data)) {
      text += `${key}: ${Array.isArray(value) ? value.join(', ') : value}\n`;
      html += `<li><strong>${key}:</strong> ${Array.isArray(value) ? value.join(', ') : value}</li>`;
    }
    html += '</ul>';

    await sendMail({
      to: "ashivam605@gmail.com",
      subject,
      text,
      html,
    });

    return res.status(200).json({ success: true, message: 'Your message has been sent successfully.' });
  } catch (error) {
    console.error('Error sending contact form email:', error);
    return res.status(500).json({ success: false, message: 'Failed to send message. Please try again later.' });
  }
}; 