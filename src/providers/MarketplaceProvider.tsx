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
import { LucideHeart, LucideCompass } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { HeuveraLogo } from "@heuvera/components/logo";
import useIsMobile from "@heuvera/hooks/IsMobile";
import { GoHeart, GoHeartFill, GoHome, GoHomeFill } from "react-icons/go";
import React from "react";
import { IoCompass, IoCompassOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Footer from "@heuvera/components/footer";
import Link from "next/link";

interface MarketplaceContextType {
  selected: string;
  setSelected: (value: string) => void;
  openSearchModal: () => void;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(
  undefined,
);

export function MarketplaceProvider({
  children,
}: {
  children: React.ReactNode;
  className?: string;
  showSearch?: boolean;
}) {
  const [selected, setSelected] = useState<string>("Explore");
  const isMobile = useIsMobile();
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const navRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const router = useRouter();

  const NavigationContent = useMemo(
    () => [
      { title: "Explore", link: "/explore", icon: <GoHomeFill /> },
      { title: "Discover", link: "/discover", icon: <LucideCompass /> },
      { title: "Favorites", link: "/favorites", icon: <LucideHeart /> },
      { title: "Profile", link: "/profile", icon: null },
    ],
    [],
  );

  const iconMapping: {
    [key: string]: { filled: JSX.Element; outline: JSX.Element };
  } = {
    Explore: {
      filled: <GoHomeFill fill="#7B4F3A" className="text-xl" />,
      outline: <GoHome className="text-[#323232] text-xl" />,
    },
    Favorites: {
      filled: <GoHeartFill fill="#7B4F3A" className="text-xl" />,
      outline: <GoHeart className="text-[#323232] text-xl" />,
    },
    Discover: {
      filled: <IoCompass className="text-2xl" fill="#7B4F3A" />,
      outline: <IoCompassOutline className="text-2xl text-[#323232]" />,
    },
    Profile: {
      filled: (
        <Avatar className="rounded-full overflow-hidden block border-2 border-[#7B4F3A] ring-2 ring-[#7B4F3A]">
          <AvatarImage
            src="https://lh3.googleusercontent.com/a/ACg8ocKQWfaudEjOg1tHLb3WZFMGH1DLf56QEhrIhRYRMeJVROgTRbifUA=s96-c"
            alt="avatar"
          />
          <AvatarFallback>FG</AvatarFallback>
        </Avatar>
      ),
      outline: (
        <Avatar className="rounded-full overflow-hidden block">
          <AvatarImage
            src="https://lh3.googleusercontent.com/a/ACg8ocKQWfaudEjOg1tHLb3WZFMGH1DLf56QEhrIhRYRMeJVROgTRbifUA=s96-c"
            alt="avatar"
          />
          <AvatarFallback>FG</AvatarFallback>
        </Avatar>
      ),
    },
  };

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

  const openSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  return (
    <MarketplaceContext.Provider
      value={{ selected, setSelected, openSearchModal }}
    >
      <div className="w-full h-full flex flex-col bg-[#F8F7F2] dark:bg-[#333333]">
        <div className="px-4 md:px-8 lg:px-12 xl:px-14 2xl:px-20 h-20 w-full flex items-center justify-between">
          {isMobile ? (
            <div className="w-full flex items-center justify-center">
              <HeuveraLogo width={35} height={35} />
            </div>
          ) : (
            <div className="flex-shrink-0">
              <HeuveraLogo width={35} height={35} />
            </div>
          )}
          {/* Desktop Navigation Items */}
          {!isMobile && (
            <div className="flex items-center space-x-8">
              {NavigationContent.slice(0, 3).map((content, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelected(content.title);
                    router.push(content.link);
                  }}
                  className={`text-sm font-medium font-serif transition-colors duration-300 px-2 pb-2 ${
                    selected === content.title
                      ? "text-[#7B4F3A] dark:text-[#8B5F4D] font-semibold border-[#7B4F3A] dark:border-[#8B5F4D] border-b-2"
                      : "text-[#323232] dark:text-[#F8F7F2] hover:text-[#7B4F3A] dark:text-[#8B5F4D]"
                  }`}
                >
                  {content.title}
                </button>
              ))}
            </div>
          )}
          {!isMobile && (
            <Link href={`/profile`}>
              <div className="flex-shrink-0 flex items-center">
                <div className="size-10 md:size-8">
                  <Avatar
                    className={`rounded-full overflow-hidden block ${
                      selected === "Profile"
                        ? "ring-2 ring-[#7B4F3A] dark:ring-[#8B5F4D]"
                        : ""
                    }`}
                  >
                    <AvatarImage
                      src="https://lh3.googleusercontent.com/a/ACg8ocKQWfaudEjOg1tHLb3WZFMGH1DLf56QEhrIhRYRMeJVROgTRbifUA=s96-c"
                      alt="avatar"
                    />
                    <AvatarFallback>FG</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </Link>
          )}
        </div>

        {/* Main Content */}
        <div className="pb-32 w-full flex-1 flex flex-col gap-32">
          {children}
          <Footer />
        </div>

        {/* Mobile Navigation Bar */}
        {isMobile && (
          <div className="w-full h-[90px] fixed bottom-3 left-0 px-4 z-[1000]">
            <div className="w-full bg-[#E3E2D9] dark:bg-[#555555] shadow-md rounded-2xl px-4 flex items-center h-[70px] justify-between">
              {NavigationContent.map((content, index) => {
                const isSelected = selected === content.title;

                return (
                  <button
                    key={index}
                    ref={(el) => {
                      navRefs.current[index] = el;
                    }}
                    onClick={() => {
                      setSelected(content.title);
                      router.push(content.link);
                    }}
                    className="flex flex-col items-center justify-center min-w-[60px] h-full transition-all duration-300"
                  >
                    {content.title === "Profile" ? (
                      <span
                        className={`text-2xl ${isSelected ? "text-[#7B4F3A] dark:text-[#8B5F4D] border-2 border-[#7B4F3A] dark:border-[#8B5F4D] bg-[#7B4F3A] dark:bg-[#8B5F4D] rounded-full" : "text-[#323232]"}`}
                      >
                        <div className="size-6">
                          <Avatar className="rounded-full overflow-hidden block">
                            <AvatarImage
                              src="https://lh3.googleusercontent.com/a/ACg8ocKQWfaudEjOg1tHLb3WZFMGH1DLf56QEhrIhRYRMeJVROgTRbifUA=s96-c"
                              alt="avatar"
                            />
                            <AvatarFallback>FG</AvatarFallback>
                          </Avatar>
                        </div>
                      </span>
                    ) : (
                      <span
                        className={`text-2xl ${isSelected ? "text-[#7B4F3A] dark:text-[#8B5F4D]" : "text-[#323232] dark:text-[#F8F7F2]"}`}
                      >
                        {isSelected
                          ? iconMapping[content.title]?.filled
                          : iconMapping[content.title]?.outline}
                      </span>
                    )}

                    <span
                      className={`text-xs font-medium ${isSelected ? "text-[#7B4F3A] dark:text-[#8B5F4D]" : "text-[#323232] dark:text-[#F8F7F2]"}`}
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
