const mongoose = require('mongoose');

function generateBookingId() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `SRV-${year}${month}${day}-${random}`;
}

const serviceBookingSchema = new mongoose.Schema({
    bookingId: {
        type: String,
        unique: true,
        default: generateBookingId
    },
    serviceType: {
        type: String,
        required: true
    },
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
    date: {
        type: String,
        required: true
    },
    people: {
        type: String,
        required: true
    },
    park: {
        type: String,
        required: true
    },
    specialRequests: String,
    // Service-specific fields
    safariTime: String,
    vehicle: String,
    difficulty: String,
    equipmentRental: Boolean,
    mealPreference: String,
    photography: Boolean,
    experienceLevel: String,
    specialInterest: String,
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed', 'pending', 'confirmed', 'cancelled', 'completed'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

serviceBookingSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        if (!ret.id) {
            ret.id = ret._id;
        }
        // Format the date
        if (ret.createdAt) {
            ret.formattedDate = new Date(ret.createdAt).toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        }
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

module.exports = mongoose.model('ServiceBooking', serviceBookingSchema);