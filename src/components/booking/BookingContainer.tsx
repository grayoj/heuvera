export default function BookingContainer({children, className}: {children: React.ReactNode, className: string}) {
  return (
    <div className={`rounded-md ${className}`}>{children}</div>
  );
}