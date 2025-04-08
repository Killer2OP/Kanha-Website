const express = require('express');
const router = express.Router();
const twilio = require('twilio');

// Add validation for environment variables
if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_WHATSAPP_NUMBER) {
  console.error('Missing required Twilio environment variables');
}

// Initialize Twilio client with your credentials
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

router.post('/send-whatsapp', async (req, res) => {
  try {
    const { phone, message } = req.body;
    
    if (!phone || !message) {
      return res.status(400).json({ error: 'Phone number and message are required' });
    }

    // Format phone number (ensure it includes country code)
    const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`; // Assuming Indian numbers

    console.log('Sending WhatsApp message to:', formattedPhone);
    
    // Send message via Twilio WhatsApp
    const result = await client.messages.create({
      body: message,
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${formattedPhone}`
    });

    console.log('Twilio response:', result.sid);
    res.status(200).json({ success: true, messageId: result.sid });

  } catch (error) {
    console.error('Detailed WhatsApp notification error:', {
      message: error.message,
      code: error.code,
      status: error.status,
      moreInfo: error.moreInfo
    });
    
    res.status(500).json({ 
      error: 'Failed to send WhatsApp notification',
      details: error.message 
    });
  }
});

module.exports = router;