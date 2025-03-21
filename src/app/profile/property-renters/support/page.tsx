import Help from '@heuvera/components/ui/Help';
import Input from '@heuvera/components/ui/Input';
import Textarea from '@heuvera/components/ui/Textarea';
import { Button } from '@heuvera/components/ui/button';

export default function Page() {
  const inputs = [
    { name: 'Full Name', value: 'John Doe' },
    { name: 'Email', value: 'george' },
  ];
  return (
    <>
      <div className="border-b pb-5 mb-5">
        <h2 className="text-[1.25rem] font-medium">Support & Assistance</h2>
        <p className="text-[#898989] font-normal text-[14px]">
          Get help, contact support, and access resources to enhance your
          experience.
        </p>
      </div>

      <div className="flex justify-between ">
        <div className="flex-grow mr-5">
          <h2 className="text-[1.25rem] font-normal mb-[.94rem]">
            Submit an inquiry
          </h2>
          <form className="flex flex-col space-y-4 h-full w-full max-w-[28rem]">
            {inputs.map((input, index) => (
              <div key={index} className="flex flex-col space-y-4">
                <Input
                  label={input.name}
                  value={input.value}
                />
              </div>
            ))}
            <Textarea
              label="Issue Description"
              initialValue="Hello, I need help with..."
            />
            <Button
              variant="default"
              className="bg-[#7B4F3A] py-[0.6875rem] px-[2.5rem] rounded-full"
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
