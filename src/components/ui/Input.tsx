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
        className="bg-[#F8F7F2] border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2.5 md:p-1 lg:p-2.5 xl:p-2.5"
        placeholder={placeholder}
        value={value}
        onChange={(e) => console.log(e.target.value)}
        required
      />
    </div>
  );
}
