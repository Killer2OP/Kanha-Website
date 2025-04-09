const express = require('express');
const router = express.Router();
const SafariBooking = require('../models/SafariBooking');
const HotelBooking = require('../models/HotelBooking');
const ServiceBooking = require('../models/ServiceBooking'); // Add this line
const Enquiry = require('../models/Enquiry');

router.get('/dashboard-stats', async (req, res) => {
    try {
        // Get total and pending bookings
        const totalSafariBookings = await SafariBooking.countDocuments();
        const totalHotelBookings = await HotelBooking.countDocuments();
        const totalServiceBookings = await ServiceBooking.countDocuments(); // Add this line
        const pendingSafariBookings = await SafariBooking.countDocuments({ status: 'pending' });
        const pendingHotelBookings = await HotelBooking.countDocuments({ status: 'pending' });
        const pendingServiceBookings = await ServiceBooking.countDocuments({ status: 'Pending' }); // Add this line

        // Get total and pending enquiries
        const totalEnquiries = await Enquiry.countDocuments();
        const pendingEnquiries = await Enquiry.countDocuments({ status: 'New' });

        // Get recent bookings
        const recentSafariBookings = await SafariBooking.find()
            .sort({ createdAt: -1 })
            .limit(3);
        const recentHotelBookings = await HotelBooking.find()
            .sort({ createdAt: -1 })
            .limit(3);
        const recentServiceBookings = await ServiceBooking.find() // Add this block
            .sort({ createdAt: -1 })
            .limit(3);

        // Combine and format recent bookings
        const recentBookings = [...recentSafariBookings, ...recentHotelBookings, ...recentServiceBookings] // Update this line
            .sort((a, b) => b.createdAt - a.createdAt)
            .slice(0, 3)
            .map(booking => ({
                id: booking._id,
                name: booking.name,
                type: booking.bookingType || booking.serviceType || (booking.safariType ? 'Safari' : 'Hotel'), // Update this line
                date: booking.createdAt,
                amount: booking.totalAmount || 'N/A',
                status: booking.status
            }));

        // Get recent enquiries
        const recentEnquiries = await Enquiry.find()
            .sort({ createdAt: -1 })
            .limit(3)
            .select('name subject createdAt status');

        res.json({
            totalBookings: totalSafariBookings + totalHotelBookings + totalServiceBookings, // Update this line
            pendingBookings: pendingSafariBookings + pendingHotelBookings + pendingServiceBookings, // Update this line
            totalEnquiries,
            pendingEnquiries,
            recentBookings,
            recentEnquiries: recentEnquiries.map(enquiry => ({
                id: enquiry._id,
                name: enquiry.name,
                subject: enquiry.subject,
                date: enquiry.createdAt,
                status: enquiry.status
            }))
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ error: 'Failed to fetch dashboard stats' });
    }
});

// Add a route to get all service bookings for the admin dashboard
router.get('/service-bookings', async (req, res) => {
    try {
        const bookings = await ServiceBooking.find().sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        console.error('Error fetching service bookings:', error);
        res.status(500).json({ error: 'Failed to fetch service bookings' });
    }
});

module.exports = router;