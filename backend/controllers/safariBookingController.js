const SafariBooking = require('../models/SafariBooking');
const nodemailer = require('nodemailer');

// Create a new safari booking
exports.createSafariBooking = async (req, res) => {
  try {
    const bookingData = req.body;
    
    // Create new booking
    const newBooking = new SafariBooking(bookingData);
    await newBooking.save();
    
    // Send confirmation email
    await sendConfirmationEmail(newBooking);
    
    res.status(201).json({
      success: true,
      message: 'Safari booking created successfully',
      booking: newBooking,
    });
  } catch (error) {
    console.error('Error creating safari booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create safari booking',
      error: error.message,
    });
  }
};

// Get all safari bookings
exports.getAllSafariBookings = async (req, res) => {
  try {
    const bookings = await SafariBooking.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error('Error fetching safari bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch safari bookings',
      error: error.message,
    });
  }
};

// Update safari booking status
exports.updateSafariBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const booking = await SafariBooking.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Safari booking not found',
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Safari booking status updated successfully',
      booking,
    });
  } catch (error) {
    console.error('Error updating safari booking status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update safari booking status',
      error: error.message,
    });
  }
};

// Helper function to send confirmation email
const sendConfirmationEmail = async (booking) => {
  try {
    // Configure nodemailer (replace with your email service details)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: booking.email,
      subject: 'Safari Booking Confirmation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #2e7d32; text-align: center;">Safari Booking Confirmation</h2>
          <p>Dear ${booking.name},</p>
          <p>Thank you for booking a safari with us. Your booking details are as follows:</p>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p><strong>Booking Reference:</strong> ${booking._id}</p>
            <p><strong>Park:</strong> ${booking.parkName}</p>
            <p><strong>Safari Type:</strong> ${booking.safariTypeName}</p>
            <p><strong>Date:</strong> ${booking.formattedDate}</p>
            <p><strong>Time:</strong> ${booking.time}</p>
            <p><strong>Number of Guests:</strong> ${booking.guests}</p>
            <p><strong>Total Amount:</strong> ₹${booking.totalAmount.toLocaleString()}</p>
          </div>
          
          <p>Your booking status is currently <strong>pending</strong>. We will confirm your booking shortly.</p>
          <p>If you have any questions, please contact us.</p>
          
          <p style="text-align: center; margin-top: 30px; color: #666;">Thank you for choosing our safari services!</p>
        </div>
      `,
    };
    
    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent successfully');
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
};