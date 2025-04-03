import { RefObject } from "react";

export interface ActiveFilters {
    priceRange?: [number, number];
    bedrooms?: string | null;
    beds?: string | null;
    bathrooms?: string | null;
    amenities?: string[];
    propertyTypes?: string[];
    instantBooking?: boolean;
    selfCheckIn?: boolean;
}

export interface FilterTagsProps {
    activeFilters: ActiveFilters;
    removeFilter: (key: keyof ActiveFilters) => void;
}

export interface MobileSearchBarProps {
    openSearchModal: () => void;
}

export type FilterType = "location" | "dates" | "guests";

export interface FilterOption {
    id: FilterType;
    label: string;
    placeholder: string;
    icon?: React.ReactNode;
}

export interface FilterFooterProps {
    clearAll: () => void;
    closeFilter: () => void;
}

export interface DesktopSearchBarProps {
    activeFilter: FilterType | null;
    toggleFilter: (filter: FilterType) => void;
    clearAll: () => void;
    searchText: string;
    setSearchText: (text: string) => void;
    checkInDate: Date | undefined;
    setCheckInDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
    checkOutDate: Date | undefined;
    setCheckOutDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export interface FilterContentProps {
    type: string | null;
    checkInDate: Date | undefined;
    setCheckInDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
    checkOutDate: Date | undefined;
    setCheckOutDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export interface SearchBarProps {
    isMobile: boolean;
}

export type RenderMobileSearchBarProps = {
    closeSearchModal: () => void;
    toggleFilter: (filter: FilterType) => void;
    activeFilter: FilterType | null;
    clearAll: () => void;
};

export interface SearchModalProps {
    isOpen: boolean;
    closeModal: () => void;
    activeFilter: string | null;
    toggleFilter: (filterId: string) => void;
    inputRef: RefObject<HTMLInputElement>;
}