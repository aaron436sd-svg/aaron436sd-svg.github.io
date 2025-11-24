// Netlify Function: send-contact
// Forwards contact form submissions to SendGrid. Requires environment variables:
// SENDGRID_API_KEY, RECIPIENT_EMAIL. Optional: SENDER_EMAIL.

let fetchImpl = global.fetch;
try {
  if (!fetchImpl) fetchImpl = require('node-fetch');
} catch (e) {
  // node-fetch not available; rely on global fetch (Netlify/node 18+)
}

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch (err) {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { name, email, message } = data || {};
  if (!name || !email || !message) {
    return { statusCode: 400, body: 'Missing fields' };
  }

  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL;
  const SENDER_EMAIL = process.env.SENDER_EMAIL || 'no-reply@akacfaetkezde.local';

  if (!SENDGRID_API_KEY || !RECIPIENT_EMAIL) {
    return { statusCode: 500, body: 'Email service not configured' };
  }

  const payload = {
    personalizations: [
      { to: [{ email: RECIPIENT_EMAIL }], subject: `Contact from website: ${name}` }
    ],
    from: { email: SENDER_EMAIL, name: 'Akácfa Étkezde Website' },
    reply_to: { email: email, name: name },
    content: [ { type: 'text/plain', value: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}` } ]
  };

  try {
    const res = await fetchImpl('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SENDGRID_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const text = await res.text();
      return { statusCode: res.status || 502, body: `SendGrid error: ${text}` };
    }

    return { statusCode: 200, body: 'Message sent' };
  } catch (err) {
    console.error('send-contact error', err);
    return { statusCode: 500, body: `Server error: ${err.message || err}` };
  }
};
