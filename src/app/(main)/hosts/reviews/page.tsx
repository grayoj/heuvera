import SettingsHeader from "@heuvera/components/header/SettingsHeader";
import PageLayout from "@heuvera/components/ui/PageLayout";
import Stars from "@heuvera/components/ui/Stars";
import dynamic from "next/dynamic";

const ReviewTable = dynamic(
  () => import("@heuvera/components/review/ReviewTable"),
);

export default function ReviewsPage() {
  return (
    <PageLayout>
      <SettingsHeader
        heading="Reviews & Payout"
        subheading="View guest feedback, monitor your ratings, and maintain your reputation."
      >
        <Stars />
      </SettingsHeader>
      <ReviewTable />
    </PageLayout>
  );
}
