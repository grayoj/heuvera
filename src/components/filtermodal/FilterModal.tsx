'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { Switch } from '../ui/switch';
import {
  X,
  SlidersHorizontal,
  Bed,
  Home,
  Bath,
  Wifi,
  Utensils,
  Shield,
  Refrigerator,
} from 'lucide-react';
import { cn } from '@heuvera/lib/utils';

type TabType = 'price' | 'rooms' | 'type' | 'amenities' | 'book';

export default function FilterModal() {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('price');
  const [priceRange, setPriceRange] = useState([45000, 105000]);
  const [bedrooms, setBedrooms] = useState<string | null>(null);
  const [beds, setBeds] = useState<string | null>(null);
  const [bathrooms, setBathrooms] = useState<string | null>(null);
  const [amenities, setAmenities] = useState<string[]>([
    'Wifi',
    'Kitchen',
    'Washer',
  ]);
  const [instantBooking, setInstantBooking] = useState(true);
  const [selfCheckIn, setSelfCheckIn] = useState(false);

  const handleTabChange = (value: TabType) => {
    setActiveTab(value);
  };

  const handleReset = () => {
    setPriceRange([45000, 105000]);
    setBedrooms(null);
    setBeds(null);
    setBathrooms(null);
    setAmenities(['Wifi', 'Kitchen', 'Washer']);
    setInstantBooking(true);
    setSelfCheckIn(false);
  };

  const toggleAmenity = (amenity: string) => {
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter((a) => a !== amenity));
    } else {
      setAmenities([...amenities, amenity]);
    }
  };

  const handleNumberSelect = (
    type: 'bedrooms' | 'beds' | 'bathrooms',
    value: string,
  ) => {
    switch (type) {
      case 'bedrooms':
        setBedrooms(value === bedrooms ? null : value);
        break;
      case 'beds':
        setBeds(value === beds ? null : value);
        break;
      case 'bathrooms':
        setBathrooms(value === bathrooms ? null : value);
        break;
    }
  };

  return (
    <div>
      <Button
        variant="outline"
        className="w-full"
        onClick={() => setShowModal(true)}
      >
        Open Filters
      </Button>

      {showModal && (
        <>
          {/* Modal Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setShowModal(false)}
          ></div>

          {/* Modal Content */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#f8f7f2] rounded-lg shadow-lg z-50">
            <div className="flex items-center justify-between border-b p-4">
              <div className="flex items-center">
                <SlidersHorizontal className="h-5 w-5 mr-2" />
                <h2 className="text-lg font-semibold">Filters</h2>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-full h-8 w-8 flex items-center justify-center hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Tabs */}
            <div className="w-full">
              <div className="grid grid-cols-5 border-b">
                <button
                  onClick={() => handleTabChange('price')}
                  className={cn(
                    'flex items-center justify-center gap-1 py-4 rounded-none',
                    activeTab === 'price' ? 'border-b-2 border-[#8B4513]' : '',
                  )}
                >
                  <span className="bg-[#8B4513] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    ₹
                  </span>
                  <span>Price</span>
                </button>
                <button
                  onClick={() => handleTabChange('rooms')}
                  className={cn(
                    'flex items-center justify-center gap-1 py-4 rounded-none',
                    activeTab === 'rooms' ? 'border-b-2 border-[#8B4513]' : '',
                  )}
                >
                  <Bed className="h-4 w-4" />
                  <span className="hidden sm:inline">Rooms</span>
                </button>
                <button
                  onClick={() => handleTabChange('type')}
                  className={cn(
                    'flex items-center justify-center gap-1 py-4 rounded-none',
                    activeTab === 'type' ? 'border-b-2 border-[#8B4513]' : '',
                  )}
                >
                  <Home className="h-4 w-4" />
                  <span>Type</span>
                </button>
                <button
                  onClick={() => handleTabChange('amenities')}
                  className={cn(
                    'flex items-center justify-center gap-1 py-4 rounded-none',
                    activeTab === 'amenities'
                      ? 'border-b-2 border-[#8B4513]'
                      : '',
                  )}
                >
                  <Bath className="h-4 w-4" />
                  <span>Amenities</span>
                </button>
                <button
                  onClick={() => handleTabChange('book')}
                  className={cn(
                    'flex items-center justify-center gap-1 py-4 rounded-none',
                    activeTab === 'book' ? 'border-b-2 border-[#8B4513]' : '',
                  )}
                >
                  <span className="border rounded p-0.5">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="3"
                        y="6"
                        width="18"
                        height="15"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M3 10H21"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M8 3V7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M16 3V7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <span>Book</span>
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-4">
                {activeTab === 'price' && (
                  <div className="space-y-6">
                    <h3 className="font-medium mb-4">Price range</h3>
                    <div className="space-y-6">
                      <Slider
                        defaultValue={[45000, 105000]}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        min={0}
                        max={200000}
                        step={1000}
                        className="my-6"
                      />
                      <div className="flex gap-4">
                        <div className="flex-1 rounded-full bg-white border p-2 px-4 flex items-center">
                          <span className="bg-[#8B4513] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2">
                            ₹
                          </span>
                          <span>Min: ₹{priceRange[0].toLocaleString()}</span>
                        </div>
                        <div className="flex-1 rounded-full bg-white border p-2 px-4 flex items-center">
                          <span className="bg-[#8B4513] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2">
                            ₹
                          </span>
                          <span>Max: ₹{priceRange[1].toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'rooms' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-4">Bedrooms</h3>
                      <div className="flex gap-2 flex-wrap">
                        {['Any', '1', '2', '3', '4', '5', '5+'].map((num) => (
                          <button
                            key={`bedroom-${num}`}
                            className={cn(
                              'rounded-full py-2 px-4 border',
                              bedrooms === num
                                ? 'bg-white ring-1 ring-[#8B4513]'
                                : 'bg-[#f0efe9]',
                            )}
                            onClick={() => handleNumberSelect('bedrooms', num)}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-4">Bed</h3>
                      <div className="flex gap-2 flex-wrap">
                        {['Any', '1', '2', '3', '4', '5', '5+', '6'].map(
                          (num) => (
                            <button
                              key={`bed-${num}`}
                              className={cn(
                                'rounded-full py-2 px-4 border',
                                beds === num
                                  ? 'bg-white ring-1 ring-[#8B4513]'
                                  : 'bg-[#f0efe9]',
                              )}
                              onClick={() => handleNumberSelect('beds', num)}
                            >
                              {num}
                            </button>
                          ),
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-4">Bathrooms</h3>
                      <div className="flex gap-2 flex-wrap">
                        {['Any', '1', '2', '3', '4', '5', '5+'].map((num) => (
                          <button
                            key={`bathroom-${num}`}
                            className={cn(
                              'rounded-full py-2 px-4 border',
                              bathrooms === num
                                ? 'bg-white ring-1 ring-[#8B4513]'
                                : 'bg-[#f0efe9]',
                            )}
                            onClick={() => handleNumberSelect('bathrooms', num)}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'type' && (
                  <div className="min-h-[200px] flex items-center justify-center text-muted-foreground">
                    Type filters would go here
                  </div>
                )}

                {activeTab === 'amenities' && (
                  <div className="space-y-4">
                    <h3 className="font-medium mb-2">Amenities</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        className={cn(
                          'flex items-center gap-2 rounded-full py-3 px-4 border',
                          amenities.includes('Wifi')
                            ? 'bg-[#f8efe9] border-[#8B4513]'
                            : 'bg-[#f0efe9]',
                        )}
                        onClick={() => toggleAmenity('Wifi')}
                      >
                        <Wifi className="h-5 w-5" />
                        <span>Wifi</span>
                        {amenities.includes('Wifi') && (
                          <span className="ml-auto">✓</span>
                        )}
                      </button>

                      <button
                        className={cn(
                          'flex items-center gap-2 rounded-full py-3 px-4 border',
                          amenities.includes('Washer')
                            ? 'bg-[#f8efe9] border-[#8B4513]'
                            : 'bg-[#f0efe9]',
                        )}
                        onClick={() => toggleAmenity('Washer')}
                      >
                        <Bath className="h-5 w-5" />
                        <span>Washer</span>
                        {amenities.includes('Washer') && (
                          <span className="ml-auto">✓</span>
                        )}
                      </button>

                      <button
                        className={cn(
                          'flex items-center gap-2 rounded-full py-3 px-4 border',
                          amenities.includes('Kitchen')
                            ? 'bg-[#f8efe9] border-[#8B4513]'
                            : 'bg-[#f0efe9]',
                        )}
                        onClick={() => toggleAmenity('Kitchen')}
                      >
                        <Utensils className="h-5 w-5" />
                        <span>Kitchen</span>
                        {amenities.includes('Kitchen') && (
                          <span className="ml-auto">✓</span>
                        )}
                      </button>

                      <button
                        className={cn(
                          'flex items-center gap-2 rounded-full py-3 px-4 border',
                          amenities.includes('Security cameras')
                            ? 'bg-[#f8efe9] border-[#8B4513]'
                            : 'bg-[#f0efe9]',
                        )}
                        onClick={() => toggleAmenity('Security cameras')}
                      >
                        <Shield className="h-5 w-5" />
                        <span>Security cameras</span>
                        {amenities.includes('Security cameras') && (
                          <span className="ml-auto">✓</span>
                        )}
                      </button>

                      <button
                        className={cn(
                          'flex items-center gap-2 rounded-full py-3 px-4 border',
                          amenities.includes('Refrigerator')
                            ? 'bg-[#f8efe9] border-[#8B4513]'
                            : 'bg-[#f0efe9]',
                        )}
                        onClick={() => toggleAmenity('Refrigerator')}
                      >
                        <Refrigerator className="h-5 w-5" />
                        <span>Refrigerator</span>
                        {amenities.includes('Refrigerator') && (
                          <span className="ml-auto">✓</span>
                        )}
                      </button>
                    </div>

                    <button className="flex items-center gap-1 text-sm mt-4">
                      Show more
                      <svg
                        width="16"
                        height="16"
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
                )}

                {activeTab === 'book' && (
                  <div className="space-y-4">
                    <h3 className="font-medium mb-2">Book options</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between rounded-full py-3 px-4 border bg-[#f8efe9] border-[#8B4513]">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-white border flex items-center justify-center">
                            <svg
                              width="16"
                              height="16"
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
                          </div>
                          <span>Instant booking</span>
                        </div>
                        <Switch
                          checked={instantBooking}
                          onCheckedChange={setInstantBooking}
                          className="data-[state=checked]:bg-[#8B4513]"
                        />
                      </div>

                      <div className="flex items-center justify-between rounded-full py-3 px-4 border bg-[#f0efe9]">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-white border flex items-center justify-center">
                            <svg
                              width="16"
                              height="16"
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
                          </div>
                          <span>Self check-in</span>
                        </div>
                        <Switch
                          checked={selfCheckIn}
                          onCheckedChange={setSelfCheckIn}
                          className="data-[state=checked]:bg-[#8B4513]"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between p-4 border-t">
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="rounded-full bg-[#f0efe9] hover:bg-[#e8e7e1]"
                >
                  Reset
                </Button>
                <Button className="rounded-full bg-[#8B4513] hover:bg-[#7a3b10] text-white">
                  Find 33 results
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
