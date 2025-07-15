import { sendMail } from '../utils/email.js';
import { DateTime } from 'luxon';
import ContactSubmission from '../models/contactSubmission.model.js';

const TIMEZONE = 'Asia/Kolkata';
const SLOT_START = 7; // 7:00 AM
const SLOT_END = 23.5; // 11:30 PM
const SLOT_INTERVAL = 0.5; // 30 minutes

function generateTimeSlots() {
  const slots = [];
  for (let h = SLOT_START; h <= SLOT_END; h += SLOT_INTERVAL) {
    const hour = Math.floor(h);
    const minute = h % 1 === 0 ? '00' : '30';
    slots.push(`${hour.toString().padStart(2, '0')}:${minute}`);
  }
  return slots;
}
const TIME_SLOTS = generateTimeSlots();

// In-memory store for booked slots (replace with DB in production)
const bookedSlots = {};

export const availableSlots = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ success: false, message: 'Date is required' });
    // Only allow booking from tomorrow onwards
    const today = DateTime.now().setZone(TIMEZONE);
    const reqDate = DateTime.fromISO(date, { zone: TIMEZONE });
    const tomorrow = today.plus({ days: 1 }).startOf('day');
    if (reqDate < tomorrow) {
      return res.status(400).json({ success: false, message: 'Bookings allowed from tomorrow onwards' });
    }
    // Get booked slots for the date
    const booked = bookedSlots[date] || [];
    // Enforce 30-min gap between slots (e.g., 7:00-7:30, next slot 8:00-8:30)
    let lastBookedIndex = -2;
    const available = TIME_SLOTS.filter((slot, idx) => {
      if (booked.includes(slot)) return false;
      // Enforce 30-min gap: skip slot if previous slot is booked
      if (lastBookedIndex >= 0 && idx - lastBookedIndex === 1) return false;
      if (booked.includes(TIME_SLOTS[idx - 1])) return false;
      if (booked.includes(TIME_SLOTS[idx + 1])) return false;
      return true;
    });
    return res.json({ success: true, slots: available });
  } catch (error) {
    console.error('Error fetching available slots:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch available slots' });
  }
};

export const submitContactForm = async (req, res) => {
  try {
    const data = req.body;
    console.log('Received contact form data:', data);
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ success: false, message: 'No form data received.' });
    }
    // Handle slot booking if present
    let slotIST = null;
    let slotUser = null;
    let slotBooked = false;
    let slotError = null;
    if (data.meetingDate && data.meetingTime && data.userTimeZone) {
      const today = DateTime.now().setZone(TIMEZONE);
      const reqDate = DateTime.fromISO(data.meetingDate, { zone: TIMEZONE });
      const tomorrow = today.plus({ days: 1 }).startOf('day');
      if (reqDate < tomorrow) {
        slotError = 'Bookings allowed from tomorrow onwards';
      } else {
        bookedSlots[data.meetingDate] = bookedSlots[data.meetingDate] || [];
        if (bookedSlots[data.meetingDate].includes(data.meetingTime)) {
          slotError = 'Selected time slot is not available. Please choose another.';
        } else {
          bookedSlots[data.meetingDate].push(data.meetingTime);
          slotBooked = true;
          const istDateTime = DateTime.fromISO(`${data.meetingDate}T${data.meetingTime}:00`, { zone: TIMEZONE });
          slotIST = istDateTime.toFormat('yyyy-MM-dd HH:mm zzz');
          slotUser = istDateTime.setZone(data.userTimeZone).toFormat('yyyy-MM-dd HH:mm zzz');
        }
      }
    }
    // Save submission to DB
    await ContactSubmission.create({
      ...data,
      slotIST,
      slotUser,
    });
    // Build email content dynamically
    let subject = `New Contact Form Submission`;
    let text = '';
    let html = '<h2>New Contact Form Submission</h2><ul>';
    for (const [key, value] of Object.entries(data)) {
      text += `${key}: ${Array.isArray(value) ? value.join(', ') : value}\n`;
      html += `<li><strong>${key}:</strong> ${Array.isArray(value) ? value.join(', ') : value}</li>`;
    }
    if (slotBooked && slotIST && slotUser) {
      text += `\nSlot (IST): ${slotIST}\nSlot (User Time): ${slotUser}\n`;
      html += `<li><strong>Slot (IST):</strong> ${slotIST}</li>`;
      html += `<li><strong>Slot (User Time):</strong> ${slotUser}</li>`;
    }
    html += '</ul>';
    if (slotError) {
      html += `<p style="color:red"><b>Slot Error:</b> ${slotError}</p>`;
      text += `\nSlot Error: ${slotError}\n`;
    }
    await sendMail({
      to: 'ashivam605@gmail.com',
      subject,
      text,
      html,
    });
    if (slotError) {
      return res.status(409).json({ success: false, message: slotError });
    }
    return res.status(200).json({ success: true, message: 'Your message has been sent successfully.' });
  } catch (error) {
    console.error('Error sending contact form email:', error);
    return res.status(500).json({ success: false, message: 'Failed to send message. Please try again later.' });
  }
}; 