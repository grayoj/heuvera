export default function StatsBox({heading,amount,percentage, percentClass}: {heading: string, amount: string, percentage: number, percentClass?: string}) {
  return (
    <div className="flex justify-center items-center px-9 py-14 border border-[#E3E2D9] rounded-lg">
      <div className="flex flex-col">
        <h3 className="text-[#898989] text-xs font-medium ">{heading}</h3>
        <p className="text-2xl font-semibold">{amount}</p>
        <p className={`${percentClass} text-xs font-bold`}>{percentage}%</p>
      </div>
    </div>
  );
}