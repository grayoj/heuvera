import { earnings } from "@heuvera/app/data/array";
import SettingsHeader from "@heuvera/components/header/SettingsHeader";
import { Button } from "@heuvera/components/ui/button";
import PageLayout from "@heuvera/components/ui/PageLayout";
import dynamic from "next/dynamic";
const StatsBox = dynamic(()=> import("@heuvera/components/earnings/StatsBox"));
const EarningTable = dynamic(()=> import("@heuvera/components/earnings/EarningTable"));

export default function EarningsPage() {
  return (
    <PageLayout>
      <SettingsHeader
        heading="Earnings & Payout"
        subheading="Monitor your earnings, track pending payments, and manage payout preferences"
      >
        <div className="flex justify-center items-center space-x-4">
          <Button
            variant="link"
            className="text-xs text-[#898989] underline font-medium hover:underline-[#7B4F3A] dark:hover:underline-[#8B5F4D]"
          >
            Setup Payment Method
          </Button>
          <Button
            variant="default"
          >
            Withdraw Funds
          </Button>
        </div>
      </SettingsHeader>

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
