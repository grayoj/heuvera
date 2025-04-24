export default function SettingsHeader({
  heading,
  subheading,
  children,
  className,
}: {
  heading: string;
  subheading: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="hidden md:block">
      <div
        className={`flex justify-between border-b items-center py-4 ${className}`}
      >
        <div className="">
          <h2 className="text-xl md:text-xl lg:text-base xl:text-xl 2xl:text-xl font-medium-">
            {heading}
          </h2>
          <p className="text-[#898989] dark:text-[#666666] font-normal md:text-sm lg:text-xs xl:text-base 2xl:text-base">
            {subheading}
          </p>
        </div>
        <div className="flex gap-4">{children}</div>
      </div>
    </div>
  );
}
