"use client";

import { inputs } from "@heuvera/app/data/array";
import AccountHeader from "@heuvera/components/ui/AccountHeader";
import Help from "@heuvera/components/ui/Help";
import Input from "@heuvera/components/ui/Input";
import Textarea from "@heuvera/components/ui/Textarea";
import { Button } from "@heuvera/components/ui/button";
import { useState } from "react";

export default function Support() {
  const [isHelpVisible, setIsHelpVisible] = useState(false);

  const toggleHelp = () => {
    setIsHelpVisible(!isHelpVisible);
  };
  return (
    <>
      <AccountHeader
        heading="Support & Assistance"
        subheading="Get help, contact support, and access resources to enhance your experience."
      />

      <div className="flex flex-col md:flex-col lg:flex-row justify-between my-5 gap-5 md:gap-5 font-serif">
        <div className="flex-grow">
          <h2 className="text-[1.25rem] font-normal mb-[.94rem]">
            Submit an inquiry
          </h2>
          <form className="flex flex-col space-y-4 h-full w-full">
            <div className="flex flex-col space-y-4">
              <Input label="Full name" className="w-full" />
              <Input label="Email" className="w-full" />
            </div>

            <Textarea
              label="Issue Description"
              initialValue="Hello, I need help with..."
            />
            <Button
              variant="default"
              className="bg-[#7B4F3A] py-[0.6875rem] px-[2.5rem] hover:bg-[#664130] hover:cursor-pointer"
            >
              Submit
            </Button>
          </form>
        </div>
        <Help isVisible={isHelpVisible} />
      </div>
    </>
  );
}
