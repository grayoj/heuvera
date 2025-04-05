"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import SectionHeaderText from "../text/SectionHeaderText";
const defaultIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function LocationSection() {
  const position: [number, number] = [9.0765, 7.4815];

  return (
    <div className="w-full flex flex-col gap-2">
      <SectionHeaderText title="Where you're staying" />

      <div className="w-full h-52 md:h-90 lg:h-90 xl:h-90 2xl:h-90 rounded-xl overflow-hidden">
        <MapContainer
          center={position}
          zoom={14}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
          className="rounded-xl"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={defaultIcon}>
            <Popup>Your accommodation in Maitama, Abuja, Nigeria</Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className="pt-2">
        <p className="text-sm text-gray-600 dark:text-gray-200">
          Maitama, Abuja, Nigeria
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          5 minutes to city center, 20 minutes to airport
        </p>
      </div>
    </div>
  );
}
