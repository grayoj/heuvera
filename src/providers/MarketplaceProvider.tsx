'use client';

import {
  useMemo,
  useState,
  createContext,
  useContext,
  JSX,
  useRef,
  useEffect,
} from 'react';
import {
  LucideSearch,
  LucideHeart,
  LucideCompass,
  LucideX,
  LucideFilter,
  LucideCalendar,
  LucideUsers,
  LucideMapPin,
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { HeuveraLogo } from '@heuvera/components/logo';
import useIsMobile from '@heuvera/hooks/IsMobile';
import { GoHeart, GoHeartFill, GoHome, GoHomeFill } from 'react-icons/go';
import React from 'react';
import { IoCompass, IoCompassOutline } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';

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
  showSearch = true,
}: {
  children: React.ReactNode;
  className?: string;
  showSearch?: boolean;
}) {
  const [selected, setSelected] = useState<string>('Explore');
  const isMobile = useIsMobile();
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const navRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const NavigationContent = useMemo(
    () => [
      { title: 'Explore', link: '/marketplace/explore', icon: <GoHomeFill /> },
      { title: 'Favorites', link: '#favorites', icon: <LucideHeart /> },
      { title: 'Discover', link: '#discover', icon: <LucideCompass /> },
      { title: 'Profile', link: '#profile', icon: null },
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
      filled: <Avatar className="rounded-full overflow-hidden block border-2 border-[#7B4F3A] ring-2 ring-[#7B4F3A]">
        <AvatarImage
          src="https://lh3.googleusercontent.com/a/ACg8ocKQWfaudEjOg1tHLb3WZFMGH1DLf56QEhrIhRYRMeJVROgTRbifUA=s96-c"
          alt="avatar"
        />
        <AvatarFallback>FG</AvatarFallback>
      </Avatar>,
      outline: <Avatar className="rounded-full overflow-hidden block">
        <AvatarImage
          src="https://lh3.googleusercontent.com/a/ACg8ocKQWfaudEjOg1tHLb3WZFMGH1DLf56QEhrIhRYRMeJVROgTRbifUA=s96-c"
          alt="avatar"
        />
        <AvatarFallback>FG</AvatarFallback>
      </Avatar>,
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

  useEffect(() => {
    if (isSearchModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isSearchModalOpen]);

  const openSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
    setActiveFilter(null);
  };

  const toggleFilter = (filter: string) => {
    if (activeFilter === filter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filter);
    }
  };

  return (
    <MarketplaceContext.Provider value={{ selected, setSelected, openSearchModal }}>
      <div className="w-full h-full flex flex-col">
        <div className="px-4 md:px-20 lg:px-20 xl:px-20 2xl:px-20 h-24 w-full flex items-center justify-between">
          <div className="flex-shrink-0">
            <HeuveraLogo width={35} height={35} />
          </div>

          {isMobile && showSearch && (
            <div className="flex-1 px-4">
              <button
                onClick={openSearchModal}
                className="flex items-center bg-[#F8F7F2] border border-[#C4C3B8] rounded-full px-4 py-3 w-full shadow-sm"
              >
                <LucideSearch className="text-[#7B4F3A] text-lg mr-2" />
                <span className="text-[#323232] font-serif text-md">Search properties...</span>
              </button>
            </div>
          )}

          {!isMobile && (
            <div className="flex-1 flex justify-center">
              <div className="flex items-center space-x-12 md:space-x-4 lg:space-x-6 xl:space-x-10 2xl:space-x-12">
                {NavigationContent.slice(0, 3).map((content, index) => (
                  <div key={index}>
                    <button
                      onClick={() => setSelected(content.title)}
                      className={`text-base md:text-xs lg:text-xs xl:text-base 2xl:text-base font-medium font-serif transition-colors duration-300 px-2 pb-2 ${selected === content.title
                        ? 'text-[#7B4F3A] font-semibold border-[#7B4F3A] border-b-2'
                        : 'text-[#323232] hover:text-primary'
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
                  initial={{ width: '40px' }}
                  animate={{ width: isSearchOpen ? '250px' : '40px' }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
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
                      animate={{ opacity: 1, width: '100%' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              </div>
            )}

            <div className="size-10 md:size-6 lg:size-7 xl:size-8 2xl:size-8">
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
          <div className="w-full h-[90px] fixed bottom-3 left-0 px-4 z-[1000]">
            <div className="w-full bg-[#E3E2D9] shadow-md rounded-2xl px-4 flex items-center h-[70px] justify-between">
              {NavigationContent.map((content, index) => {
                const isSelected = selected === content.title;

                return (
                  <button
                    key={index}
                    ref={(el) => {
                      navRefs.current[index] = el;
                    }}
                    onClick={() => setSelected(content.title)}
                    className="flex flex-col items-center justify-center min-w-[60px] h-full transition-all duration-300"
                  >
                    {content.title === "Profile" ? (
                      <span
                        className={`text-2xl ${isSelected ? "text-[#7B4F3A] border-2 border-[#7B4F3A] bg-[#7B4F3A] rounded-full" : "text-[#323232]"}`}
                      >
                        <div className="size-6 md:size-6 lg:size-7 xl:size-8 2xl:size-8">
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
                        className={`text-2xl ${isSelected ? "text-[#7B4F3A]" : "text-[#323232]"}`}
                      >
                        {isSelected
                          ? iconMapping[content.title]?.filled
                          : iconMapping[content.title]?.outline}
                      </span>
                    )}

                    <span
                      className={`text-xs font-medium ${isSelected ? "text-[#7B4F3A]" : "text-[#323232]"
                        }`}
                    >
                      {content.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Airbnb-style Search Modal */}
        <AnimatePresence>
          {isSearchModalOpen && (
            <motion.div
              className="fixed inset-0 bg-[#E3E2D9] z-[2000] flex flex-col p-4"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-[#E3E2D9]">
                <button
                  onClick={closeSearchModal}
                  className="p-2 rounded-full hover:bg-[#F8F7F2]"
                >
                  <LucideX className="text-[#323232]" />
                </button>
                <span className="font-serif font-medium text-[#323232]">Search</span>
                <button className="p-2 rounded-full hover:bg-[#F8F7F2]">
                  <LucideFilter className="text-[#323232]" />
                </button>
              </div>

              {/* Main search bar */}
              <div className="p-4 shadow-md bg-[#F8F7F2] rounded-2xl">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <LucideSearch className="text-[#7B4F3A]" />
                  </div>
                  <input
                    type="text"
                    placeholder="Where are you going?"
                    className="w-full pl-12 pr-4 py-3 bg-[#F8F7F2] border border-[#C4C3B8] rounded-full outline-none text-[#323232] font-serif"
                    autoFocus
                  />
                </div>
              </div>

              {/* Filter tabs */}
              <div className="px-4 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {[
                  { id: 'location', label: 'Where', icon: <LucideMapPin size={16} /> },
                  { id: 'dates', label: 'When', icon: <LucideCalendar size={16} /> },
                  { id: 'guests', label: 'Who', icon: <LucideUsers size={16} /> },
                ].map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => toggleFilter(filter.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border ${activeFilter === filter.id
                      ? 'border-[#7B4F3A] bg-[#F8F7F2] text-[#7B4F3A]'
                      : 'border-[#E3E2D9] text-[#323232]'
                      }`}
                  >
                    {filter.icon}
                    <span className="font-serif">{filter.label}</span>
                  </button>
                ))}
              </div>

              {/* Filter content based on active filter */}
              <div className="flex-1 p-4 overflow-y-auto">
                {activeFilter === 'location' && (
                  <div className="space-y-4">
                    <h3 className="font-serif font-medium text-lg text-[#323232]">Popular destinations</h3>
                    {['Malibu, California', 'Miami, Florida', 'Aspen, Colorado', 'New York, New York', 'Las Vegas, Nevada'].map((location) => (
                      <div key={location} className="flex items-center gap-3 p-3 hover:bg-[#F8F7F2] rounded-lg cursor-pointer">
                        <LucideMapPin className="text-[#7B4F3A]" />
                        <span className="font-serif">{location}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeFilter === 'dates' && (
                  <div className="space-y-4">
                    <h3 className="font-serif font-medium text-lg text-[#323232]">When will you be there?</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 border border-[#E3E2D9] rounded-lg">
                        <p className="text-sm text-[#7B4F3A] font-medium">Check in</p>
                        <p className="font-serif">Add date</p>
                      </div>
                      <div className="p-3 border border-[#E3E2D9] rounded-lg">
                        <p className="text-sm text-[#7B4F3A] font-medium">Check out</p>
                        <p className="font-serif">Add date</p>
                      </div>
                    </div>
                    <div className="p-3 border border-[#E3E2D9] rounded-lg">
                      <p className="text-sm text-[#7B4F3A] font-medium">Flexibility</p>
                      <p className="font-serif">Exact dates</p>
                    </div>
                  </div>
                )}

                {activeFilter === 'guests' && (
                  <div className="space-y-4">
                    <h3 className="font-serif font-medium text-lg text-[#323232]">Who's coming?</h3>

                    {['Adults', 'Children', 'Infants', 'Pets'].map((guestType) => (
                      <div key={guestType} className="flex items-center justify-between py-3 border-b border-[#E3E2D9]">
                        <div>
                          <p className="font-serif">{guestType}</p>
                          {guestType === 'Adults' && <p className="text-sm text-[#7B4F3A]">Ages 13+</p>}
                          {guestType === 'Children' && <p className="text-sm text-[#7B4F3A]">Ages 2-12</p>}
                          {guestType === 'Infants' && <p className="text-sm text-[#7B4F3A]">Under 2</p>}
                        </div>
                        <div className="flex items-center gap-4">
                          <button className="w-8 h-8 rounded-full border border-[#C4C3B8] flex items-center justify-center text-[#323232]">-</button>
                          <span className="w-5 text-center">0</span>
                          <button className="w-8 h-8 rounded-full border border-[#C4C3B8] flex items-center justify-center text-[#323232]">+</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {!activeFilter && (
                  <div className="space-y-4">
                    <h3 className="font-serif font-medium text-lg text-[#323232]">Recent searches</h3>
                    <div className="space-y-3">
                      {['Malibu Beach House - 2 nights', 'Downtown Loft - 3 nights', 'Mountain Cabin - Weekend'].map((search) => (
                        <div key={search} className="flex items-center gap-3 p-3 hover:bg-[#F8F7F2] rounded-lg cursor-pointer">
                          <LucideSearch className="text-[#7B4F3A]" />
                          <span className="font-serif">{search}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer with search button */}
              <div className="p-4 border-t border-[#E3E2D9]">
                <button className="w-full bg-[#7B4F3A] text-white font-serif font-medium py-3 rounded-full">
                  Search
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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