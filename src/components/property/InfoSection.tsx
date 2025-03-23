interface InfoSectionProps {
  title: string;
  items: string[];
}

export default function InfoSection({ title, items }: InfoSectionProps) {
  return (
    <div className="w-full border border-[#E3E2D9] rounded-xl p-0 md:p-6 lg:p-6 xl:p-6 2xl:p-6 flex flex-col gap-3 md:gap-5 lg:gap-5 xl:gap-5 2xl:gap-5">
      <h1 className="text-[#3e3e3e] text-base md:text-xl lg:text-xl xl:text-2xl 2xl:text-2xl font-serif">{title}</h1>
      {items.map((item, index) => (
        <h1 key={index} className="text-[#3e3e3e] text-sm md:text-base lg:text-base xl:text-base 2xl:text-base font-serif">
          {item}
        </h1>
      ))}
    </div>
  );
}
