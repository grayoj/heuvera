"use client";

import { useEffect, useState, useMemo, JSX } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet";
import { divIcon, LatLngTuple } from "leaflet";
import L from "leaflet";
import Image from "next/image";
import { FaBuilding, FaStar, FaTree, FaWarehouse } from "react-icons/fa6";
import ReactDOMServer from "react-dom/server";
import { GoHomeFill } from "react-icons/go";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

import "leaflet/dist/leaflet.css";
import React from "react";

const DefaultIcon = L.icon({
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const FitMapToBounds = React.memo(
  ({ positions, isTrayOpen }: { positions: LatLngTuple[]; isTrayOpen: boolean }) => {
    const map = useMap();

    useEffect(() => {
      if (positions.length > 0) {
        const bounds =
          positions.length > 1
            ? new L.LatLngBounds(positions)
            : L.latLngBounds([
                [positions[0][0] - 0.01, positions[0][1] - 0.01],
                [positions[0][0] + 0.01, positions[0][1] + 0.01],
              ]);
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }, [map, positions, isTrayOpen]);

    return null;
  },
);

const MapRecenter = React.memo(({ center }: { center: LatLngTuple }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, map.getZoom(), { animate: true });
  }, [center, map]);

  return null;
});

const ThemeDetector = React.memo(({ isDarkMode }: { isDarkMode: boolean }) => {
  const map = useMap();

  useEffect(() => {
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    const tileUrl = isDarkMode
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

    L.tileLayer(tileUrl, {
      attribution: '&copy; <a href="https://www.carto.com/">CartoDB</a>',
    }).addTo(map);
  }, [map, isDarkMode]);

  return null;
});

interface Property {
  id: number;
  name: string;
  price: string;
  rating: number;
  position: LatLngTuple;
  image: string;
  description: string;
  icon: React.ReactNode;
  [key: string]: any;
  propertyType: "apartment" | "house" | "office" | "land";
}

interface MapComponentsProps {
  center: LatLngTuple;
  properties: Property[];
  markerPositions: LatLngTuple[];
  center_radius: LatLngTuple;
  radius: number;
  isTrayOpen: boolean;
  setSelectedProperty: (property: Property | null) => void;
}

const getPropertyIcon = (type: string) => {
  const icons: Record<string, JSX.Element> = {
    apartment: <FaBuilding size={20} color="#7B4F3A" />,
    house: <FaHome size={20} color="#7B4F3A" />,
    office: <FaWarehouse size={20} color="#7B4F3A" />,
    land: <FaTree size={20} color="#7B4F3A" />,
  };

  return icons[type] || <GoHomeFill size={20} color="#7B4F3A" />;
};

const MapComponents = ({
  center,
  properties,
  markerPositions,
  center_radius,
  radius,
  isTrayOpen,
  setSelectedProperty,
}: MapComponentsProps) => {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      setIsDarkMode(
        window.matchMedia("(prefers-color-scheme: dark)").matches ||
          document.documentElement.classList.contains("dark"),
      );
    };

    updateTheme();

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", updateTheme);

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true });

    return () => {
      mediaQuery.removeEventListener("change", updateTheme);
      observer.disconnect();
    };
  }, []);

  const tileLayerUrl = useMemo(
    () =>
      isDarkMode
        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    [isDarkMode],
  );

  const circleOptions = useMemo(
    () => ({
      color: isDarkMode ? "rgba(158, 122, 106, 0.9)" : "rgba(123, 79, 58, 0.9)",
      weight: 3,
      fillOpacity: 0.1,
    }),
    [isDarkMode],
  );

  const propertyMarkers = useMemo(
    () =>
      properties.map((property) => (
        <Marker
          key={property.id}
          position={property.position}
          eventHandlers={{ click: () => setSelectedProperty(property) }}
          icon={divIcon({
            className: "",
            html: ReactDOMServer.renderToString(
              <div
                className={`${
                  isDarkMode ? "bg-[#333333]" : "bg-white"
                } p-1 rounded-full shadow-md flex items-center justify-center`}
                style={{ width: "32px", height: "32px" }}
              >
                {getPropertyIcon(property.propertyType)}
              </div>,
            ),
            iconSize: [32, 32],
            iconAnchor: [16, 16],
          })}
        >
          <Popup keepInView closeButton={false} className="w-48 p-0 m-0 dark:bg-[#333333]">
            <Link href={`/explore/${property.id}`} key={property.id}>
              <div className="py-1 flex flex-col gap-1 font-serif">
                <Image
                  src={property.image}
                  alt={property.name}
                  height={500}
                  width={500}
                  className="rounded-t-lg object-cover"
                  style={{ width: "100%", height: "auto" }}
                />
                <div className="px-2">
                  <h3 className="font-bold text-[#3e3e3e] dark:text-gray-200 text-xs">
                    {property.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-[10px] text-[#7B4F3A] dark:text-[#9E7A6A]">
                      {property.price}
                    </h3>
                    <div className="flex flex-row gap-1 items-center text-[10px] font-semibold">
                      {property.rating} <FaStar className="text-yellow-400" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </Popup>
        </Marker>
      )),
    [properties, setSelectedProperty, isDarkMode],
  );

  return (
    <div className="w-full h-full relative">
      <MapContainer center={center} zoom={13} scrollWheelZoom className="w-full h-full">
        <MapRecenter center={center} />
        <TileLayer attribution='&copy; <a href="https://www.carto.com/">CartoDB</a>' url={tileLayerUrl} />
        <ThemeDetector isDarkMode={isDarkMode} />
        <FitMapToBounds positions={markerPositions} isTrayOpen={isTrayOpen} />
        <Circle center={center_radius} radius={radius} pathOptions={circleOptions} />
        {propertyMarkers}
      </MapContainer>
    </div>
  );
};

export default React.memo(MapComponents);
