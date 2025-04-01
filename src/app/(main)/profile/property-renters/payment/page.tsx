"use client";

import { useState } from "react";
import AccountHeader from "@heuvera/components/ui/AccountHeader";
import CreditPayment from "@heuvera/components/payment/CreditPayment";
import PaymentSecurity from "@heuvera/components/payment/PaymentSecurity";
import BankPayment from "@heuvera/components/payment/BankPayment";
import PaymentMethod from "@heuvera/components/payment/PaymentMethod";

export default function PaymentMethods() {
  const [paymentMethod, setPaymentMethod] = useState("credit");

  return (
    <>
      <AccountHeader
        heading="Payment Method"
        subheading="Securely manage and update your preferred payment options for smooth transactions."
      />

      <div className="">
        <div className="my-5">
          <PaymentMethod
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        </div>
        <div className="flex justify-between flex-grow flex-col md:flex-col lg:flex-col xl:flex-row mr-5">
          {paymentMethod === "credit" && <CreditPayment />}

          {paymentMethod === "bank" && <BankPayment />}
          <PaymentSecurity />
        </div>
      </div>
    </>
  );
}
