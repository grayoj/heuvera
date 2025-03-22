import { NextResponse } from 'next/server';

const PLUNK_API_KEY = process.env.PLUNK_API_KEY;
const PLUNK_API_URL = 'https://api.useplunk.com/v1/send';

/**
 * Sends an email via Plunk API
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} body - HTML email content
 */
export async function sendEmail(to: string, subject: string, body: string) {
  if (!PLUNK_API_KEY) {
    console.error('PLUNK_API_KEY is missing');
    return NextResponse.json(
      { error: 'Email service not configured' },
      { status: 500 },
    );
  }

  const payload = {
    to,
    from: 'no-reply@heuvera.com',
    subject,
    body,
  };

  try {
    const response = await fetch(PLUNK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${PLUNK_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(
        `Failed to send email: ${response.statusText} - ${errorDetails}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending email:', error);
    return null;
  }
}
