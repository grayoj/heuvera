import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { MobileSearchBar } from "./mobile/MobileSearchBar";
import { DesktopSearchBar } from "./desktop/DesktopSearchBar";
import { FilterType, SearchBarProps } from "@heuvera/utils/props";
import RenderMobileSearchBar from "./mobile/SearchBarContents";

const SearchBar: React.FC<SearchBarProps> = ({ isMobile }) => {
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

  const openSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
    setActiveFilter(null);
  };

  const clearAll = () => {
    setActiveFilter(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setSearchText("");
  };

  const toggleFilter = (filter: FilterType) => {
    if (activeFilter === filter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filter);
    }
  };

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

  function renderSearchModal() {
    return (
      <RenderMobileSearchBar
        closeSearchModal={closeSearchModal}
        toggleFilter={toggleFilter}
        activeFilter={activeFilter}
        clearAll={clearAll}
      />
    );
  }
};

export default SearchBar;
