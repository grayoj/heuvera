"use client";

import {
  useMemo,
  useState,
  createContext,
  useContext,
  JSX,
  useRef,
  useEffect,
} from "react";
import {
  LucideSearch,
  LucideMail,
  LucideHeart,
  LucideCompass,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { HeuveraLogo } from "@heuvera/components/logo";
import useIsMobile from "@heuvera/hooks/IsMobile";
import { GoHeart, GoHeartFill, GoHome, GoHomeFill } from "react-icons/go";
import React from "react";
import { IoCompass, IoCompassOutline } from "react-icons/io5";
import { MdMail, MdMailOutline } from "react-icons/md";
import { motion } from "framer-motion";

interface MarketplaceContextType {
  selected: string;
  setSelected: (value: string) => void;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(
  undefined,
);

export function MarketplaceProvider({
  children,
  showSearch = true,
}: {
  children: React.ReactNode;
  className?: string;
  showSearch?: boolean;
}) {
  const [selected, setSelected] = useState<string>("Explore");
  const isMobile = useIsMobile();
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const navRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const NavigationContent = useMemo(
    () => [
      { title: "Explore", link: "/marketplace/explore", icon: <GoHomeFill /> },
      { title: "Favorites", link: "#favorites", icon: <LucideHeart /> },
      { title: "Discover", link: "#discover", icon: <LucideCompass /> },
      { title: "Contact", link: "#contact", icon: <LucideMail /> },
    ],
    [],
  );

  useEffect(() => {
    navRefs.current = navRefs.current.slice(0, NavigationContent.length);
  }, [NavigationContent]);

  useEffect(() => {
    if (isMobile) {
      const selectedIndex = NavigationContent.findIndex(
        (item) => item.title === selected,
      );
      if (selectedIndex >= 0 && navRefs.current[selectedIndex]) {
        const element = navRefs.current[selectedIndex];
        if (element) {
          const rect = element.getBoundingClientRect();
          setIndicatorStyle({
            transform: `translateX(${rect.left}px)`,
            width: `${rect.width}px`,
          });
        }
      }
    }
  }, [selected, isMobile, NavigationContent]);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <MarketplaceContext.Provider value={{ selected, setSelected }}>
      <div className="w-full h-full flex flex-col">
        <div className="px-4 md:px-20 lg:px-20 xl:px-20 2xl:px-20 h-24 w-full flex items-center justify-between">
          <div className="flex-shrink-0">
            <HeuveraLogo width={35} height={35} />
          </div>

          {isMobile && showSearch && (
            <div className="flex-1 px-4">
              <div className="flex items-center bg-[#F8F7F2] border border-[#C4C3B8] rounded-full px-4 py-2 w-full">
                <LucideSearch className="text-[#C4C3B8] text-xl mr-2" />
                <input
                  type="text"
                  placeholder="search properties..."
                  className="bg-transparent outline-none w-full text-[#C4C3B8] font-serif text-md placeholder:text-[#C4C3B8]"
                />
              </div>
            </div>
          )}

          {!isMobile && (
            <div className="flex-1 flex justify-center">
              <div className="flex items-center space-x-12 md:space-x-4 lg:space-x-6 xl:space-x-10 2xl:space-x-12">
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
            </div>
          )}

          <div className="flex-shrink-0 flex items-center gap-4">
            {!isMobile && showSearch && (
              <div className="relative flex-1 flex justify-center">
                <motion.div
                  className="relative flex items-center"
                  initial={{ width: "40px" }}
                  animate={{ width: isSearchOpen ? "250px" : "40px" }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <motion.button
                    onClick={() => setIsSearchOpen((prev) => !prev)}
                    className="absolute left-2 top-1/2 -translate-y-1/2"
                    animate={{ scale: isSearchOpen ? 0.9 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <LucideSearch className="text-[#323232] text-xl" />
                  </motion.button>

                  {isSearchOpen && (
                    <motion.input
                      ref={inputRef}
                      type="text"
                      placeholder="Search properties..."
                      className="pl-10 pr-3 py-2 w-full bg-[#F8F7F2] border border-[#C4C3B8] rounded-full outline-none text-[#323232] font-serif text-md placeholder:text-[#C4C3B8]"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "100%" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              </div>
            )}

            <div className="size-10 md:size-6 lg:size-20 xl:size-8 2xl:size-8">
              <Avatar className="rounded-full overflow-hidden block">
                <AvatarImage
                  src="https://lh3.googleusercontent.com/a/ACg8ocKQWfaudEjOg1tHLb3WZFMGH1DLf56QEhrIhRYRMeJVROgTRbifUA=s96-c"
                  alt="avatar"
                />
                <AvatarFallback>FG</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        <div className="pb-36 w-full flex-1 flex">{children}</div>

        {isMobile && (
          <div className="w-full h-[90px] fixed bottom-3 left-0 px-4">
            <div className="w-full bg-[#E3E2D9] shadow-md border-t border-[#E3E2D9] rounded-2xl px-4 flex items-center h-[70px] justify-between">
              {NavigationContent.map((content, index) => {
                const isSelected = selected === content.title;

                const iconMapping: {
                  [key: string]: { filled: JSX.Element; outline: JSX.Element };
                } = {
                  Explore: {
                    filled: <GoHomeFill fill="#7B4F3A" />,
                    outline: <GoHome className="text-[#323232]" />,
                  },
                  Favorites: {
                    filled: <GoHeartFill fill="#7B4F3A" />,
                    outline: <GoHeart className="text-[#323232]" />,
                  },
                  Discover: {
                    filled: <IoCompass className="text-2xl" fill="#7B4F3A" />,
                    outline: (
                      <IoCompassOutline className="text-2xl text-[#323232]" />
                    ),
                  },
                  Contact: {
                    filled: <MdMail fill="#7B4F3A" className="text-2xl" />,
                    outline: (
                      <MdMailOutline className="text-2xl text-[#323232]" />
                    ),
                  },
                };

                return (
                  <button
                    key={index}
                    onClick={() => setSelected(content.title)}
                    className="flex flex-col items-center justify-center min-w-[60px] h-full transition-all duration-300"
                  >
                    <span
                      className={`text-2xl ${isSelected ? "text-[#7B4F3A]" : "text-[#323232]"}`}
                    >
                      {isSelected
                        ? iconMapping[content.title].filled
                        : iconMapping[content.title].outline}
                    </span>

                    <span
                      className={`text-xs font-medium ${isSelected ? "text-[#7B4F3A]" : "text-[#323232]"}`}
                    >
                      {content.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error("useMarketplace must be used within a MarketplaceProvider");
  }
  return context;
}
