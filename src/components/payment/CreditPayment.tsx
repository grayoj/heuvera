import { Lock } from "lucide-react";
import { Button } from "../ui/button";
import Input from "../ui/Input";

export default function CreditPayment() {
  return (
    <form className="flex flex-col space-y-4 h-full w-full max-w-[28rem]">
      <div className="flex space-x-4">
        <div className="flex-grow">
          <Input label="Cardholder Name" placeholder="John Smith" />
        </div>
      </div>

      <div>
        <Input label="Card Number" placeholder="XXXX XXXX XXXX XXXX" />
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <Input label="Expiry Date" placeholder="MM/YY" />
        </div>
        <div className="flex-1">
          <Input
            label="CVC"
            placeholder="XXX"
            // type="password"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 mt-2">
        <input
          type="checkbox"
          id="saveCard"
          className="rounded text-[#7B4F3A]"
        />
        <label htmlFor="saveCard" className="text-[14px] text-gray-700">
          Save card for future payments
        </label>
      </div>

      <div className="flex items-center space-x-2 p-3 bg-[#f9f5f3] rounded-lg text-[14px] text-gray-600 mt-2">
        <Lock size={16} className="text-[#7B4F3A]" />
        <span>
          Your payment information is secured with end-to-end encryption
        </span>
      </div>

      <Button
        variant="default"
        className="bg-[#7B4F3A] py-[0.6875rem] px-[2.5rem] rounded-full hover:bg-[#664130] hover:cursor-pointer mt-4"
      >
        Save Payment Method
      </Button>
    </form>
  );
}
