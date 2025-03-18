"use client";

import NavigationLayout from "@heuvera/app/components/navigation/navigationbar";
import { LucideCalendar } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { BsArrowLeft } from "react-icons/bs";
import { FaArrowLeft, FaArrowLeftLong, FaBath } from "react-icons/fa6";
import { IoBed, IoCalendarOutline, IoPerson, IoShareSocialOutline } from "react-icons/io5";

export default function PropertyDetailsPage() {
    const params = useParams();
    const propertyId = params.id; // Dynamic ID from the URL

    return (
        <NavigationLayout>
            <div className="w-full flex flex-col pb-10 gap-6">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-5 items-center">
                        <BsArrowLeft className="text-[#898989] text-xl" />
                        <h1 className="text-base font-serif text-[#898989]">Island</h1>
                    </div>
                    <div className="flex flex-row gap-5 items-center">
                        <h1 className="text-base font-serif text-[#898989]">Share</h1>
                        <IoShareSocialOutline className="text-[#898989] text-xl" />
                    </div>
                </div>
                {/*  */}
                <div className="flex flex-row justify-between gap-10 h-full">
                    <div className="flex flex-col w-7/12 gap-6">
                        <div className="w-full h-[40rem] bg-blue-400 rounded-[3rem]">
                            <Image src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" height={500} width={500} className="w-full h-full rounded-[3rem] object-cover" />
                        </div>
                        <div className="flex flex-row gap-6">
                            <div className="w-6/12 bg-red-300 h-60 rounded-[3rem]">
                                <Image src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" height={500} width={500} className="w-full h-full rounded-[3rem] object-cover" />
                            </div>
                            <div className="w-6/12 bg-red-100 h-60 rounded-[3rem]">
                                <Image src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" height={500} width={500} className="w-full h-full rounded-[3rem] object-cover" />
                            </div>
                        </div>
                        <div className="w-full h-[40rem] bg-blue-400 rounded-[3rem]">
                            <Image src="https://images.unsplash.com/photo-1592595896551-12b371d546d5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" height={500} width={500} className="w-full h-full rounded-[3rem] object-cover" />
                        </div>
                    </div>
                    <div className="flex flex-col w-5/12">
                        <div className="w-full flex flex-col gap-5">
                            <h1 className="text-3xl font-serif font-semibold text-[#3E3E3E]">Luxury Apartment in Maitama</h1>
                            <h1 className="text-xl font-serif font-normal text-[#3E3E3E]">Federal Capital Territory, Abuja</h1>
                            <h1 className="text-2xl text-[#3F3B2B] font-semibold font-serif">
                                ₦50,000
                                <span className="text-sm text-[#3E3E3E] font-serif font-normal"> /night</span>
                            </h1>
                            <div className="flex flex-row gap-5">
                                <div className="gap-1 flex items-center">
                                    <IoBed className="text-[#3E3E3E] text-xl" />
                                    <h1 className="text-[#3E3E3E] text-base font-serif">3 Bedrooms</h1>
                                </div>
                                <div className="gap-1 flex items-center">
                                    <FaBath className="text-[#8983E3E3E989] text-base" />
                                    <h1 className="text-[#3E3E3E] text-base font-serif">5 Bathrooms</h1>
                                </div>
                                <div className="gap-1 flex items-center">
                                    <IoPerson className="text-[#3E3E3E] text-base" />
                                    <h1 className="text-[#3E3E3E] text-base font-serif">4 Guests</h1>
                                </div>
                            </div>
                            <div className="border border-b border-[#E3E2D9] w-full" />
                            <div className="flex flex-col">
                                <h1 className="text-2xl font-serif font-medium text-[#3E3E3E] pb-5">Description</h1>
                                <h1 className="text-base font-serif font-normal text-[#3E3E3E]">Luxury living in the Heart of Abuja Discover
                                    unparalleled elegance and sophistication at our luxury apartment
                                    in the heart of Abuja. Nestled in the prime location, this exclusive
                                    residence redefines modern living, offering a harmonious blend of
                                    opulence and comfort.
                                    Situated in one of Abuja’s most prestigious neighborhoods, our
                                    luxury apartments provide easy access to top-tier shopping malls,
                                    fine dining restaurants, business districts, and recreational centers.
                                    Whether you seek the vibrance of city life or the tranquility of a
                                    serene retreat, this is the perfect place to call home...</h1>
                                <h1 className="text-base font-serif font-normal text-[#3E3E3E] underline">Show More</h1>
                            </div>
                            <div className="border border-b border-[#E3E2D9] w-full" />
                            <h1 className="text-2xl font-serif font-medium text-[#3E3E3E]">Create Booking</h1>
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-3">
                                    <h1 className="text-xl font-serif font-medium text-[#3E3E3E]">Check Availability</h1>
                                    <div className="h-14 w-80 border border-[#3E3E3E] rounded-full flex items-center justify-between relative px-6">
                                        <h1 className="text-[#3E3E3E] text-base font-serif">Mar 14 - Mar 21</h1>

                                        {/* Positioned at the end */}
                                        <div className="rounded-full size-20 bg-[#7B4F3A] absolute right-0 flex items-center justify-center">
                                            <IoCalendarOutline className="text-3xl text-white" />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </NavigationLayout>
    );
}
