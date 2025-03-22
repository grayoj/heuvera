'use client'

import { useState } from 'react';
import { CreditCard, Lock, Clock, AlertCircle, CalendarSearch } from 'lucide-react';
import { Button } from '@heuvera/components/ui/button';
import Input from '@heuvera/components/ui/Input';

export default function Page() {
  const [paymentMethod, setPaymentMethod] = useState('credit');
  
  return (
    <>
      <div className="border-b pb-5 mb-5">
        <h2 className="text-[1.25rem] font-medium">Payment Method</h2>
        <p className="text-[#898989] font-normal text-[14px]">
          Securely manage and update your preferred payment options for smooth transactions.
        </p>
      </div>

      <div className="flex justify-between">
        <div className="flex-grow mr-5">
          <div className="mb-6">
            <h2 className="text-[1.25rem] font-normal mb-[.94rem]">
              Select Payment Method
            </h2>
            
            <div className="flex space-x-4 mb-6">
              <div 
                className={`border rounded-lg p-4 flex items-center space-x-3 cursor-pointer w-40 ${paymentMethod === 'credit' ? 'border-[#7B4F3A] bg-[#f9f5f3]' : 'border-gray-200'}`}
                onClick={() => setPaymentMethod('credit')}
              >
                <CreditCard className="text-[#7B4F3A]" size={20} />
                <span className="font-medium">Credit Card</span>
              </div>
              
              <div 
                className={`border rounded-lg p-4 flex items-center space-x-3 cursor-pointer w-40 ${paymentMethod === 'bank' ? 'border-[#7B4F3A] bg-[#f9f5f3]' : 'border-gray-200'}`}
                onClick={() => setPaymentMethod('bank')}
              >
                <CalendarSearch className="text-[#7B4F3A]" size={20} />
                <span className="font-medium">Bank Transfer</span>
              </div>
            </div>
          </div>

          {paymentMethod === 'credit' && (
            <form className="flex flex-col space-y-4 h-full w-full max-w-[28rem]">
              <div className="flex space-x-4">
                <div className="flex-grow">
                  <Input
                    label="Cardholder Name"
                    placeholder="John Smith"
                  />
                </div>
              </div>
              
              <div>
                <Input
                  label="Card Number"
                  placeholder="XXXX XXXX XXXX XXXX"
                />
              </div>
              
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Input
                    label="Expiry Date"
                    placeholder="MM/YY"
                  />
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
                <input type="checkbox" id="saveCard" className="rounded text-[#7B4F3A]" />
                <label htmlFor="saveCard" className="text-[14px] text-gray-700">Save card for future payments</label>
              </div>
              
              <div className="flex items-center space-x-2 p-3 bg-[#f9f5f3] rounded-lg text-[14px] text-gray-600 mt-2">
                <Lock size={16} className="text-[#7B4F3A]" />
                <span>Your payment information is secured with end-to-end encryption</span>
              </div>
              
              <Button
                variant="default"
                className="bg-[#7B4F3A] py-[0.6875rem] px-[2.5rem] rounded-full hover:bg-[#664130] hover:cursor-pointer mt-4"
              >
                Save Payment Method
              </Button>
            </form>
          )}
          
          {paymentMethod === 'bank' && (
            <form className="flex flex-col space-y-4 h-full w-full max-w-[28rem]">
              <div>
                <Input
                  label="Account Holder Name"
                  placeholder="John Smith"
                />
              </div>
              
              <div>
                <Input
                  label="Bank Name"
                  placeholder="Enter your bank name"
                />
              </div>
              
              <div>
                <Input
                  label="Account Number"
                  placeholder="XXXXXXXX"
                />
              </div>
              
              <div>
                <Input
                  label="Routing Number"
                  placeholder="XXXXXXXXX"
                />
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
          )}
        </div>
        
        <div className="w-72 bg-[#f9f5f3] p-6 rounded-lg h-fit">
          <h3 className="font-medium text-lg mb-4 flex items-center">
            <AlertCircle size={18} className="mr-2 text-[#7B4F3A]" />
            Payment Security
          </h3>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-[#7B4F3A] text-white flex items-center justify-center text-xs mr-2 mt-0.5">✓</div>
              <span>All transactions are secured with 256-bit encryption</span>
            </li>
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-[#7B4F3A] text-white flex items-center justify-center text-xs mr-2 mt-0.5">✓</div>
              <span>We never store your complete card details on our servers</span>
            </li>
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-[#7B4F3A] text-white flex items-center justify-center text-xs mr-2 mt-0.5">✓</div>
              <span>24/7 fraud monitoring to protect your account</span>
            </li>
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-[#7B4F3A] text-white flex items-center justify-center text-xs mr-2 mt-0.5">✓</div>
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
      </div>
    </>
  );
}