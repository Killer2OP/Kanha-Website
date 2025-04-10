const mongoose = require('mongoose');

const tourBookingSchema = new mongoose.Schema({
    tourId: String,
    tourName: String,
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    guests: {
        type: Number,
        required: true
    },
    checkIn: {
        type: String,
        required: true
    },
    checkOut: {
        type: String,
        required: true
    },
    specialRequests: String,
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled'],
        default: 'Pending'
    },
    amount: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('TourBooking', tourBookingSchema);