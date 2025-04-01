import ReviewTable from '@heuvera/components/review/ReviewTable';
import AccountHeader from '@heuvera/components/ui/AccountHeader';
import PageLayout from '@heuvera/components/ui/PageLayout';

export default function Page() {
  return (
    <PageLayout>
      <AccountHeader
        heading="Reviews & Payout"
        subheading="View guest feedback, monitor your ratings, and maintain your reputation."
      >
        3.5
      </AccountHeader>

      <ReviewTable />
    </PageLayout>
  );
}
