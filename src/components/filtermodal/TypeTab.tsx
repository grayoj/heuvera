import { CheckIcon } from "lucide-react";
import { cn } from "@heuvera/lib/utils";
import { TypeTabProps } from "@heuvera/utils/props";
import { PROPERTY_TYPES } from "@heuvera/app/data/array";

export function TypeTab({ propertyTypes, togglePropertyType }: TypeTabProps) {
    return (
        <div className="space-y-3 sm:space-y-4">
            <h3 className="font-medium text-sm sm:text-base md:text-lg mb-1 sm:mb-2">
                Property Type
            </h3>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {PROPERTY_TYPES.map(({ name, icon: Icon }) => (
                    <button
                        key={name}
                        className={cn(
                            "flex items-center gap-1 sm:gap-2 rounded-full py-2 px-3 sm:py-3 sm:px-4 border text-xs sm:text-sm",
                            propertyTypes.includes(name)
                                ? "bg-[#7B4F3A44] dark:bg-[#8B5F4D44] border-[#7B4F3A] dark:border-[#8B5F4D]"
                                : "bg-[#f0efe9] dark:bg-[#555555]",
                        )}
                        onClick={() => togglePropertyType(name)}
                    >
                        <div
                            className={cn(
                                "flex items-center justify-center",
                                propertyTypes.includes(name)
                                    ? "bg-[#f8efe9] dark:bg-[#555555]"
                                    : "",
                            )}
                        >
                            <Icon
                                className={cn(
                                    "h-4 w-4 sm:h-5 sm:w-5 bg-none",
                                    propertyTypes.includes(name)
                                        ? "text-[#7B4F3A] dark:text-[#8B5F4D]"
                                        : "text-black dark:text-gray-100",
                                )}
                            />
                        </div>
                        <span
                            className={cn(
                                "",
                                propertyTypes.includes(name)
                                    ? "text-[#7B4F3A] dark:text-[#8B5F4D]"
                                    : "text-black dark:text-gray-100",
                            )}
                        >
                            {name}
                        </span>
                        {propertyTypes.includes(name) && (
                            <CheckIcon
                                className={cn(
                                    "ml-auto h-4 w-4 sm:h-5 sm:w-5",
                                    propertyTypes.includes(name)
                                        ? "text-[#7B4F3A] dark:text-[#8B5F4D]"
                                        : "text-[#7B4F3A] dark:text-[#8B5F4D]",
                                )}
                            />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
