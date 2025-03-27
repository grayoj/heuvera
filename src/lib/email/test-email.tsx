import { render } from '@react-email/render';
import { writeFileSync } from 'fs';
import React from 'react';

async function generateEmail<T extends object>(
  Component: React.ComponentType<T>,
  props: T,
  outputFile = 'email.html',
) {
  try {
    const html = await render(<Component {...props} />);
    writeFileSync(outputFile, html);
    console.log(`Email rendered successfully. Open ${outputFile} to preview.`);
  } catch (error) {
    console.error('Error rendering email:', error);
  }
}

import ListingConfirmationEmail from './ListingConfirmationEmail';

generateEmail(ListingConfirmationEmail, {
  hostName: 'John Doe',
  listingTitle: 'Cozy Beach House',
  listingImage: 'https://via.placeholder.com/600',
  listingDetailsLink: 'https://yourapp.com/listings/123',
});
