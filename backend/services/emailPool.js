require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  pool: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  secure: true,
  rateLimit: 10,
  maxConnections: 5,
  maxMessages: 300,
});

module.exports = { transporter };
