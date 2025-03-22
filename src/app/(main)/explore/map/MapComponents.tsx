import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import { divIcon, LatLngTuple, LatLngBounds } from "leaflet";
import L from "leaflet";
import { ReactNode, useEffect } from "react";
import Image from "next/image";
import { IoHome, IoStar } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";
import ReactDOMServer from "react-dom/server";
import { GoHome, GoHomeFill } from "react-icons/go";
// FitMapToBounds component
const FitMapToBounds = ({ positions }: {
    positions: LatLngTuple[];
    isTrayOpen: boolean
}) => {
    const map = useMap();

    useEffect(() => {
        if (positions.length > 1) {
            const bounds = new L.LatLngBounds(positions);
            map.fitBounds(bounds, { padding: [80, 50] });

            
        }
    }, [map, positions]);

    return null;
};

// Define interface for property type
interface Property {
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

// Props interface for MapComponents
interface MapComponentsProps {
    center: LatLngTuple;
    properties: Property[];
    markerPositions: LatLngTuple[];
    center_radius: LatLngTuple;
    radius: number;
    isTrayOpen: boolean;
    setSelectedProperty: (property: Property | null) => void;
    // className: string;
}

const MapComponents = ({
    center,
    properties,
    markerPositions,
    center_radius,
    radius,
    isTrayOpen,
    setSelectedProperty,
}: MapComponentsProps) => {
    return (
        <div className="flex justify-center items-center w-full h-screen"> {/* Centered Container */}
            <MapContainer center={center} zoom={12} className="w-[90%] h-[80vh] z-0 rounded-lg shadow-lg">
                <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                <FitMapToBounds positions={markerPositions} isTrayOpen={isTrayOpen} />

                {/* Circular Boundary */}
                <Circle
                    center={center_radius}
                    radius={radius}
                    pathOptions={{ color: "rgba(123, 79, 58, 0.7)", weight: 3, fillOpacity: 0.1 }}
                />

                {properties.map((property) => (
                    <Marker
                        key={property.id}
                        position={property.position}
                        eventHandlers={{
                            click: () => setSelectedProperty(property),
                            mouseover: (e) => e.target.openPopup(),
                            mouseout: (e) => e.target.closePopup(),
                        }}
                        icon={divIcon({
                            className: "custom-marker",
                            html: ReactDOMServer.renderToString(<GoHomeFill size={24} color="#7B4F3A" />),
                        })}
                    >
                        <Popup keepInView={true} closeButton={false} className="w-52">
                            <div className="py-2 flex flex-col gap-2 font-serif">
                                <Image src={property.image} alt="" height={500} width={500} className="rounded-lg" />
                                <h3 className="font-bold text-[#3e3e3e] text-sm">{property.name}</h3>
                                <div className="flex justify-between items-center">
                                    <h3 className="font-bold text-xs text-[#7B4F3A]">{property.price}</h3>
                                    <div className="flex flex-row gap-1 items-center text-xs font-semibold">
                                        {property.rating} <FaStar className="text-yellow-400" />
                                    </div>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapComponents;