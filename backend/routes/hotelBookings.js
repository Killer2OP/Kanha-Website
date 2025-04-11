const express = require('express');
const router = express.Router();
const HotelBooking = require('../models/HotelBooking');

// Get all hotel bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await HotelBooking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new hotel booking with improved error handling and timeout
router.post('/', async (req, res) => {
  const booking = new HotelBooking(req.body);
  try {
    // Set a timeout for the save operation
    const saveWithTimeout = async (model, timeoutMs = 30000) => {
      return Promise.race([
        model.save(),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Operation timed out')), timeoutMs)
        )
      ]);
    };

    // Try to save with a 30-second timeout
    const newBooking = await saveWithTimeout(booking, 30000);
    console.log('Hotel booking created successfully:', newBooking.id);
    res.status(201).json(newBooking);
  } catch (error) {
    console.error('Error creating hotel booking:', error);
    // Provide more detailed error message
    if (error.name === 'MongoServerError' && error.code === 11000) {
      return res.status(400).json({
        message: 'A booking with this ID already exists',
        error: error.message
      });
    }
    res.status(500).json({
      message: 'Failed to create booking',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Update booking status
router.patch('/:id/status', async (req, res) => {
  try {
    const booking = await HotelBooking.findOne({ id: req.params.id });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = req.body.status;
    if (req.body.status === 'Confirmed') {
      booking.paymentStatus = 'Paid';
    }

    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a specific booking
router.get('/:id', async (req, res) => {
  try {
    const booking = await HotelBooking.findOne({ id: req.params.id });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;