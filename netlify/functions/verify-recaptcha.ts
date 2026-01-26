import type { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Parse request body
  const { token } = JSON.parse(event.body || '{}');
  
  if (!token) {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, error: 'Token missing' })
    };
  }

  // Verify dengan Google reCAPTCHA
  const secretKey = process.env.RECAPTCHA_SECRET_KEY; // Ambil dari environment variable
  
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secretKey}&response=${token}`
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: data.success,
        score: data.score || null
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: 'Verification failed' })
    };
  }
};