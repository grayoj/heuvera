import { inputs } from "@heuvera/app/data/array";
import Input from "../ui/LabelInput";
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
      <Textarea label="Issue Description" id="support" />
      <Button
        variant="default"
      >
        Submit
      </Button>
    </form>
  );
}
