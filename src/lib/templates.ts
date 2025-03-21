/**
 * Generates the complete welcome email HTML template.
 * @param {string} userName - The name of the user.
 * @param {string} exploreLink - URL for the "Start Exploring" button.
 * @returns {string} - The full HTML content of the email.
 */
export function getWelcomeTemplate(
  userName: string,
  exploreLink: string,
): string {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Welcome to Heuvera</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f4f4; padding: 40px 0;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; padding: 30px; border-radius: 8px; border: 1px solid #ddd; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <!-- Logo -->
                    <tr>
                        <td align="center" style="padding: 20px 0;">
                            <img src="https://yzub7xjzmf.ufs.sh/f/p5WCAJ95HVcjzNlGDk4hqBZ5bN2HwXOd8mA0UrnlSKEJ9PWi" alt="Heuvera" width="40" style="display: block;">
                        </td>
                    </tr>
                    <!-- Greeting & Message -->
                    <tr>
                        <td style="font-size: 16px; color: #333; padding: 20px 30px; text-align: left;">
                            <p> Hi ${userName}, <br /> Thanks for joining Heuvera! We're excited to help you discover amazing places to stay around the world. Now that you're logged in, let's get you started on finding your next memorable stay.</p>
                        </td>
                    </tr>
                    <!-- CTA Button -->
                    <tr>
                        <td align="center" style="padding: 20px;">
                            <a href="${exploreLink}" style="background-color: #7B4F3B; color: #ffffff; text-decoration: none; padding: 14px 30px; font-weight: bold; display: inline-block; border-radius: 6px;">Start Exploring</a>
                        </td>
                    </tr>
                    <!-- Features Section -->
                    <tr>
                        <td style="background-color: #f9f5f3; padding: 20px 30px; border-radius: 8px; text-align: left;">
                            <p style="color: #7B4F3B; font-weight: bold; font-size: 18px;">What you can do on Heuvera:</p>
                            <ul style="padding-left: 20px; color: #333; line-height: 1.6;">
                                <li>🏡 Browse unique stays from local hosts</li>
                                <li>🔎 Use filters to find places that match your style and budget</li>
                                <li>🔒 Book securely with our protected payment system</li>
                            </ul>
                        </td>
                    </tr>
                    <!-- Support Message -->
                    <tr>
                        <td style="font-size: 15px; color: #333; padding: 20px 30px; text-align: left;">
                            Need any help getting started? Our support team is available <strong>24/7</strong> to assist you.
                        </td>
                    </tr>
                    <!-- Team Info -->
                    <tr>
                        <td align="center" style="padding: 30px;">
                            <p style="color: #7B4F3B; font-size: 16px;"><strong>The Heuvera Team</strong></p>
                        </td>
                    </tr>
                    <!-- Social Links -->
                    <tr>
                        <td align="center" style="padding: 20px;">
                            <a href="#" style="color: #7B4F3B; text-decoration: none; margin: 0 10px; font-weight: bold;">Facebook</a> |
                            <a href="#" style="color: #7B4F3B; text-decoration: none; margin: 0 10px; font-weight: bold;">Twitter</a> |
                            <a href="#" style="color: #7B4F3B; text-decoration: none; margin: 0 10px; font-weight: bold;">Instagram</a>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td align="center" style="font-size: 12px; color: #666; padding: 20px 30px; border-top: 1px solid #eee;">
                            © 2025 Heuvera. All rights reserved. <br>
                            <a href="#" style="color: #7B4F3B; text-decoration: none;">Unsubscribe</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `;
}

export function getBookingConfirmationEmailTemplate({
  guestName,
  propertyName,
  propertyLocation,
  checkInDate,
  checkOutDate,
  guestCount,
  totalPrice,
  bookingDetailsLink,
}: {
  guestName: string;
  propertyName: string;
  propertyLocation: string;
  checkInDate: string;
  checkOutDate: string;
  guestCount: number;
  totalPrice: string;
  bookingDetailsLink: string;
}) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <title>Booking Confirmation - Heuvera</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="padding: 40px 0;">
          <tr>
              <td align="center">
                  <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; padding: 30px; border-radius: 8px; border: 1px solid #ddd; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                      <tr>
                          <td align="center" style="padding: 20px 0;">
                              <img src="https://yzub7xjzmf.ufs.sh/f/p5WCAJ95HVcjzNlGDk4hqBZ5bN2HwXOd8mA0UrnlSKEJ9PWi" alt="Heuvera" width="40" style="display: block;">
                          </td>
                      </tr>
                      <tr>
                          <td style="font-size: 16px; color: #333; padding: 20px 30px; text-align: left;">
                              <p>Hi ${guestName},</p>
                              <p>Great news! Your booking at <strong>${propertyName}</strong> has been successfully confirmed. 🎉</p>
                              <p>Here are your stay details:</p>
                          </td>
                      </tr>
                      <tr>
                          <td style="background-color: #f9f5f3; padding: 20px 30px; border-radius: 8px; text-align: left;">
                              <p style="color: #7B4F3B; font-weight: bold; font-size: 18px;">Your Booking Details:</p>
                              <ul style="padding-left: 20px; color: #333; line-height: 1.6;">
                                  <li><strong>🏡 Property:</strong> ${propertyName}</li>
                                  <li><strong>📍 Location:</strong> ${propertyLocation}</li>
                                  <li><strong>🗓 Check-in:</strong> ${checkInDate}</li>
                                  <li><strong>🛏 Check-out:</strong> ${checkOutDate}</li>
                                  <li><strong>👥 Guests:</strong> ${guestCount}</li>
                                  <li><strong>💳 Total Price:</strong> ${totalPrice}</li>
                              </ul>
                          </td>
                      </tr>
                      <tr>
                          <td align="center" style="padding: 20px;">
                              <a href="${bookingDetailsLink}" style="background-color: #7B4F3B; color: #ffffff; text-decoration: none; padding: 14px 30px; font-weight: bold; display: inline-block; border-radius: 6px;">View Booking</a>
                          </td>
                      </tr>
                      <tr>
                          <td style="font-size: 15px; color: #333; padding: 20px 30px; text-align: left;">
                              <p>📌 <strong>Check-in Instructions:</strong> Your host will provide the check-in details before your arrival. If you have any questions, feel free to reach out.</p>
                              <p>We hope you have an amazing stay!</p>
                          </td>
                      </tr>
                      <tr>
                          <td style="font-size: 15px; color: #333; padding: 20px 30px; text-align: left;">
                              Need any assistance? Our support team is available <strong>24/7</strong> to help you.
                          </td>
                      </tr>
                      <tr>
                          <td align="center" style="font-size: 12px; color: #666; padding: 20px 30px; border-top: 1px solid #eee;">
                              © 2025 Heuvera. All rights reserved. <br>
                              <a href="#" style="color: #7B4F3B; text-decoration: none;">Cancel Booking</a> | 
                              <a href="#" style="color: #7B4F3B; text-decoration: none;">Contact Support</a>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
  </body>
  </html>
  `;
}

