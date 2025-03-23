import SupportForm from '@heuvera/components/support/SupportForm';
import AccountHeader from '@heuvera/components/ui/AccountHeader';
import Help from '@heuvera/components/ui/Help';

export default function Page() {
  return (
    <>
      <AccountHeader
        heading="Support & Assistance"
        subheading="Get help, contact support, and access resources to enhance your
          experience."
      />

      <div className="flex justify-between ">
        <div className="flex-grow mr-5">
          <h2 className="text-[1.25rem] font-normal mb-[.94rem]">
            Submit an inquiry
          </h2>
          <SupportForm />
        </div>
        <Help />
      </div>
    </>
  );
}
