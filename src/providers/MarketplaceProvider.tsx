"use client";

import {
  useState,
  createContext,
  useContext,
  JSX,
  useRef,
  useEffect,
} from "react";
import { LucideHeart, LucideCompass, LucideUser } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { HeuveraLogo } from "@heuvera/components/logo";
import useIsMobile from "@heuvera/hooks/IsMobile";
import { GoHeart, GoHeartFill, GoHome, GoHomeFill } from "react-icons/go";
import React from "react";
import { IoCompass, IoCompassOutline } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";
import Footer from "@heuvera/components/footer";
import Link from "next/link";
import { ProfileDropdown } from "@heuvera/components/ProfileDropdown";
import { useAuthClient } from "@heuvera/hooks/useAuth";
import { MarketplaceContextType } from "@heuvera/utils/props";

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
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading } = useAuthClient();

  const NavigationContent = [
    { title: "Explore", link: "/", icon: <GoHomeFill /> },
    { title: "Discover", link: "/discover", icon: <LucideCompass /> },
    { title: "Favorites", link: "/favorites", icon: <LucideHeart /> },
    { title: "Account", link: "/account", icon: <></> },
  ];

  const iconMapping: {
    [key: string]: { filled: JSX.Element; outline: JSX.Element };
  } = {
    Explore: {
      filled: <GoHomeFill fill="#7B4F3A" className="text-xl" />,
      outline: (
        <GoHome className="text-[#333333] dark:text-[#F8F7F2] text-xl" />
      ),
    },
    Favorites: {
      filled: <GoHeartFill fill="#7B4F3A" className="text-xl" />,
      outline: (
        <GoHeart className="text-[#333333] dark:text-[#F8F7F2] text-xl" />
      ),
    },
    Discover: {
      filled: <IoCompass className="text-2xl" fill="#7B4F3A" />,
      outline: (
        <IoCompassOutline className="text-2xl dark:text-[#F8F7F2] text-[#333333]" />
      ),
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
        <div className="w-full backdrop-blur-xl sticky top-0 bg-[#F8F7F299] dark:bg-[#33333399] z-[3000]">
          <div className="px-4 md:px-8 lg:px-12 xl:px-14 2xl:px-20 h-20 w-full flex items-center justify-between">
            {isMobile ? (
              //Remove the gap-2 and the beta pill
              <div className="w-full gap-2 flex items-center justify-center backdrop-blur-none">
                <Link href="/">
                  <HeuveraLogo width={35} height={35} />
                </Link>
                <div className="max-w-fit w-full px-3 py-1 border rounded-full flex items-center justify-center border-[#7B4F3A] dark:border-[#8B5F4D]">
                  <h1 className="text-[#7B4F3A] text-xs dark:text-[#8B5F4D]">
                    BETA
                  </h1>
                </div>
              </div>
            ) : (
              //Formerly w-24, remove the "flex items-center justify-center alongside the pill"
              <div className="flex-shrink-0 w-32 flex items-center justify-between">
                <Link href="/">
                  <HeuveraLogo width={35} height={35} />
                </Link>
                <div className="max-w-fit w-full px-4 py-1 border rounded-full flex items-center justify-center border-[#7B4F3A] dark:border-[#8B5F4D]">
                  <h1 className="text-[#7B4F3A] text-sm dark:text-[#8B5F4D]">
                    BETA
                  </h1>
                </div>
              </div>
            )}
            {!isMobile && (
              <div className="flex items-center space-x-8">
                {NavigationContent.slice(0, 3).map((content, index) => (
                  <Link
                    key={index}
                    href={content.link}
                    prefetch={true}
                    className={`text-sm font-medium font-serif transition-colors duration-300 px-2 pb-2 ${
                      pathname === content.link
                        ? "text-[#7B4F3A] dark:text-[#8B5F4D] font-semibold border-[#7B4F3A] dark:border-[#8B5F4D] border-b-2"
                        : "text-[#333333] dark:text-[#F8F7F2] hover:transition-transform duration-300 hover:scale-102 hover:font-medium"
                    }`}
                  >
                    {content.title}
                  </Link>
                ))}
              </div>
            )}
            {!isMobile && (
              <div className="w-32 flex items-end justify-end">
                {isLoading ? (
                  <div className="h-10 w-10 rounded-full bg-[#E0E0E0] dark:bg-[#444444] animate-pulse" />
                ) : isAuthenticated ? (
                  <ProfileDropdown
                    selected="Profile"
                    avatarUrl={user?.picture ?? undefined}
                    fallbackName={user?.name || user?.email || undefined}
                  />
                ) : (
                  <a className="cursor-pointer" href="/api/auth/login">
                    <div className="size-7 p-1  text-[#333333] dark:text-[#F8F7F2] ring-[#333333] dark:ring-[#F8F7F2] ring rounded-full flex items-center justify-center">
                      <LucideUser />
                    </div>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="pb-32 w-full flex-1 flex flex-col gap-32">
          {children}
          <Footer />
        </div>

        {isMobile && (
          <div className="w-full h-[90px] fixed bottom-3 left-0 px-4 z-[1000]">
            <div className="w-full backdrop-blur-xl bg-[#E3E2D999] dark:bg-[#44444499] shadow-md rounded-2xl">
              <div className="w-full px-4 flex items-center h-[70px] justify-between overflow-hidden">
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
                      {content.title === "Account" ? (
                        <span
                          className={`text-2xl ${isSelected ? "text-[#7B4F3A] dark:text-[#8B5F4D] border-2 border-[#7B4F3A] dark:border-[#8B5F4D] bg-transparent rounded-full" : "text-[#333333]"}`}
                        >
                          {isLoading ? (
                            <div className="size-[1.25rem] rounded-full bg-[#E0E0E0] dark:bg-[#444444] animate-pulse" />
                          ) : isAuthenticated ? (
                            <Avatar className="rounded-full overflow-hidden block">
                              <AvatarImage
                                src={user?.picture || "/no-avatar.jpg"}
                                alt="avatar"
                              />
                              <AvatarFallback>FG</AvatarFallback>
                            </Avatar>
                          ) : (
                            <a
                              className="cursor-pointer"
                              href="/api/auth/login"
                            >
                              <div className="size-[1.25rem] p-1 text-[#333333] dark:text-[#F8F7F2] ring-[#333333] dark:ring-[#F8F7F2] ring rounded-full flex items-center justify-center">
                                <LucideUser />
                              </div>
                            </a>
                          )}
                        </span>
                      ) : (
                        <span
                          className={`text-2xl ${isSelected ? "text-[#7B4F3A] dark:text-[#8B5F4D]" : "text-[#333333] dark:text-[#F8F7F2]"}`}
                        >
                          {isSelected
                            ? iconMapping[content.title]?.filled
                            : iconMapping[content.title]?.outline}
                        </span>
                      )}

                      <span
                        className={`text-xs font-medium ${isSelected ? "text-[#7B4F3A] dark:text-[#8B5F4D]" : "text-[#333333] dark:text-[#F8F7F2]"}`}
                      >
                        {content.title}
                      </span>
                    </button>
                  );
                })}
              </div>
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
