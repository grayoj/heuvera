import { cn } from "@heuvera/lib/utils";
import { BookTabProps } from "@heuvera/utils/props";
import { Switch } from "@radix-ui/react-switch";

export function BookTab({
    instantBooking,
    selfCheckIn,
    setInstantBooking,
    setSelfCheckIn,
}: BookTabProps) {
    const options = [
        {
            label: "Instant booking",
            icon: () => (
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M5 12L10 17L19 8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
        },
        {
            label: "Self check-in",
            icon: () => (
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
                    <path
                        d="M20 19C20 16.7909 16.4183 15 12 15C7.58172 15 4 16.7909 4 19"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                </svg>
            ),
        },
    ];

    const handleOptionClick = (label: string) => {
        if (label === "Instant booking") {
            setInstantBooking(true);
            setSelfCheckIn(false);
        } else {
            setInstantBooking(false);
            setSelfCheckIn(true);
        }
    };

    return (
        <div className="space-y-3 sm:space-y-4">
            <h3 className="font-medium text-sm sm:text-base md:text-lg mb-1 sm:mb-2">
                Book options
            </h3>
            <div className="flex items-center justify-center w-full gap-2 sm:gap-4">
                {options.map(({ label, icon: Icon }) => (
                    <button
                        key={label}
                        onClick={() => handleOptionClick(label)}
                        className={cn(
                            "flex items-center justify-between rounded-full py-2 px-3 sm:py-3 sm:px-4 w-full border text-xs sm:text-sm",
                            (label === "Instant booking" && instantBooking) ||
                                (label === "Self check-in" && selfCheckIn)
                                ? "bg-[#7B4F3A44] dark:bg-[#8B5F4D44] border-[#7B4F3A] dark:border-[#8B5F4D]"
                                : "bg-[#f0efe9] dark:bg-[#555555]",
                        )}
                    >
                        <div className="flex items-center gap-1 sm:gap-2">
                            <div className="h-4 w-4 sm:h-6 sm:w-6 rounded-full bg-white dark:bg-[#666666] border flex items-center justify-center">
                                <Icon />
                            </div>
                            <span>{label}</span>
                        </div>
                        <Switch
                            checked={
                                label === "Instant booking" ? instantBooking : selfCheckIn
                            }
                            onCheckedChange={() => handleOptionClick(label)}
                            className="data-[state=checked]:bg-[#7B4F3A] dark:bg-[#8B5F4D] scale-75 sm:scale-100"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
