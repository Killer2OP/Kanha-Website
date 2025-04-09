const mongoose = require('mongoose');

function generateEnquiryId() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `ENQ-${year}${month}${day}-${random}`;
}

const enquirySchema = new mongoose.Schema({
    enquiryId: {
        type: String,
        unique: true,
        default: generateEnquiryId
    },
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    subject: {
        type: String,
        default: 'General Enquiry'
    },
    message: { 
        type: String, 
        required: true 
    },
    date: { 
        type: Date, 
        default: Date.now
    },
    status: { 
        type: String, 
        default: 'New' 
    },
    reply: String
});

enquirySchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        if (!ret.id) {
            ret.id = ret._id;
        }
        // Format the date
        if (ret.date) {
            ret.date = new Date(ret.date).toLocaleString('en-US', {
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

module.exports = mongoose.model('Enquiry', enquirySchema);