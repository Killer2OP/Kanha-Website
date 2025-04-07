const mongoose = require('mongoose');

const safariBookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    enum: ['indian', 'foreign'],
    required: true,
  },
  safariType: {
    type: String,
    required: true,
  },
  safariTypeName: {
    type: String,
    required: true,
  },
  guests: {
    type: String,
    required: true,
  },
  park: {
    type: String,
    required: true,
  },
  parkName: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  formattedDate: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('SafariBooking', safariBookingSchema);