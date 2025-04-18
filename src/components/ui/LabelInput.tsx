import { ChangeEvent } from "react";

interface InputProps {
  label?: string;
  className?: string;
  placeholder?: string;
  prefix?: string;
  value?: string;
  id?: string;
  type?: string;
  typeClassname?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  label,
  className,
  placeholder,
  prefix,
  value,
  id,
  type,
  typeClassname,
  onChange,
}: InputProps) {
  return (
    <div className={className}>
      <label
        htmlFor={label}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#A7A7A7]">
            {prefix}
          </span>
        )}
        <input
          type={type}
          id={id}
          className={`bg-[#F8F7F2] dark:bg-[#333333] border border-gray-300 dark:border-[#555555] text-gray-900 dark:text-gray-200 text-sm rounded-md block w-full h-10 px-2 ${typeClassname} ${
            prefix ? "pl-6" : ""
          }`}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
}
