export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Set CORS headers to allow requests from any origin (for testing)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const { cf_token } = req.body;

  // Simulate verification: Always return success if a token is provided
  if (cf_token) {
    return res.status(200).json({
      ok: true,
      success: true, // Mimic Cloudflare's response structure
    });
  } else {
    return res.status(400).json({
      ok: false,
      error: 'No CAPTCHA token provided.',
    });
  }
}