import { AlertCircle } from "lucide-react";
import { Button } from "../ui/button";

export default function PaymentSecurity() {
  return (
    <div className="w-72 bg-[#f9f5f3] p-6 rounded-lg h-fit">
      <h3 className="font-medium text-lg mb-4 flex items-center">
        <AlertCircle size={18} className="mr-2 text-[#7B4F3A]" />
        Payment Security
      </h3>
      <ul className="space-y-3 text-sm text-gray-700">
        <li className="flex items-start">
          <div className="h-5 w-5 rounded-full bg-[#7B4F3A] text-white flex items-center justify-center text-xs mr-2 mt-0.5">
            ✓
          </div>
          <span>All transactions are secured with 256-bit encryption</span>
        </li>
        <li className="flex items-start">
          <div className="h-5 w-5 rounded-full bg-[#7B4F3A] text-white flex items-center justify-center text-xs mr-2 mt-0.5">
            ✓
          </div>
          <span>We never store your complete card details on our servers</span>
        </li>
        <li className="flex items-start">
          <div className="h-5 w-5 rounded-full bg-[#7B4F3A] text-white flex items-center justify-center text-xs mr-2 mt-0.5">
            ✓
          </div>
          <span>24/7 fraud monitoring to protect your account</span>
        </li>
        <li className="flex items-start">
          <div className="h-5 w-5 rounded-full bg-[#7B4F3A] text-white flex items-center justify-center text-xs mr-2 mt-0.5">
            ✓
          </div>
          <span>Compatible with all major payment networks</span>
        </li>
      </ul>
      <div className="border-t mt-4 pt-4">
        <p className="text-sm text-gray-600">Need help with payments?</p>
        <Button
          variant="outline"
          className="mt-2 w-full border-[#7B4F3A] text-[#7B4F3A] hover:bg-[#f9f5f3]"
        >
          Contact Support
        </Button>
      </div>
    </div>
  );
}
