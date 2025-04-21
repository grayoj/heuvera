import { Dispatch, SetStateAction, ReactNode } from "react";
import { LatLngTuple } from "leaflet";

export interface Property {
  id: number;
  name: string;
  price: string;
  rating: number;
  position: LatLngTuple;
  image: string;
  description: string;
  icon: ReactNode;
  [key: string]: any;
  location?: string;
  propertyType: "apartment" | "house" | "office" | "land";
}

export interface MapComponentsProps {
  center: LatLngTuple;
  properties: Property[];
  markerPositions: LatLngTuple[];
  center_radius: LatLngTuple;
  radius: number;
  isTrayOpen: boolean;
  setSelectedProperty: Dispatch<SetStateAction<Property | null>>;
}

export interface MapSectionProps {
  properties?: Property[];
  isTrayOpen?: boolean;
}

export type SortOption = "recent" | "price-low" | "price-high";
