interface CurrencyProps {
  color: string;
}

export default function Currency({ color }: CurrencyProps) {
  return (
    <>
      <div
        className={`size-5 ring ring-1 flex items-center justify-center ring bg-transparent rounded-full ring-[#${color}]`}
      >
        <h1 className={`font-serif text-sm text-[#${color}]`}>₦</h1>
      </div>
    </>
  );
}
