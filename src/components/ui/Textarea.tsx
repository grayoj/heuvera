"use client";

import { ChangeEvent } from "react";

export default function Textarea({
  label,
  value,
  className,
  onChange,
  placeholder,
  id,
}: {
  label: string;
  value?: string;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  id: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={label}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <textarea
        placeholder={placeholder}
        id={id}
        rows={4}
        className="block p-2.5 w-full text-sm bg-[#F8F7F2] dark:bg-[#333333] border border-gray-300 dark:border-[#555555] text-gray-900 dark:text-gray-200 rounded-lg"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
