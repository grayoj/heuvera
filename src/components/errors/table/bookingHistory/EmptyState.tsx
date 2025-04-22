import { Calendar } from "lucide-react";

export default function EmptyState() {
    return (
        <div className="rounded-lg border border-[#E3E2D9] dark:border-[#555555] bg-[#F8F7F2] dark:bg-[#333333] p-8">
            <div className="flex flex-col items-center justify-center py-12">
                <Calendar className="h-12 w-12 [#A7A7A7]" />
                <h3 className="mt-4 text-lg font-medium text-[#A7A7A7]">
                    No Booking History
                </h3>
                <p className="mt-2 text-sm text-[#A7A7A7]">
                    You don't have any past bookings yet.
                </p>
            </div>
        </div>
    );
}