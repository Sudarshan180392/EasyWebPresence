export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://www.easywebpresence.co.in');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email } = req.body;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  const LIST_ID = 2;

  try {
    /* Step 1: Add contact to Brevo list */
    const contactRes = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY
      },
      body: JSON.stringify({ email, listIds: [LIST_ID], updateEnabled: true })
    });

    if (!contactRes.ok && contactRes.status !== 204) {
      const err = await contactRes.json();
      return res.status(500).json({ error: err.message || 'Failed to add contact' });
    }

    /* Step 2: Send welcome email */
    const emailRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY
      },
      body: JSON.stringify({
        sender: { name: 'Sudarshan — Easy Web Presence', email: 'contact@easywebpresence.co.in' },
        to: [{ email }],
        subject: "You're in. Good things are coming.",
        htmlContent: `<div style="background:#0b1526;padding:48px 40px;font-family:Georgia,serif;max-width:560px;margin:0 auto;"><div style="border-bottom:1px solid rgba(201,149,74,.3);padding-bottom:24px;margin-bottom:32px;"><span style="font-size:1.3rem;font-weight:700;color:#e2b87a;">Easy <span style="color:#f4f0ea;font-weight:400;">Web Presence</span></span></div><p style="color:#f4f0ea;font-size:1.1rem;line-height:1.8;margin:0 0 20px;">Hey,</p><p style="color:#f4f0ea;font-size:1.05rem;line-height:1.8;margin:0 0 20px;font-style:italic;">Most people scroll past. You didn't.</p><p style="color:rgba(244,240,234,.75);font-size:.95rem;line-height:1.9;margin:0 0 20px;font-weight:300;">You've just joined a small, quiet list of people who care about having a web presence that actually works — not just something that looks like a website.</p><p style="color:rgba(244,240,234,.75);font-size:.95rem;line-height:1.9;margin:0 0 28px;font-weight:300;">Here's what you can expect from us: <strong style="color:#e2b87a;">no weekly newsletters.</strong> Just a single email when we publish something worth reading — practical, honest, and written from real experience. Topics we cover: tech, business, websites, and AI — the stuff that actually affects how you show up online.</p><p style="color:rgba(244,240,234,.75);font-size:.95rem;line-height:1.8;font-weight:300;margin:0 0 40px;">We're glad you're here.</p><div style="border-top:1px solid rgba(201,149,74,.3);padding-top:24px;"><p style="color:#e2b87a;font-size:.9rem;margin:0;">— Sudarshan</p><p style="color:rgba(244,240,234,.5);font-size:.8rem;margin:4px 0 0;font-style:italic;">Founder, Easy Web Presence · Creating custom-coded, fast-loading websites for people who mean business.</p></div></div>`
      })
    });

    if (!emailRes.ok) {
      const err = await emailRes.json();
      return res.status(500).json({ error: err.message || 'Failed to send welcome email' });
    }

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('Subscribe error:', err);
    return res.status(500).json({ error: 'Server error. Please try again.' });
  }
}