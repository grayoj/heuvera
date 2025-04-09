import ReviewTable from "@heuvera/components/review/ReviewTable";
import AccountHeader from "@heuvera/components/ui/AccountHeader";
import PageLayout from "@heuvera/components/ui/PageLayout";
import Stars from "@heuvera/components/ui/Stars";

export default function Page() {
  return (
    <PageLayout>
      <AccountHeader
        heading="Reviews & Payout"
        subheading="View guest feedback, monitor your ratings, and maintain your reputation."
      >
        <Stars />
      </AccountHeader>

      <ReviewTable />
    </PageLayout>
  );
}
