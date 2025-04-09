const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Enquiry = require('../models/Enquiry');

// Get all enquiries
router.get('/', async (req, res) => {
    try {
        const enquiries = await Enquiry.find().sort({ date: -1 });
        res.json(enquiries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new enquiry
router.post('/', async (req, res) => {
    try {
        const enquiry = new Enquiry({
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.message,
            status: 'New'
        });

        const newEnquiry = await enquiry.save();
        res.status(201).json(newEnquiry);
    } catch (error) {
        console.error('Error creating enquiry:', error);
        res.status(400).json({ message: error.message });
    }
});

// Update enquiry status
router.put('/:id/status', async (req, res) => {
  try {
    const enquiry = await Enquiry.findOneAndUpdate(
      { _id: req.params.id },  // Change from id to _id
      { status: req.body.status },
      { new: true }
    );
    
    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }
    
    res.json(enquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Send reply via email
router.post('/:enquiryId/reply', async (req, res) => {
  try {
    const { message } = req.body;
    
    const enquiry = await Enquiry.findOne({ enquiryId: req.params.enquiryId });
    
    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: enquiry.email,
      subject: `Re: ${enquiry.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Dear ${enquiry.name},</h2>
          <p>${message}</p>
          <br/>
          <p>Best regards,</p>
          <p>Kanha National Park Team</p>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Update enquiry status and reply
    enquiry.status = 'Responded';
    enquiry.reply = message;
    await enquiry.save();

    res.json(enquiry);
  } catch (error) {
    console.error('Error sending reply:', error);
    res.status(500).json({ message: 'Failed to send reply' });
  }
});

module.exports = router;