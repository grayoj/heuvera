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
      <div className="flex justify-between border-b mb-5">
        <div className="pb-5">
          <h2 className="text-[20px] font-medium-">{heading}</h2>
          <p className="text-[#898989] font-normal text-[14px]">{subheading}</p>
        </div>
        {children}
      </div>
    );
  }
  