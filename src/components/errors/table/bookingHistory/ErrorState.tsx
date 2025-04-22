import { XCircle } from "lucide-react";

interface ErrorStateProps {
    error: string;
}

export default function ErrorState({ error }: ErrorStateProps) {
    return (
        <div className="rounded-lg border border-[#E3E2D9] dark:border-[#555555] bg-[#F8F7F2] dark:bg-[#333333] p-8">
            <div className="flex flex-col items-center justify-center py-12">
                <XCircle className="h-10 w-10 text-[#A7A7A7]" />
                <p className="mt-4 text-sm text-[#A7A7A7]">
                    Failed to load booking history. {error}
                </p>
            </div>
        </div>
    );
}