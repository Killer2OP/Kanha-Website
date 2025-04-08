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

// Create a new hotel booking
router.post('/', async (req, res) => {
  const booking = new HotelBooking(req.body);
  try {
    const newBooking = await booking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
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