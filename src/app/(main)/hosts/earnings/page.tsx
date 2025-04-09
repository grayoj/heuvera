import { earnings } from "@heuvera/app/data/array";
import EarningTable from "@heuvera/components/earnings/EarningTable";
import StatsBox from "@heuvera/components/earnings/StatsBox";
import AccountHeader from "@heuvera/components/ui/AccountHeader";
import { Button } from "@heuvera/components/ui/button";
import PageLayout from "@heuvera/components/ui/PageLayout";
import Link from "next/link";

export default function Page() {
  return (
    <PageLayout>
      <AccountHeader
        heading="Earnings & Payout"
        subheading="Monitor your earnings, track pending payments, and manage payout preferences"
      >
        <div className="flex justify-center items-center  space-x-6">
          <Link
            className="text-xs text-[#898989] underline font-medium "
            href="#"
          >
            Setup Payment Method
          </Link>
          <Button
            variant="default"
            className="cursor-pointer bg-[#7B4F3A] rounded-xl"
          >
            Withdraw Funds
          </Button>
        </div>
      </AccountHeader>

      <div className="flex justify-between mb-6 gap-4">
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
    </PageLayout>
  );
}
