const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

// Handle feedback form submission
router.post("/feedback", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Create transporter (use Gmail)
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,     // your Gmail from .env
        pass: process.env.GMAIL_PASS,     // 16-char App Password
      },
    });

    // Email content
    let mailOptions = {
      from: process.env.GMAIL_USER,  // must be your Gmail
      replyTo: email,                // user email
      to: "stayanytime.contact@gmail.com",  // where you want to receive feedback
      subject: `New Feedback from ${name}`,
      text: `You received a new feedback:\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    req.flash("success","✅ Thank you for your feedback! We’ll get back to you soon.");
    res.redirect("/listings");
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Failed to send feedback. Please try again.");
  }
});

module.exports = router;
