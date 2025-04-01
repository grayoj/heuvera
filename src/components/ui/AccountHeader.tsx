export default function AccountHeader({
  heading,
  subheading,
  children,
  className
}: {
  heading: string;
  subheading: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={` flex justify-between border-b  ${className}`}>
      <div className="pb-5">
        <h2 className="text-[20px] font-medium-">{heading}</h2>
        <p className="text-[#898989] font-normal text-[14px]">{subheading}</p>
      </div>
      {children}
    </div>
  );
}
