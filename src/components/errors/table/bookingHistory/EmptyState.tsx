import { Calendar } from "lucide-react";

interface EmptyStateProps {
  errorMessage: string;
  errorSubMessage: string;
}

export default function EmptyState({
  errorMessage,
  errorSubMessage,
}: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-[#D3D2C9] dark:border-[#555555] bg-[#F8F7F2] dark:bg-[#333333] p-8">
      <div className="flex flex-col items-center justify-center py-12">
        <Calendar className="h-12 w-12 text-[#7B4F3A] dark:text-[#8B5F4D]" />
        <h3 className="mt-4 text-lg font-medium text-[#898989] dark:text-[#666666]">
          {errorMessage}
        </h3>
        <p className="mt-2 text-sm text-[#A7A7A7]">{errorSubMessage}</p>
      </div>
    </div>
  );
}
