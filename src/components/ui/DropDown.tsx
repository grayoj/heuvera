import { ReactNode } from "react";

export default function DropDown({
  type,
  label,
  icon,
}: {
  type: string;
  label: string;
  icon: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full ">
      <label
        htmlFor={type}
        className="flex items-center text-sm font-medium text-gray-900 "
      >
        {label}
        <span className="ml-1">{icon}</span>
      </label>
      <select
        id={type}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 text-center cursor-pointer"
        required
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
          <option className="cursor-pointer" key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
