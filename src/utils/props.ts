import { LatLngTuple } from "leaflet";
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

export interface PriceTabProps {
  priceRange: [number, number];
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
}

export interface RoomsTabProps {
  bedrooms: string | null;
  beds: string | null;
  bathrooms: string | null;
  onSelect: (type: "bedrooms" | "beds" | "bathrooms", value: string) => void;
}

export interface TypeTabProps {
  propertyTypes: string[];
  togglePropertyType: (type: string) => void;
}

export interface AmenitiesTabProps {
  amenities: string[];
  toggleAmenity: (amenity: string) => void;
}

export interface BookTabProps {
  instantBooking: boolean;
  selfCheckIn: boolean;
  setInstantBooking: React.Dispatch<React.SetStateAction<boolean>>;
  setSelfCheckIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface FilterModalProps {
  onApplyFilters: (filters: {
    priceRange: [number, number];
    bedrooms: string | null;
    beds: string | null;
    bathrooms: string | null;
    amenities: string[];
    propertyTypes: string[];
    instantBooking: boolean;
    selfCheckIn: boolean;
  }) => void;
  initialFilters?: Partial<{
    priceRange: [number, number];
    bedrooms: string | null;
    beds: string | null;
    bathrooms: string | null;
    amenities: string[];
    propertyTypes: string[];
    instantBooking: boolean;
    selfCheckIn: boolean;
  }>;
  isOpen: boolean;
  onClose: () => void;
}

export type TabType = "price" | "rooms" | "type" | "amenities" | "book";

export interface Property {
  id: number;
  propertyName: string;
  propertyCategory: string;
  propertyDetails: {
    price: number;
    currency: string;
    period: string;
    location: string;
    bedrooms: number;
    bathrooms: number;
    guests: number;
    rating: number;
  };
  propertyDescription: string;
  propertyHost: {
    name: string;
    profilePicture: string;
  };
  amenities: string[];
  images: string[];
  isVerified: boolean;
  listedDate: string;
  reviews?: string[];
  location?: {
    position?: [number, number];
    name?: string;
    details?: string;
  };
  importantInfo?: {
    title?: string;
    items?: string[];
  };
}

export interface MarketplaceContextType {
  selected: string;
  setSelected: (value: string) => void;
  openSearchModal: () => void;
}
