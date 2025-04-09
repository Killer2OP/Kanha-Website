const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const emailRoutes = require('./routes/emailRoutes');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const safariBookingRoutes = require('./routes/safariBookings');
const hotelBookingRoutes = require('./routes/hotelBookings');
const whatsappRoutes = require('./routes/whatsapp');

// Routes
app.use('/api', emailRoutes);  // Add this line
app.use('/api/safari-bookings', safariBookingRoutes);
app.use('/api/hotel-bookings', hotelBookingRoutes);
app.use('/api', whatsappRoutes);  // Moved here after app initialization

// Connect to MongoDB with improved error handling and options
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  family: 4 // Use IPv4, skip trying IPv6
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    if (err.message.includes('authentication failed')) {
      console.log('Authentication failed. Please check your username and password in the connection string.');
    }
  });

// Routes
app.use('/api/safari-bookings', safariBookingRoutes);
app.use('/api/hotel-bookings', hotelBookingRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Safari and Hotel Booking API is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});