"use client";

import dynamic from "next/dynamic";

const PaymentMethods = dynamic(() => import("@heuvera/components/profile/guests/PaymentMethod"))

export default function PaymentMethod() {
  return (
    <PaymentMethods />
  );
}
