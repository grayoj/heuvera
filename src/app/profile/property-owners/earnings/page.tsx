import { earnings } from '@heuvera/app/data/array';
import EarningTable from '@heuvera/components/earnings/EarningTable';
import StatsBox from '@heuvera/components/earnings/StatsBox';
import AccountHeader from '@heuvera/components/ui/AccountHeader';
import { Button } from '@heuvera/components/ui/button';
import Link from 'next/link';

export default function Page() {
  return (
    <div>
      <AccountHeader
        heading="Earnings & Payout"
        subheading="Track upcoming, ongoing, and past bookings in one place"
      >
        <div className="flex">
          <Link href="#">Setup Payment Method</Link>
          <Button
            variant="default"
            className="cursor-pointer bg-[#7B4F3A] rounded-xl"
          >
            Withdraw Funds
          </Button>
        </div>
      </AccountHeader>

      <div className="flex justify-between mb-6">
        {earnings.map(({ heading, amount, percent }, index) => (
          <StatsBox
            key={index}
            heading={heading}
            amount={amount}
            percentage={percent}
          />
        ))}
      </div>

      <EarningTable />
    </div>
  );
}
