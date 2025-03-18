"use client";

import { useMemo, useState } from "react";
import { LucideBell, LucideSearch } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { HeuveraLogo } from "@heuvera/app/components/logo";

export default function MarketplaceLayout({ children }: { children: React.ReactNode, }) {
    const [selected, setSelected] = useState<string>("Explore");

    const NavigationContent = useMemo(() => [
        { title: "Explore", link: "/marketplace/explore" },
        { title: "Favorites", link: "#favorites" },
        { title: "Discover", link: "#discover" },
        { title: "Contact", link: "#contact" },
    ], []);

    return (
        <>
            <div className="w-full h-full bg-[#F3F2EC] px-20 flex flex-col">
                <div className="h-24 w-full flex items-center justify-between">
                    <div className="w-52">
                        <HeuveraLogo width={35} height={35} />
                    </div>
                    <div className="hidden md:flex items-center space-x-12 md:space-x-4 lg:space-x-6 xl:space-x-10 2xl:space-x-12">
                        {NavigationContent.map((content, index) => (
                            <div key={index}>
                                <button
                                    onClick={() => setSelected(content.title)}
                                    className={`text-base md:text-xs lg:text-xs xl:text-base 2xl:text-base font-medium font-serif transition-colors duration-300 px-2 pb-2 ${selected === content.title
                                        ? "text-[#7B4F3A] font-semibold border-[#7B4F3A] border-b-2"
                                        : "text-[#323232] hover:text-primary"
                                        }`}
                                >
                                    {content.title}
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="w-52 flex flex-row items-center justify-between">
                        <LucideSearch className="text-[#323232] text-2xl" />
                        <div className="flex gap-2 items-center">
                            <div className="h-6 w-6 rounded-full">
                                <Avatar className="rounded-full overflow-hidden block">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback className="bg-[#E3E2D9] font-serif">FG</AvatarFallback>
                                </Avatar>
                            </div>
                            <h1 className="text-base font-medium font-serif text-[#323232]">George</h1>
                        </div>
                        <LucideBell className="text-2xl text-[#323232]" />
                    </div>
                </div>
                <div className="pt-10 w-full flex flex-1">
                    {children}
                </div>
            </div>
        </>
    )
}
