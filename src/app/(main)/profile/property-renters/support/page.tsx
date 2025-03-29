import { inputs } from "@heuvera/app/data/array";
import AccountHeader from "@heuvera/components/ui/AccountHeader";
import Help from "@heuvera/components/ui/Help";
import Input from "@heuvera/components/ui/Input";
import Textarea from "@heuvera/components/ui/Textarea";
import { Button } from "@heuvera/components/ui/button";

export default function Support() {
  return (
    <>
      <AccountHeader
        heading="Support & Assistance"
        subheading="Get help, contact support, and access resources to enhance your experience."
      />

      <div className="flex justify-between ">
        <div className="flex-grow mr-5">
          <h2 className="text-[1.25rem] font-normal mb-[.94rem]">
            Submit an inquiry
          </h2>
          <form className="flex flex-col space-y-4 h-full w-full">
            {inputs.map((input, index) => (
              <div key={index} className="flex flex-col space-y-4">
                <Input label={input.name} value={input.value} />
              </div>
            ))}
            <Textarea
              label="Issue Description"
              initialValue="Hello, I need help with..."
            />
            <Button
              variant="default"
              className="bg-[#7B4F3A] py-[0.6875rem] px-[2.5rem] rounded-full hover:bg-[#664130] hover:cursor-pointer"
            >
              Submit
            </Button>
          </form>
        </div>
        <Help />
      </div>
    </>
  );
}
