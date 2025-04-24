interface InfoSectionProps {
  title: string;
  items: string[];
}

export default function InfoSection({ title, items }: InfoSectionProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h3 className="text-lg font-serif font-medium text-[#333333] dark:text-[#666666]">
        {title}
      </h3>
      <div className="flex flex-col gap-3">
        {items.map((item, index) => (
          <p
            key={index}
            className="text-base font-serif text-[#333333] dark:text-[#666666]"
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
