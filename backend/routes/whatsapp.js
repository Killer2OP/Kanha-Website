const express = require('express');
const router = express.Router();
const twilio = require('twilio');

// Initialize Twilio client with your credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
const apiKeySid = process.env.TWILIO_API_KEY_SID; // Your API Key SID
const apiKeySecret = process.env.TWILIO_API_KEY_SECRET; // Your API Key Secret

const client = require('twilio')(apiKeySid, apiKeySecret, { accountSid: accountSid });

router.post('/send-whatsapp', async (req, res) => {
  try {
    const { phone, message } = req.body;
    
    if (!phone || !message) {
      return res.status(400).json({ error: 'Phone number and message are required' });
    }

    // Format phone number (ensure it includes country code)
    const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;

    console.log('Attempting to send WhatsApp message...');
    console.log('From:', process.env.TWILIO_WHATSAPP_NUMBER);
    console.log('To:', formattedPhone);

    const result = await client.messages.create({
      body: message,
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${formattedPhone}`
    });

    console.log('Message sent successfully:', result.sid);
    res.status(200).json({ 
      success: true, 
      messageId: result.sid 
    });

  } catch (error) {
    console.error('WhatsApp Error Details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      status: error.status
    });
    
    res.status(500).json({ 
      error: 'Failed to send WhatsApp notification',
      details: error.message,
      code: error.code
    });
  }
});

module.exports = router;