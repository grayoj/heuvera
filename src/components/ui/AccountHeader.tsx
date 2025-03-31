export default function AccountHeader({
  heading,
  subheading,
  children,
}: {
  heading: string;
  subheading: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex justify-between border-b items-center h-20">
      <div className="">
        <h2 className="text-xl md:text-xl lg:text-base xl:text-xl 2xl:text-xl font-medium-">
          {heading}
        </h2>
        <p className="text-[#898989] font-normal md:text-sm lg:text-xs xl:text-base 2xl:text-base">
          {subheading}
        </p>
      </div>
      {children}
    </div>
  );
}
