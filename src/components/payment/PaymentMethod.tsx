import { CalendarSearch, CreditCard } from "lucide-react";

export default function PaymentMethod({
  paymentMethod,
  setPaymentMethod,
}: {
  paymentMethod: string;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="mb-6">
      <h2 className="text-[1.25rem] font-normal mb-[.94rem]">
        Select Payment Method
      </h2>

      <div className="flex space-x-4 mb-6">
        <div
          className={`border rounded-lg p-4 flex items-center space-x-3 cursor-pointer w-40 ${paymentMethod === "credit" ? "border-[#7B4F3A] dark:border-[#8B5F4D] bg-[#f9f5f3] dark:bg-[#44444444]" : "border-gray-200 dark:border-[#444444]"}`}
          onClick={() => setPaymentMethod("credit")}
        >
          <CreditCard
            className="text-[#7B4F3A] dark:text-[#8B5F4D]"
            size={20}
          />
          <span className="font-medium">Credit Card</span>
        </div>

        <div
          className={`border rounded-lg p-4 flex items-center space-x-3 cursor-pointer w-40 ${paymentMethod === "bank" ? "border-[#7B4F3A] dark:border-[#8B5F4D] bg-[#f9f5f3] dark:bg-[#44444444]" : "border-gray-200 dark:border-[#444444]"}`}
          onClick={() => setPaymentMethod("bank")}
        >
          <CalendarSearch
            className="text-[#7B4F3A] dark:text-[#8B5F4D]"
            size={20}
          />
          <span className="font-medium">Bank Transfer</span>
        </div>
      </div>
    </div>
  );
}
