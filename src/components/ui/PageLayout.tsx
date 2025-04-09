export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col gap-4">{children}</div>;
}
