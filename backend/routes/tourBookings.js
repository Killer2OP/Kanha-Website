const express = require('express');
const router = express.Router();
const TourBooking = require('../models/TourBooking');

// Create a new tour booking
router.post('/', async (req, res) => {
    try {
        const booking = new TourBooking(req.body);
        await booking.save();
        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all tour bookings
router.get('/', async (req, res) => {
    try {
        const bookings = await TourBooking.find();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update booking status
router.patch('/:id/status', async (req, res) => {
    try {
        const booking = await TourBooking.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;