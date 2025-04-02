"use client";

export default function Input({
  label,
  value,
  className,
  placeholder,
}: {
  label?: string;
  value?: string;
  className?: string;
  placeholder?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={label}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type="text"
        id={label}
        className="bg-[#F8F7F2] dark:bg-[#333333] border border-gray-300 dark:border-[#555555] text-gray-900 dark:text-gray-200 text-sm rounded-md block w-full h-10 px-2"
        placeholder={placeholder}
        value={value}
        onChange={(e) => console.log(e.target.value)}
        required
      />
    </div>
  );
}
