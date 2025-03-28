import { cn } from "@heuvera/lib/utils";
import { Switch } from "@radix-ui/react-switch";
import {
    Wifi, WashingMachine, Utensils, Video, Refrigerator,
    Home, LucideConciergeBell, LucideOption, Bed,
    Shield, CheckIcon, LucideSlidersHorizontal, X
} from "lucide-react";
import React, { useState } from "react";
import { IoBedOutline } from "react-icons/io5";
import Currency from "./icons/svgs/currency";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";

// Type definitions
type TabType = 'price' | 'rooms' | 'type' | 'amenities' | 'book';

// Configuration arrays
const NUMBER_OPTIONS = {
    bedrooms: ['Any', '1', '2', '3', '4', '5', '5+'],
    beds: ['Any', '1', '2', '3', '4', '5', '5+', '6'],
    bathrooms: ['Any', '1', '2', '3', '4', '5', '5+']
};

const AMENITIES_CONFIG = [
    { name: 'Wifi', icon: Wifi, defaultSelected: true },
    { name: 'Washer', icon: WashingMachine, defaultSelected: true },
    { name: 'Kitchen', icon: Utensils, defaultSelected: true },
    { name: 'Security cameras', icon: Video, defaultSelected: false },
    { name: 'Refrigerator', icon: Refrigerator, defaultSelected: false }
];

const TABS_CONFIG = [
    { id: 'price', icon: Currency, label: 'Price', mobileLabel: 'Price' },
    { id: 'rooms', icon: IoBedOutline, label: 'Rooms & Beds', mobileLabel: 'Rooms' },
    { id: 'type', icon: Home, label: 'Type', mobileLabel: 'Type' },
    { id: 'amenities', icon: LucideConciergeBell, label: 'Amenities', mobileLabel: 'Amen.' },
    { id: 'book', icon: LucideOption, label: 'Book', mobileLabel: 'Book' }
];

const PROPERTY_TYPES = [
    { name: 'Entire place', icon: Home },
    { name: 'Private room', icon: Bed },
    { name: 'Shared room', icon: Shield },
    { name: 'Apartment', icon: Home },
    { name: 'House', icon: Home },
    { name: 'Loft', icon: Home }
];

interface FilterModalProps {
    onApplyFilters: (filters: {
        priceRange: [number, number],
        bedrooms: string | null,
        beds: string | null,
        bathrooms: string | null,
        amenities: string[],
        propertyTypes: string[],
        instantBooking: boolean,
        selfCheckIn: boolean
    }) => void;
    initialFilters?: Partial<{
        priceRange: [number, number],
        bedrooms: string | null,
        beds: string | null,
        bathrooms: string | null,
        amenities: string[],
        propertyTypes: string[],
        instantBooking: boolean,
        selfCheckIn: boolean
    }>;
}

