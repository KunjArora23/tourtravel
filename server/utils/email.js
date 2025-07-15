import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "kunjhacker@gmail.com",
    pass: "esyjjwgqvbzznjgn",
  },
});

export const sendMail = async ({ to, subject, text, html }) => {
  const info = await transporter.sendMail({
    from: "kunjhacker@gmail.com",
    to,
    subject,
    text,
    html,
  });
  return info;
}; 