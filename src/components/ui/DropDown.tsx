import { ReactNode } from "react";

export default function DropDown({
  type,
  label,
  icon,
  value,
  onChange,
}: {
  type?: string;
  label?: string;
  icon?: ReactNode;
  value?: string | number;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label
        htmlFor={type}
        className="flex items-center text-sm font-medium text-[#A7A7A7]"
      >
        {label}
        <span className="ml-1">{icon}</span>
      </label>
      <select
        id={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent border border-[#E3E2D9] dark:border-[#555555] text-[#A7A7A7] text-sm rounded-lg block w-full p-2.5 text-center cursor-pointer"
        required
      >
        {[...Array(10)].map((_, i) => (
          <option key={i} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
    </div>
  );
}
