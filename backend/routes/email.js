const express = require("express");
const router = express.Router();
const multer = require("multer");
const xlsx = require("xlsx");
const { getIO } = require("../socket");
const { sendEmail, fillTemplate } = require("../utils/templteHelper");
const { transporter } = require("../services/emailPool");

const upload = multer({ dest: "uploads/" });

router.post("/send-email", upload.single("excel"), async (req, res) => {
  try {
    const filepath = req.file.path;
    const { subject, template, socketId } = req.body;
    const workbook = xlsx.readFile(filepath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);
    const io = getIO();

    const results = [];

    for (const row of data) {
      try {
        const html = fillTemplate(template, row);
        await sendEmail(row.email, subject, html);

        if (socketId) {
          io.to(socketId).emit("email-status", {
            email: row.email,
            status: "success",
          });
        }

        results.push({ email: row.email, status: "success" });
      } catch (error) {
        if (socketId) {
          io.to(socketId).emit("email-status", {
            email: row.email,
            status: "failed",
            error: error.message,
          });
        }

        results.push({ email: row.email, status: "failed", error });
      }
    }

    transporter.close();
    res.status(200).json({
      status: 200,
      message: "Email sent successfully",
      results,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

module.exports = router;
