const express = require('express');
const router = express.Router();
const multer = require('multer');
const nodemailer = require('nodemailer');
const upload = multer({ storage: multer.memoryStorage() });

// Change from '/send-ticket' to '/'
router.post('/', upload.single('pdf'), async (req, res) => {
  try {
    const { email, customerName, bookingType } = req.body;
    const pdfBuffer = req.file.buffer;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Your ${bookingType === 'tourTicket' ? 'Tour' : 'Hotel'} Booking Confirmation - Kanha National Park`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Dear ${customerName},</h2>
          <p>Thank you for choosing Kanha National Park. Please find your booking confirmation ticket attached.</p>
          <p>We look forward to hosting you!</p>
          <br/>
          <p>Best regards,</p>
          <p>Kanha National Park Team</p>
        </div>
      `,
      attachments: [
        {
          filename: req.file.originalname,
          content: pdfBuffer
        }
      ]
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Ticket sent successfully' });
  } catch (error) {
    console.error('Error sending ticket:', error);
    res.status(500).json({ message: 'Failed to send ticket' });
  }
});

module.exports = router;