export function getBookingCancellationEmailTemplate({
  guestName,
  propertyName,
  propertyLocation,
  checkInDate,
  checkOutDate,
}: {
  guestName: string;
  propertyName: string;
  propertyLocation: string;
  checkInDate: string;
  checkOutDate: string;
}) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <title>Booking Cancelled - Heuvera</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" padding: 40px 0;">
          <tr>
              <td align="center">
                  <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" 
                    style="background-color: #ffffff; padding: 30px; border-radius: 8px; 
                    border: 1px solid #ddd; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                      <!-- Logo -->
                      <tr>
                          <td align="center" style="padding: 20px 0;">
                              <img src="https://yzub7xjzmf.ufs.sh/f/p5WCAJ95HVcjzNlGDk4hqBZ5bN2HwXOd8mA0UrnlSKEJ9PWi" 
                              alt="Heuvera" width="40" style="display: block;">
                          </td>
                      </tr>
                      <!-- Booking Cancellation -->
                      <tr>
                          <td style="font-size: 16px; color: #333; padding: 20px 30px; text-align: left;">
                              <p>Hi ${guestName},</p>
                              <p>We’re sorry to inform you that your booking at <strong>${propertyName}</strong> has been cancelled. 😔</p>
                              <p>Here were your stay details:</p>
                          </td>
                      </tr>
                      <!-- Booking Details -->
                      <tr>
                          <td style="background-color: #f9f5f3; padding: 20px 30px; border-radius: 8px; text-align: left;">
                              <p style="color: #7B4F3B; font-weight: bold; font-size: 18px;">Cancelled Booking Details:</p>
                              <ul style="padding-left: 20px; color: #333; line-height: 1.6;">
                                  <li><strong>🏡 Property:</strong> ${propertyName}</li>
                                  <li><strong>📍 Location:</strong> ${propertyLocation}</li>
                                  <li><strong>🗓 Check-in:</strong> ${checkInDate}</li>
                                  <li><strong>🛏 Check-out:</strong> ${checkOutDate}</li>
                              </ul>
                          </td>
                      </tr>
                      <!-- Support Message -->
                      <tr>
                          <td style="font-size: 15px; color: #333; padding: 20px 30px; text-align: left;">
                              If you have any questions or need assistance, our support team is available <strong>24/7</strong> to help you.
                          </td>
                      </tr>
                      <!-- Footer -->
                      <tr>
                          <td align="center" style="font-size: 12px; color: #666; padding: 20px 30px; border-top: 1px solid #eee;">
                              © 2025 Heuvera. All rights reserved. <br>
                              <a href="https://heuvera.com/contact" style="color: #7B4F3B; text-decoration: none;">Contact Support</a>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
  </body>
  </html>
  `;
}
