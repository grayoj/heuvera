import { BedDouble, ShowerHead, User } from "lucide-react";
import DropDown from "../ui/DropDown";

export default function DropDowns() {
  return (
    <div className="flex gap-4">
      <DropDown type="guest" icon={<User />} label="Guest" />
      <DropDown type="bed" icon={<BedDouble />} label="Bedroom" />
      <DropDown type="bath" icon={<ShowerHead />} label="Bathroom" />
    </div>
  );
}
