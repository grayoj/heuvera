import { features } from "@heuvera/app/data/array";
import DropDown from "../ui/DropDown";

export default function PropertyFeature() {
  return (
    <div className="flex gap-4 w-full">
      {features.map((feature, index) => (
        <DropDown
          key={index}
          type={feature.type}
          icon={<feature.icon />}
          label={feature.label}
        />
      ))}
    </div>
  );
}
