import React, { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { MobileSearchBar } from "./mobile/MobileSearchBar";
import { DesktopSearchBar } from "./desktop/DesktopSearchBar";
import { FilterType, SearchBarProps } from "@heuvera/utils/props";
import RenderMobileSearchBar from "./mobile/SearchBarContents";

const SearchBar = React.memo(({ isMobile }: SearchBarProps) => {
  const [activeFilter, setActiveFilter] = useState<FilterType | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(
    new Date(),
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        if (isSearchModalOpen) {
          setIsSearchModalOpen(false);
        }
        setActiveFilter(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchModalOpen]);

  useEffect(() => {
    if (isSearchModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSearchModalOpen]);

  const openSearchModal = useCallback(() => {
    setIsSearchModalOpen(true);
  }, []);

  const closeSearchModal = useCallback(() => {
    setIsSearchModalOpen(false);
    setActiveFilter(null);
  }, []);

  const clearAll = useCallback(() => {
    setActiveFilter(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setSearchText("");
  }, []);

  const toggleFilter = useCallback((filter: FilterType) => {
    setActiveFilter((prev) => (prev === filter ? null : filter));
  }, []);

  const renderSearchModal = useCallback(() => {
    return (
      <RenderMobileSearchBar
        closeSearchModal={closeSearchModal}
        toggleFilter={toggleFilter}
        activeFilter={activeFilter}
        clearAll={clearAll}
      />
    );
  }, [closeSearchModal, toggleFilter, activeFilter, clearAll]);

  if (isMobile) {
    return (
      <div className="flex-1">
        <MobileSearchBar openSearchModal={openSearchModal} />
        <AnimatePresence>
          {isSearchModalOpen && renderSearchModal()}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="w-full" ref={searchContainerRef}>
      <DesktopSearchBar
        activeFilter={activeFilter}
        toggleFilter={toggleFilter}
        clearAll={clearAll}
        searchText={searchText}
        setSearchText={setSearchText}
        checkInDate={checkInDate}
        setCheckInDate={setCheckInDate}
        checkOutDate={checkOutDate}
        setCheckOutDate={setCheckOutDate}
      />
    </div>
  );
});

SearchBar.displayName = "SearchBar";

export default SearchBar;
