'use client';

import { useState } from 'react';

export default function Textarea({
  label,
  initialValue,
  className,
}: {
  label: string;
  initialValue: string;
  className?: string;
}) {
  const [value, setValue] = useState(initialValue);

  return (
    <div className={className}>
      <label
        htmlFor={label}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <textarea
        id={label}
        rows={4}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-[1.25rem] border border-gray-300"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
    </div>
  );
}
