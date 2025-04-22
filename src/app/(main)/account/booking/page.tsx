"use client";

import dynamic from "next/dynamic";

const BookingHistory = dynamic(() => import("@heuvera/components/profile/guests/BookingHistory"))

export default function BookingsHistory() {
  return (
    <BookingHistory />
  );
}