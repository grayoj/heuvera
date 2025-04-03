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