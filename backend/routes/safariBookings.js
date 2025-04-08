const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const SafariBooking = require('../models/SafariBooking');

// GET all safari bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await SafariBooking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Update booking status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const booking = await SafariBooking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.json(booking);
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ error: 'Failed to update booking status' });
  }
});

// Add the send-ticket route
router.post('/:id/send-ticket', async (req, res) => {
  try {
    const {
      bookingId,
      name,
      email,
      phone,
      parkName,
      safariTypeName,
      date,
      time,
      guests,
      totalAmount,
      nationality
    } = req.body;

    // Create temp directory if it doesn't exist
    const tempDir = path.join(__dirname, '../temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    // Create PDF
    const doc = new PDFDocument();
    const pdfPath = path.join(tempDir, `${bookingId}.pdf`);
    doc.pipe(fs.createWriteStream(pdfPath));

    // Add content to PDF
    doc.fontSize(25).text('Safari Booking Ticket', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12);
    doc.text(`Booking ID: ${bookingId}`);
    doc.text(`Name: ${name}`);
    doc.text(`Email: ${email}`);
    doc.text(`Phone: ${phone}`);
    doc.text(`Park: ${parkName}`);
    doc.text(`Safari Type: ${safariTypeName}`);
    doc.text(`Date: ${date}`);
    doc.text(`Time: ${time}`);
    doc.text(`Number of Guests: ${guests}`);
    doc.text(`Total Amount: ₹${totalAmount}`);
    doc.text(`Nationality: ${nationality}`);
    doc.end();

    // Wait for PDF to be created
    await new Promise((resolve) => doc.on('end', resolve));

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Send email with PDF attachment
    await transporter.sendMail({
      from: `"Kanha Safari Booking" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your Safari Booking Ticket',
      html: `
        <h2>Safari Booking Confirmation</h2>
        <p>Dear ${name},</p>
        <p>Thank you for booking a safari with us. Please find your ticket attached.</p>
        <p><strong>Important:</strong> Please arrive 30 minutes before the scheduled time.</p>
        <p>Best regards,<br>Kanha Safari Team</p>
      `,
      attachments: [{
        filename: 'safari-ticket.pdf',
        path: pdfPath
      }]
    });

    // Delete the temporary PDF file
    fs.unlinkSync(pdfPath);

    res.status(200).json({ message: 'Ticket sent successfully' });
  } catch (error) {
    console.error('Error sending ticket:', error);
    res.status(500).json({ error: 'Failed to send ticket', details: error.message });
  }
});

module.exports = router;