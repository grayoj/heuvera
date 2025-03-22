interface InfoSectionProps {
  title: string;
  items: string[];
}

export default function InfoSection({ title, items }: InfoSectionProps) {
  return (
    <div className="w-full border border-[#E3E2D9] rounded-xl p-6 flex flex-col gap-5">
      <h1 className="text-[#3e3e3e] text-xl font-serif">{title}</h1>
      {items.map((item, index) => (
        <h1 key={index} className="text-[#3e3e3e] text-base font-serif">
          {item}
        </h1>
      ))}
    </div>
  );
}
