const express = require('express');
const router = express.Router();
const safariBookingController = require('../controllers/safariBookingController');

// Create a new safari booking
router.post('/', safariBookingController.createSafariBooking);

// Get all safari bookings
router.get('/', safariBookingController.getAllSafariBookings);

// Update safari booking status
router.patch('/:id/status', safariBookingController.updateSafariBookingStatus);

module.exports = router;