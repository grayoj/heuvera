"use client";

import { useMemo, useState } from "react";
import { HeuveraLogo } from "../logo";
import { LucideBell, LucideSearch } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

export default function NavigationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selected, setSelected] = useState<string>("Explore");

  const NavigationContent = useMemo(
    () => [
      { title: "Explore", link: "/marketplace/explore" },
      { title: "Favorites", link: "#favorites" },
      { title: "Discover", link: "#discover" },
      { title: "Contact", link: "#contact" },
    ],
    [],
  );

  return (
    <>
      <div className="w-full bg-[#F3F2EC] px-20">
        <div className="h-24 w-full flex items-center justify-between">
          <div className="w-52">
            <HeuveraLogo width={35} height={35} />
          </div>
          <div className="hidden md:flex items-center space-x-12 md:space-x-4 lg:space-x-6 xl:space-x-10 2xl:space-x-12">
            {NavigationContent.map((content, index) => (
              <div key={index}>
                <button
                  onClick={() => setSelected(content.title)}
                  className={`text-base md:text-xs lg:text-xs xl:text-base 2xl:text-base font-medium font-serif transition-colors duration-300 px-2 pb-2 ${
                    selected === content.title
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
              <Avatar className="overflow-hidden block">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback className="bg-[#E3E2D9]">FG</AvatarFallback>
              </Avatar>
            </div>
            <LucideBell className="text-2xl text-[#323232]" />
          </div>
        </div>
        <div className="pt-10">{children}</div>
      </div>
    </>
  );
}
