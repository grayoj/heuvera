import { BedDouble, ShowerHead, User } from "lucide-react";
import DropDown from "../ui/DropDown";

export default function DropDowns() {
  return (
    <div className="flex gap-4">
      <DropDown type="guest" icon={<User />} label="Guest" onChange={()=>{}}/>
      <DropDown type="bed" icon={<BedDouble />} label="Bedroom" onChange={()=>{}}/>
      <DropDown type="bath" icon={<ShowerHead />} label="Bathroom" onChange={()=>{}}/>
    </div>
  );
}
