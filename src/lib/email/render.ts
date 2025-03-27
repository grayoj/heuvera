import { render } from '@react-email/render';
import React from 'react';
import WelcomeEmailTemplate from './WelcomeEmail';
import BookingConfirmationEmailTemplate from './BookingConfirmationEmail';
import BookingCancellationEmailTemplate from './BookingCancellationEmail';
import HostApprovalEmailTemplate from './HostApprovalEmail';
import ListingConfirmationEmail from './ListingConfirmationEmail';

export async function getWelcomeEmail(
  userName: string,
  exploreLink: string,
): Promise<string> {
  const emailElement = React.createElement(WelcomeEmailTemplate, {
    userName,
    exploreLink,
  });
  return await render(emailElement);
}

export async function getBookingConfirmationMail(
  guestName: string,
  propertyName: string,
  propertyLocation: string,
  checkInDate: string,
  checkOutDate: string,
  guestCount: number,
  totalPrice: string,
  bookingDetailsLink: string,
): Promise<string> {
  const emailElement = React.createElement(BookingConfirmationEmailTemplate, {
    guestName,
    propertyName,
    propertyLocation,
    checkInDate,
    checkOutDate,
    guestCount,
    totalPrice,
    bookingDetailsLink,
  });

  return await render(emailElement);
}

export async function getBookingCancellationMail(
  guestName: string,
  propertyName: string,
  propertyLocation: string,
  checkInDate: string,
  checkOutDate: string,
): Promise<string> {
  const emailElement = React.createElement(BookingCancellationEmailTemplate, {
    guestName,
    propertyName,
    propertyLocation,
    checkInDate,
    checkOutDate,
  });

  return await render(emailElement);
}

export async function getHostApprovalMail(
  userName: string,
  dashboardLink: string,
): Promise<string> {
  const emailElement = React.createElement(HostApprovalEmailTemplate, {
    userName,
    dashboardLink,
  });
  return await render(emailElement);
}

export async function getListingConfirmationMail(
  hostName: string,
  listingTitle: string,
  listingImage: string,
  listingDetailsLink: string,
): Promise<string> {
  const emailElement = React.createElement(ListingConfirmationEmail, {
    hostName,
    listingTitle,
    listingImage,
    listingDetailsLink,
  });

  return await render(emailElement);
}
