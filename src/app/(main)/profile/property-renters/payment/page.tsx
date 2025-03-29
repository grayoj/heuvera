"use client";

import { useState } from "react";
import AccountHeader from "@heuvera/components/ui/AccountHeader";
import CreditPayment from "@heuvera/components/payment/CreditPayment";
import PaymentSecurity from "@heuvera/components/payment/PaymentSecurity";
import BankPayment from "@heuvera/components/payment/BankPayment";
import PaymentMethod from "@heuvera/components/payment/PaymentMethod";
import ProfileLayout from "../../layout";

export default function PaymentMethods() {
  const [paymentMethod, setPaymentMethod] = useState("credit");

  return (
    <>
      <ProfileLayout>
        <AccountHeader
          heading="Payment Method"
          subheading="Securely manage and update your preferred payment options for smooth transactions."
        />

        <div className="flex justify-between">
          <div className="flex-grow mr-5">
            <PaymentMethod
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />

            {paymentMethod === "credit" && <CreditPayment />}

            {paymentMethod === "bank" && <BankPayment />}
          </div>

          <PaymentSecurity />
        </div>
      </ProfileLayout>
    </>
  );
}
