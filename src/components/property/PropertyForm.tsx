import Input from "../ui/Input";
import Textarea from "../ui/Textarea";

export default function PropertyForm() {
  return (
    <div className="grid gap-4 ">
      <Input label="Property Location" className="col-span-3" />
      <Textarea
        label="Property Description"
        initialValue="@peduarte"
        className="col-span-3"
      />
    </div>
  );
}
