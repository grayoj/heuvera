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