export function FilterModal({
    onApplyFilters,
    initialFilters
}: FilterModalProps) {
    // State management
    const [showModal, setShowModal] = useState(true);
    const [activeTab, setActiveTab] = useState<TabType>('price');

    const [priceRange, setPriceRange] = useState<[number, number]>(
        initialFilters?.priceRange || [20000, 100000]
    );
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
        setPriceRange(priceRange);
        setIsEditing(false);
    };
    const [bedrooms, setBedrooms] = useState<string | null>(
        initialFilters?.bedrooms || null
    );
    const [beds, setBeds] = useState<string | null>(
        initialFilters?.beds || null
    );
    const [bathrooms, setBathrooms] = useState<string | null>(
        initialFilters?.bathrooms || null
    );
    const [amenities, setAmenities] = useState<string[]>(
        initialFilters?.amenities ||
        AMENITIES_CONFIG.filter(a => a.defaultSelected).map(a => a.name)
    );
    const [propertyTypes, setPropertyTypes] = useState<string[]>(
        initialFilters?.propertyTypes || []
    );
    const [instantBooking, setInstantBooking] = useState(
        initialFilters?.instantBooking ?? true
    );
    const [selfCheckIn, setSelfCheckIn] = useState(
        initialFilters?.selfCheckIn ?? false
    );

    // Handler functions
    const handleTabChange = (value: TabType) => {
        setActiveTab(value);
    };

    const handleReset = () => {
        setPriceRange([45000, 105000]);
        setBedrooms(null);
        setBeds(null);
        setBathrooms(null);
        setAmenities(AMENITIES_CONFIG.filter(a => a.defaultSelected).map(a => a.name));
        setPropertyTypes([]);
        setInstantBooking(true);
        setSelfCheckIn(false);
    };

    const toggleAmenity = (amenity: string) => {
        setAmenities(prev =>
            prev.includes(amenity)
                ? prev.filter(a => a !== amenity)
                : [...prev, amenity]
        );
    };

    const togglePropertyType = (type: string) => {
        setPropertyTypes(prev =>
            prev.includes(type)
                ? prev.filter(t => t !== type)
                : [...prev, type]
        );
    };

    const handleNumberSelect = (
        type: 'bedrooms' | 'beds' | 'bathrooms',
        value: string,
    ) => {
        const setters = {
            bedrooms: setBedrooms,
            beds: setBeds,
            bathrooms: setBathrooms
        };

        const currentValue = { bedrooms, beds, bathrooms }[type];
        setters[type](value === currentValue ? null : value);
    };

    // Render methods (price, rooms, type, amenities, book tabs)
    // ... (these would be the same as in the previous implementation)

    // Main render
    return (
        <>
            {showModal && (
                <>
                    {/* Modal Overlay */}
                    <div
                        className="fixed inset-0 bg-black/50 z-50"
                        onClick={() => setShowModal(false)}
                    ></div>

                    {/* Modal Content */}
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[60%] 2xl:w-[35%] h-[60%] sm:h-3/5 bg-[#f8f7f2] rounded-lg shadow-lg z-50 flex flex-col">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between border-b p-4 sm:p-5 md:p-6">
                            <div className="flex items-center">
                                <LucideSlidersHorizontal className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                                <h2 className="text-sm sm:text-base md:text-lg font-serif font-medium">Filters</h2>
                            </div>
                            <button
                                onClick={() => setShowModal(false)}
                                className="rounded-full h-6 w-6 sm:h-8 sm:w-8 flex items-center justify-center hover:bg-gray-100"
                            >
                                <X className="h-3 w-3 sm:h-4 sm:w-4" />
                            </button>
                        </div>

                        {/* Tabs and Content */}
                        <div className="w-full flex flex-col flex-grow">
                            {/* Tab Navigation */}
                            <div className="h-14 sm:h-16 md:h-20 flex justify-between border-b px-3 sm:px-4 md:px-6 overflow-x-auto">
                                {TABS_CONFIG.map(({ id, icon: Icon, label, mobileLabel }) => {
                                    const isActive = activeTab === id;
                                    const IconComponent = typeof Icon === 'function' && Icon.length > 0
                                        ? () => <Icon data-isactive={isActive} color={""} className={""} />
                                        : () => (
                                            <Icon
                                                className={cn(
                                                    'h-4 w-4 sm:h-5 sm:w-5',
                                                    isActive
                                                        ? 'text-[#7B4F3A]'
                                                        : 'text-[#323223]'
                                                )} color={""}                                            />
                                        );

                                    return (
                                        <button
                                            key={id}
                                            onClick={() => handleTabChange(id as TabType)}
                                            className={cn(
                                                'flex items-center justify-center gap-1 sm:gap-2 h-14 sm:h-16 md:h-20 max-w-fit rounded-none text-xs sm:text-sm',
                                                isActive ? 'border-b-2 border-[#7B4F3A]' : '',
                                            )}
                                        >
                                            <IconComponent />
                                            <span className={`hidden sm:inline ${isActive ? 'text-[#7B4F3A]' : 'text-[#323223]'}`}>{label}</span>
                                            <span className={`sm:hidden ${isActive ? 'text-[#7B4F3A]' : 'text-[#323223]'}`}>{mobileLabel || label}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Tab Content */}
                            <div className='flex-grow overflow-y-auto p-3 sm:p-4 md:p-6'>
                                {activeTab === 'price' && renderPriceTab()}
                                {activeTab === 'rooms' && renderRoomsTab()}
                                {activeTab === 'type' && renderTypeTab()}
                                {activeTab === 'amenities' && renderAmenitiesTab()}
                                {activeTab === 'book' && renderBookTab()}
                            </div>

                            {/* Footer Buttons */}
                            <div className="flex items-center justify-between p-3 sm:p-4 md:p-6 border-t">
                                <Button
                                    variant="outline"
                                    onClick={handleReset}
                                    className="rounded-full bg-[#f0efe9] hover:bg-[#e8e7e1] text-xs sm:text-sm"
                                >
                                    Reset
                                </Button>
                                <Button
                                    className="rounded-full bg-[#8B4513] hover:bg-[#7a3b10] text-white text-xs sm:text-sm"
                                    onClick={() => {
                                        onApplyFilters({
                                            priceRange,
                                            bedrooms,
                                            beds,
                                            bathrooms,
                                            amenities,
                                            propertyTypes,
                                            instantBooking,
                                            selfCheckIn
                                        });
                                        setShowModal(false);
                                    }}
                                >
                                    Search
                                </Button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );


    function renderPriceTab() {
        // Price tab implementation
        const [isEditing, setIsEditing] = useState(false);

        const handleSave = () => {
            setIsEditing(false); // Exit editing mode
        };

        return (
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
                <h3 className="font-medium font-serif text-sm sm:text-base md:text-lg mb-2 sm:mb-4">Price range</h3>
                <div className="space-y-4 sm:space-y-6">
                    <Slider
                        value={priceRange as [number, number]} // Cast to the correct type
                        onValueChange={(value) => setPriceRange(value as [number, number])} // Cast to the correct type
                        min={0} // Adjust min value as needed
                        max={200000} // Adjust max value as needed
                        step={1000} // Adjust step value as needed
                        className="w-full"
                    />
                    <div className="w-full flex items-end justify-end">
                        <button
                            onClick={() => setIsEditing(!isEditing)} // Toggle editing mode
                            className="text-xs sm:text-sm text-[#A7A7A7] underline"
                        >
                            {isEditing ? 'Save' : 'Edit'} {/* Change button text based on editing state */}
                        </button>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4 rounded-full p-[1px] bg-[#E3E2D9]">
                        {isEditing ? (
                            <>
                                <div className="w-1/2 rounded-full bg-[#E3E2D9] p-0.5">
                                    <div className='w-full rounded-full bg-[#F3F2EC] flex items-center justify-center gap-1 font-serif'>
                                        <Currency className="h-3 w-3 sm:h-4 sm:w-4" color='[#323223]' />
                                        <span className="text-xs sm:text-sm">
                                            Min:
                                        </span>
                                        <input
                                            type="number"
                                            value={priceRange[0]}
                                            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                            className="w-1/2 rounded-full bg-[#F3F2EC] sm:p-2 font-serif"
                                        />
                                    </div>
                                </div>

                                <span className="text-xs sm:text-sm">to</span>
                                <input
                                    type="number"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                    className="w-1/2 rounded-full bg-[#F3F2EC] p-1 sm:p-2 font-serif"
                                />
                            </>
                        ) : (
                            <>
                                <div className="w-1/2 rounded-full bg-[#E3E2D9] p-0.5">
                                    <div className='w-full rounded-full bg-[#F3F2EC] p-1 sm:p-2 flex items-center justify-center gap-1 sm:gap-2 font-serif'>
                                        <Currency className="h-3 w-3 sm:h-4 sm:w-4" color='[#323223]' />
                                        <span className="text-xs sm:text-sm">
                                            Min: <span className='font-semibold font-serif'>{priceRange[0].toLocaleString()}</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="w-1/2 rounded-full bg-[#E3E2D9] p-0.5">
                                    <div className='w-full rounded-full bg-[#F3F2EC] p-1 sm:p-2 flex items-center justify-center gap-1 sm:gap-2 font-serif'>
                                        <Currency className="h-3 w-3 sm:h-4 sm:w-4" color='[#323223]' />
                                        <span className="text-xs sm:text-sm">
                                            Max: <span className='font-semibold font-serif'>{priceRange[1].toLocaleString()}</span>
                                        </span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    function renderRoomsTab() {
        // Rooms tab implementation
        return (
            <div className="space-y-3 sm:space-y-4 md:space-y-5 overflow-y-auto">
                {Object.entries(NUMBER_OPTIONS).map(([type, options], index, array) => (
                    <div key={type}>
                        <h3 className="font-medium mb-2 text-sm capitalize">{type}</h3>
                        <div className="flex gap-1 sm:gap-2 flex-wrap bg-[#E3E2D9] rounded-full min-w-fit max-w-fit p-1">
                            {options.map((num) => (
                                <button
                                    key={`${type}-${num}`}
                                    className={cn(
                                        'rounded-full py-1 px-1 sm:py-2 sm:px-2 md:py-1 md:px-3 text-xs sm:text-sm border',
                                        { bedrooms, beds, bathrooms }[type] === num
                                            ? 'bg-[#F3F2EC] shadow shadow-lg'
                                            : 'bg-[#E3E2D9]',
                                    )}
                                    onClick={() => handleNumberSelect(type as 'bedrooms' | 'beds' | 'bathrooms', num)}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                        {index < array.length - 1 && (
                            <div className="border-b border-[#E3E2D9] w-full my-3 sm:my-4 md:my-5" />
                        )}
                    </div>
                ))}
            </div>
        );
    }

    function renderTypeTab() {
        // Property type tab implementation
        return (
            <div className="space-y-3 sm:space-y-4">
                <h3 className="font-medium text-sm sm:text-base md:text-lg mb-1 sm:mb-2">Property Type</h3>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {PROPERTY_TYPES.map(({ name, icon: Icon }) => (
                        <button
                            key={name}
                            className={cn(
                                'flex items-center gap-1 sm:gap-2 rounded-full py-2 px-3 sm:py-3 sm:px-4 border text-xs sm:text-sm',
                                propertyTypes.includes(name)
                                    ? 'bg-[#f8efe9] border-[#8B4513]'
                                    : 'bg-[#f0efe9]',
                            )}
                            onClick={() => togglePropertyType(name)}
                        >
                            <div className={cn(
                                'flex items-center justify-center',
                                propertyTypes.includes(name)
                                    ? 'bg-[#f8efe9]'
                                    : ''
                            )}>
                                <Icon
                                    className={cn(
                                        "h-4 w-4 sm:h-5 sm:w-5",
                                        propertyTypes.includes(name)
                                            ? 'text-[#8B4513]'
                                            : 'text-black'
                                    )}
                                />
                            </div>
                            <span className={cn(
                                "",
                                propertyTypes.includes(name)
                                    ? 'text-[#8B4513]'
                                    : 'text-black'
                            )}>{name}</span>
                            {propertyTypes.includes(name) && <CheckIcon className={cn(
                                "ml-auto h-4 w-4 sm:h-5 sm:w-5",
                                propertyTypes.includes(name)
                                    ? 'text-[#8B4513]'
                                    : 'text-[#8B4513]'
                            )} />}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    function renderAmenitiesTab() {
        // Amenities tab implementation
        return (
            <div className="space-y-3 sm:space-y-4">
                <h3 className="font-medium text-sm sm:text-base md:text-lg mb-1 sm:mb-2">Amenities</h3>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {AMENITIES_CONFIG.map(({ name, icon: Icon }) => (
                        <button
                            key={name}
                            className={cn(
                                'flex items-center gap-1 sm:gap-2 rounded-full py-2 px-3 sm:py-3 sm:px-4 border text-xs sm:text-sm',
                                amenities.includes(name)
                                    ? 'bg-[#f8efe9] border-[#8B4513]'
                                    : 'bg-[#f0efe9]',
                            )}
                            onClick={() => toggleAmenity(name)}
                        >
                            <div className={cn(
                                'flex items-center justify-center',
                                amenities.includes(name)
                                    ? 'bg-[#f8efe9]'
                                    : ''
                            )}>
                                <Icon
                                    className={cn(
                                        "h-4 w-4 sm:h-5 sm:w-5",
                                        amenities.includes(name)
                                            ? 'text-[#8B4513]'
                                            : 'text-black'
                                    )}
                                />
                            </div>
                            <span className={cn(
                                "",
                                amenities.includes(name)
                                    ? 'text-[#8B4513]'
                                    : 'text-black'
                            )}>{name}</span>
                            {amenities.includes(name) && <CheckIcon className={cn(
                                "ml-auto h-4 w-4 sm:h-5 sm:w-5",
                                amenities.includes(name)
                                    ? 'text-[#8B4513]'
                                    : 'text-[#8B4513]'
                            )} />}
                        </button>
                    ))}
                </div>
                <button className="flex items-center gap-1 text-xs sm:text-sm mt-2 sm:mt-4">
                    Show more
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6 9L12 15L18 9"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>
        );
    }

    function renderBookTab() {
        // Book options tab implementation
        const options = [
            {
                label: 'Instant booking',
                icon: () => (
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5 12L10 17L19 8"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                ),
            },
            {
                label: 'Self check-in',
                icon: () => (
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="12"
                            cy="8"
                            r="4"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <path
                            d="M20 19C20 16.7909 16.4183 15 12 15C7.58172 15 4 16.7909 4 19"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                    </svg>
                ),
            }
        ];

        const handleOptionClick = (label: any) => {
            if (label === 'Instant booking') {
                setInstantBooking(true);
                setSelfCheckIn(false);
            } else {
                setInstantBooking(false);
                setSelfCheckIn(true);
            }
        };

        return (
            <div className="space-y-3 sm:space-y-4">
                <h3 className="font-medium text-sm sm:text-base md:text-lg mb-1 sm:mb-2">Book options</h3>
                <div className="flex items-center justify-center w-full gap-2 sm:gap-4">
                    {options.map(({ label, icon: Icon }) => (
                        <button
                            key={label}
                            onClick={() => handleOptionClick(label)} // Handle option click
                            className={cn(
                                "flex items-center justify-between rounded-full py-2 px-3 sm:py-3 sm:px-4 w-full border text-xs sm:text-sm",
                                (label === 'Instant booking' && instantBooking) || (label === 'Self check-in' && selfCheckIn)
                                    ? 'bg-[#f8efe9] border-[#8B4513]'
                                    : 'bg-[#f0efe9]'
                            )}
                        >
                            <div className="flex items-center gap-1 sm:gap-2">
                                <div className="h-4 w-4 sm:h-6 sm:w-6 rounded-full bg-white border flex items-center justify-center">
                                    <Icon />
                                </div>
                                <span>{label}</span>
                            </div>
                            <Switch
                                checked={label === 'Instant booking' ? instantBooking : selfCheckIn}
                                onCheckedChange={() => handleOptionClick(label)} // Toggle state on click
                                className="data-[state=checked]:bg-[#8B4513] scale-75 sm:scale-100"
                            />
                        </button>
                    ))}
                </div>
            </div>
        );
    }
}