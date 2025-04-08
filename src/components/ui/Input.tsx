"use client";

import { useState } from "react";

export default function Input({
  label,
  className,
  placeholder,
  prefix,
}: {
  label?: string;
  className?: string;
  placeholder?: string;
  prefix?: string;
}) {
  const [inputValue, setInputValue] = useState("");
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
          <span className="absolute inset-y-0 left-0 flex items-center pl-3  text-gray-900">
            {prefix}
          </span>
        )}
        <input
          type="text"
          id={label}
          className={`bg-[#F8F7F2] dark:bg-[#333333] border border-gray-300 dark:border-[#555555] text-gray-900 dark:text-gray-200 text-sm rounded-md block w-full h-10 px-2 ${
            prefix ? "pl-6" : ""
          }`}
          value={inputValue}
          placeholder={placeholder}
          onChange={(e) => setInputValue(e.target.value)}
          required
        />
      </div>
    </div>
  );
}
