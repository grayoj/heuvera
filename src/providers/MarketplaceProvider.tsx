'use client';

import { useMemo, useState, createContext, useContext, JSX } from "react";
import { LucideBell, LucideSearch, LucideMail, LucideHome, LucideHeart, LucideCompass } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { HeuveraLogo } from "@heuvera/components/logo";
import useIsMobile from "@heuvera/hooks/IsMobile";
import { GoHeart, GoHeartFill, GoHome, GoHomeFill } from "react-icons/go";
import React from "react";
import { IoCompass, IoCompassOutline } from "react-icons/io5";
import { MdMail, MdMailOutline } from "react-icons/md";

interface MarketplaceContextType {
  selected: string;
  setSelected: (value: string) => void;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(
  undefined,
);

export function MarketplaceProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<string>("Explore");

  const NavigationContent = useMemo(() => [
    { title: "Explore", link: "/marketplace/explore" },
    { title: "Favorites", link: "#favorites" },
    { title: "Discover", link: "#discover" },
    { title: "Contact", link: "#contact" },
  ], []);

  return (
    <MarketplaceContext.Provider value={{ selected, setSelected }}>
      <div className="w-full h-full flex flex-col">
        {/* Top Navbar */}
        <div className="px-4 md:px-20 lg:px-20 xl:px-20 2xl:px-20 h-24 w-full flex items-center justify-between">
          <div className="max-w-min md:w-52 lg:w-52 xl:w-52 2xl:w-52">
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

        {/* Page Content */}
        <div className="pb-10 w-full flex-1 flex">{children}</div>

        {/* Bottom Navigation (Mobile Only) */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 w-full bg-[#F3F2EC] shadow-md border-t border-[#E3E2D9] px-4 flex items-center h-[70px] justify-between">
            {NavigationContent.map((content, index) => {
              const isSelected = selected === content.title;
              const bgColor = isSelected ? "rgba(123, 79, 58, 0.2)" : "transparent"; // 20% lighter background color

              // Define both filled and outline icons
              const iconMapping: { [key: string]: { filled: JSX.Element; outline: JSX.Element } } = {
                Explore: { filled: <GoHomeFill fill="#7B4F3A" />, outline: <GoHome /> },
                Favorites: { filled: <GoHeartFill fill="#7B4F3A" />, outline: <GoHeart /> },
                Discover: { filled: <IoCompass className="text-2xl" fill="#7B4F3A" />, outline: <IoCompassOutline className="text-2xl" /> },
                Contact: { filled: <MdMail fill="#7B4F3A" className="text-2xl"/>, outline: <MdMailOutline className="text-2xl"/> },
              };

              return (
                <button
                  key={index}
                  onClick={() => setSelected(content.title)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-2xl transition duration-300"
                  style={{ backgroundColor: bgColor }}
                >
                  {/* Toggle between filled and outline icons */}
                  <span className={`text-xl ${isSelected ? "text-[#7B4F3A]" : "text-[#323232]"}`}>
                    {isSelected ? iconMapping[content.title].filled : iconMapping[content.title].outline}
                  </span>

                  {/* Show label when selected */}
                  {isSelected && (
                    <span className="text-sm font-serif font-medium text-[#7B4F3A]">{content.title}</span>
                  )}
                </button>
              );
            })}
          </div>
        )}


      </div>
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
}
