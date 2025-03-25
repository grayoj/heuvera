import { Dispatch, SetStateAction, ReactNode } from 'react';
import { LatLngTuple } from 'leaflet';

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

export type ViewMode = 'grid' | 'list';
export type SortOption = 'recent' | 'price-low' | 'price-high';
