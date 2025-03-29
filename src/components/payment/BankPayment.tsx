import { Clock } from "lucide-react";
import { Button } from "../ui/button";
import Input from "../ui/Input";

export default function BankPayment() {
  return (
    <form className="flex flex-col space-y-4 h-full w-full max-w-[28rem]">
      <div>
        <Input label="Account Holder Name" placeholder="John Smith" />
      </div>

      <div>
        <Input label="Bank Name" placeholder="Enter your bank name" />
      </div>

      <div>
        <Input label="Account Number" placeholder="XXXXXXXX" />
      </div>

      <div>
        <Input label="Routing Number" placeholder="XXXXXXXXX" />
      </div>

      <div className="flex items-center space-x-2 p-3 bg-[#f9f5f3] rounded-lg text-[14px] text-gray-600 mt-2">
        <Clock size={16} className="text-[#7B4F3A]" />
        <span>Bank transfers typically take 2-3 business days to process</span>
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
