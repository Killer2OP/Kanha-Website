const express = require('express');
const router = express.Router();
const ServiceBooking = require('../models/ServiceBooking');
const nodemailer = require('nodemailer');

// Get all service bookings
router.get('/', async (req, res) => {
    try {
        const bookings = await ServiceBooking.find().sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        console.error('Error fetching service bookings:', error);
        res.status(500).json({ error: 'Failed to fetch service bookings' });
    }
});

// Create a new service booking
router.post('/', async (req, res) => {
    try {
        console.log("Received booking request:", req.body);
        
        // Check for required fields
        const requiredFields = ['serviceType', 'name', 'email', 'phone', 'date', 'people', 'park'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            return res.status(400).json({ 
                error: `Missing required fields: ${missingFields.join(', ')}`,
                receivedData: req.body
            });
        }
        
        // Service-specific validation
        if (req.body.serviceType === 'Jungle Safari' && !req.body.safariTime) {
            return res.status(400).json({ error: 'Safari time is required for Jungle Safari bookings' });
        }
        
        const booking = new ServiceBooking(req.body);
        const savedBooking = await booking.save();
        
        // Send confirmation email
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD
                }
            });

            const serviceName = req.body.serviceType;
            const parkName = req.body.park === 'kanha' ? 'Kanha National Park' : 
                            req.body.park === 'bandhavgarh' ? 'Bandhavgarh National Park' : 
                            'Pench National Park';

            await transporter.sendMail({
                from: `"Kanha National Park" <${process.env.EMAIL_USER}>`,
                to: req.body.email,
                subject: `Your ${serviceName} Booking Confirmation - ${parkName}`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
                        <h2 style="color: #2e7d32;">Booking Confirmation</h2>
                        <p>Dear ${req.body.name},</p>
                        <p>Thank you for booking the <strong>${serviceName}</strong> at ${parkName}. We have received your request and it is currently being processed.</p>
                        <p><strong>Booking Details:</strong></p>
                        <ul>
                            <li>Booking ID: ${savedBooking.bookingId}</li>
                            <li>Service: ${serviceName}</li>
                            <li>Date: ${req.body.date}</li>
                            <li>Number of People: ${req.body.people}</li>
                            <li>Park: ${parkName}</li>
                        </ul>
                        <p>Our team will review your booking and get back to you shortly with confirmation details.</p>
                        <p>If you have any questions, please feel free to contact us.</p>
                        <p>Best regards,<br>Kanha National Park Team</p>
                    </div>
                `
            });
        } catch (emailError) {
            console.error('Error sending confirmation email:', emailError);
            // Continue with the response even if email fails
        }

        res.status(201).json(savedBooking);
    } catch (error) {
        console.error('Error creating service booking:', error);
        res.status(400).json({ 
            error: 'Failed to create service booking', 
            details: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

// Get a specific booking
router.get('/:id', async (req, res) => {
    try {
        const booking = await ServiceBooking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.json(booking);
    } catch (error) {
        console.error('Error fetching booking:', error);
        res.status(500).json({ error: 'Failed to fetch booking' });
    }
});

// Update booking status
// Add this route to update booking status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }
    
    const booking = await ServiceBooking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    // Send email notification about status change
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });
      
      const statusMessages = {
        confirmed: 'has been confirmed',
        cancelled: 'has been cancelled',
        completed: 'has been marked as completed'
      };
      
      const parkName = booking.park === 'kanha' ? 'Kanha National Park' : 
                      booking.park === 'bandhavgarh' ? 'Bandhavgarh National Park' : 
                      'Pench National Park';
      
      await transporter.sendMail({
        from: `"Kanha National Park" <${process.env.EMAIL_USER}>`,
        to: booking.email,
        subject: `Your ${booking.serviceType} Booking ${statusMessages[status] || 'Status Updated'} - ${parkName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <h2 style="color: #2e7d32;">Booking Status Update</h2>
            <p>Dear ${booking.name},</p>
            <p>Your booking for <strong>${booking.serviceType}</strong> at ${parkName} ${statusMessages[status] || 'has been updated'}.</p>
            <p><strong>Booking Details:</strong></p>
            <ul>
              <li>Booking ID: ${booking.bookingId}</li>
              <li>Service: ${booking.serviceType}</li>
              <li>Date: ${new Date(booking.date).toLocaleDateString()}</li>
              <li>Number of People: ${booking.people}</li>
              <li>Park: ${parkName}</li>
              <li>Status: ${status.charAt(0).toUpperCase() + status.slice(1)}</li>
            </ul>
            <p>If you have any questions, please feel free to contact us.</p>
            <p>Best regards,<br>Kanha National Park Team</p>
          </div>
        `
      });
    } catch (emailError) {
      console.error('Error sending status update email:', emailError);
      // Continue with the response even if email fails
    }
    
    res.json(booking);
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ error: 'Failed to update booking status' });
  }
});

// Delete a booking
router.delete('/:id', async (req, res) => {
    try {
        const booking = await ServiceBooking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).json({ error: 'Failed to delete booking' });
    }
});

module.exports = router;