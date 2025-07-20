const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Sends an email with the given subject and HTML content.
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The email subject line.
 * @param {string} html - The HTML body of the email.
 */
const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: `"Credit Card App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log(`✅ Email sent to ${to}`);
  } catch (err) {
    console.error("❌ Email sending failed:", err);
    throw new Error("Failed to send email.");
  }
};

module.exports = sendEmail;
