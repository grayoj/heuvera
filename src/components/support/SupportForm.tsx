import { inputs } from "@heuvera/app/data/array";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import { Button } from "../ui/button";

export default function SupportForm() {
  return (
    <form className="flex flex-col space-y-4 h-full w-full">
      {inputs.map((input, index) => (
        <div key={index} className="flex flex-col space-y-4">
          <Input label={input.name} />
        </div>
      ))}
      <Textarea
        label="Issue Description"
        id="support"
      />
      <Button
        variant="default"
        className="bg-[#7B4F3A] py-[0.6875rem] px-[2.5rem] rounded-full hover:bg-[#664130] hover:cursor-pointer"
      >
        Submit
      </Button>
    </form>
  );
}
