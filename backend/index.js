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
// Update CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'https://mpjunglesafari.com'], // Include all possible frontend URLs
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// Import routes
const safariBookingRoutes = require('./routes/safariBookings');
const hotelBookingRoutes = require('./routes/hotelBookings');
const serviceBookingRoutes = require('./routes/serviceBookings');
const whatsappRoutes = require('./routes/whatsapp');
const enquiryRoutes = require('./routes/enquiryRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const adminDashboardRoutes = require('./routes/adminDashboard');
const tourBookingRoutes = require('./routes/tourBookings');

// Routes
app.use('/api', emailRoutes);
app.use('/api/safari-bookings', safariBookingRoutes);
app.use('/api/hotel-bookings', hotelBookingRoutes);
app.use('/api/bookings', serviceBookingRoutes);
app.use('/api', whatsappRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/send-ticket', ticketRoutes);
app.use('/api/admin', adminDashboardRoutes);
app.use('/api/tour-bookings', tourBookingRoutes);


// Connect to MongoDB with improved error handling and options
const connectWithRetry = () => {
  console.log('Attempting to connect to MongoDB...');
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Increased timeout to 30s
    socketTimeoutMS: 45000, // Socket timeout
    family: 4, // Use IPv4, skip trying IPv6
    maxPoolSize: 10, // Maintain up to 10 socket connections
    connectTimeoutMS: 30000, // Give up initial connection after 30 seconds
    retryWrites: true
  })
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    if (err.message.includes('authentication failed')) {
      console.log('Authentication failed. Please check your username and password in the connection string.');
    } else {
      console.log('Will retry connection in 5 seconds...');
      setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
    }
  });
};

connectWithRetry();

// Basic route
app.get('/', (req, res) => {
  res.send('Safari and Hotel Booking API is running');
});

// Health check endpoint
app.get('/health', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatus = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  res.json({
    status: 'ok',
    timestamp: new Date(),
    database: {
      state: dbStatus[dbState],
      readyState: dbState
    },
    uptime: process.uptime()
  });
});

// Start server
const PORT = process.env.PORT || 7000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});