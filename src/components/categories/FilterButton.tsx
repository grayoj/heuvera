'use client';

import { useState } from 'react';
import { Button } from '@heuvera/components/ui/button';
import { Slider } from '../ui/slider';
import { Switch } from '../ui/switch';
import {
  LucideSlidersHorizontal,
  X,
  Bed,
  Home,
  Bath,
  Wifi,
  Utensils,
  Shield,
  Refrigerator,
  SlidersHorizontal,
  Video,
  WashingMachine,
  CheckIcon,
} from 'lucide-react';
import { cn } from '@heuvera/lib/utils';
import { FaBed } from 'react-icons/fa6';
import Currency from '../icons/svgs/currency';
import { IoBedOutline, IoCheckmark } from 'react-icons/io5';
import { GiCheckMark } from 'react-icons/gi';

type TabType = 'price' | 'rooms' | 'type' | 'amenities' | 'book';

export function FilterModal() {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('price');
  const [priceRange, setPriceRange] = useState<[number, number]>([
    45000, 105000,
  ]);
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
    <>
      <FilterButton onClick={() => setShowModal(true)} />

      {showModal && (
        <>
          {/* Modal Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setShowModal(false)}
          ></div>

          {/* Modal Content */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-4/6 max-w-xl bg-[#f8f7f2] rounded-lg shadow-lg z-50">
            <div className="flex items-center justify-between border-b p-6">
              <div className="flex items-center">
                <LucideSlidersHorizontal className="h-4 w-4 mr-2" />
                <h2 className="text-lg font-serif font-medium">Filters</h2>
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
              <div className="h-20 flex justify-between border-b px-6">
                <button
                  onClick={() => handleTabChange('price')}
                  className={cn(
                    'flex items-center justify-center gap-2 h-20 max-w-fit rounded-none',
                    activeTab === 'price' ? 'border-b-2 border-[#7B4F3A]' : '',
                  )}
                >
                  <Currency color={`${activeTab === 'price' ? '[#7B4F3A]' : '[#323223]'}`} />
                  <span className='text-sm'>Price</span>
                </button>
                <button
                  onClick={() => handleTabChange('rooms')}
                  className={cn(
                    'flex items-center justify-center gap-1 h-20 max-w-fit rounded-none',
                    activeTab === 'rooms' ? 'border-b-2 border-[#7B4F3A]' : '',
                  )}
                >
                  <IoBedOutline className="h-4 w-4" />
                  <span className="text-sm hidden sm:inline">Rooms & Beds</span>
                </button>
                <button
                  onClick={() => handleTabChange('type')}
                  className={cn(
                    'flex items-center justify-center gap-1 h-20 max-w-fit rounded-none',
                    activeTab === 'type' ? 'border-b-2 border-[#7B4F3A]' : '',
                  )}
                >
                  <Home className="h-4 w-4" />
                  <span className='text-sm'>Type</span>
                </button>
                <button
                  onClick={() => handleTabChange('amenities')}
                  className={cn(
                    'flex items-center justify-center gap-1 h-20 max-w-fit rounded-none',
                    activeTab === 'amenities'
                      ? 'border-b-2 border-[#7B4F3A]'
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
                    activeTab === 'book' ? 'border-b-2 border-[#7B4F3A]' : '',
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
              <div className='w-full h-96 flex flex-col justify-between'>
                <div className="p-4">
                  {activeTab === 'price' && (
                    <div className="space-y-8">
                      <h3 className="font-medium font-serif mb-4">Price range</h3>
                      <div className="space-y-8">
                        <div className="flex gap-4 items-center">
                          <div className="w-1/2 rounded-full bg-[#E3E2D9] p-0.5">
                            <div className='w-full rounded-full bg-[#f8f7f2] p-2 flex items-center justify-center gap-2 font-serif'>
                              <Currency color='[#323223]' />
                              <span>Max: <span className='font-semibold font-serif'>₦{priceRange[0].toLocaleString()}</span></span>
                            </div>
                          </div>
                          <div className='border-b border-b-[#B4B4B4] w-6' />
                          <div className="w-1/2 rounded-full bg-[#E3E2D9] p-0.5">
                            <div className='w-full rounded-full bg-[#f8f7f2] p-2 flex items-center justify-center gap-2 font-serif'>
                              <Currency color='[#323223]' />
                              <span>Max: <span className='font-semibold font-serif'>₦{priceRange[1].toLocaleString()}</span></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'rooms' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-4">Bedrooms</h3>
                        <div className="flex gap-2 flex-wrap bg-[#E3E2D9] rounded-full min-w-fit max-w-fit p-1">
                          {['Any', '1', '2', '3', '4', '5', '5+'].map((num) => (
                            <button
                              key={`bedroom-${num}`}
                              className={cn(
                                'rounded-full py-2 px-4 border',
                                bedrooms === num
                                  ? 'bg-[#F3F2EC] shadow shadow-lg'
                                  : 'bg-[#E3E2D9]',
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
                            <CheckIcon className="ml-auto" />
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
                          <WashingMachine className="h-5 w-5" />
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
                          <Video className="h-5 w-5" />
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
          </div>
        </>
      )}
    </>
  );
}

// FilterButton component remains the same
export function FilterButton({ onClick }: { onClick?: () => void }) {
  return (
    <Button
      variant="outline"
      className="bg-transparent border border-[#E3E2D9] shadow-none text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-base font-serif h-10 px-4"
      size="default"
      onClick={onClick}
    >
      <LucideSlidersHorizontal className="text-base md:text-xl lg:text-xl xl:text-xl 2xl:text-xl mr-2" />
      Filter
    </Button>
  );
}

export default FilterModal;
