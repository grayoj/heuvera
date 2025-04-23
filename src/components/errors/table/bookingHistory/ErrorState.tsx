import { XCircle } from "lucide-react";

interface ErrorStateProps {
    error: string;
    errorMessage: string;
}

export default function ErrorState({ error, errorMessage }: ErrorStateProps) {
    return (
        <div className="rounded-lg border border-[#E3E2D9] dark:border-[#555555] bg-[#F8F7F2] dark:bg-[#333333] p-8">
            <div className="flex flex-col items-center justify-center py-12">
                <XCircle className="h-10 w-10 text-[#7B4F3A] dark:text-[#8B5F4D]" />
                <p className="mt-4 text-sm text-[#A7A7A7]">
                    {errorMessage} {error}
                </p>
            </div>
        </div>
    );
}