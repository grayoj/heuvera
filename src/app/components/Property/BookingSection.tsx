import { useState } from "react";
import { Button } from "@heuvera/components/ui/button";
import { IoCalendarOutline, IoChevronDown, IoChevronUp } from "react-icons/io5";
import Divider from "../Divider";

export default function BookingSection() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedGuests, setSelectedGuests] = useState("1 Guest");
    const guestOptions = ["1 Guest", "2 Guests", "3 Guests", "4+ Guests"];

    return (
        <>
            <Divider />
            <h1 className="text-2xl font-serif font-medium text-[#3E3E3E]">Create Booking</h1>
            <div className="flex flex-col gap-8">
                <div className="w-full gap-8 flex flex-row justify-between">
                    <div className="flex flex-col gap-4 w-6/12">
                        <h1 className="text-base font-normal text-[#3E3E3E]">Check Availability</h1>
                        <div className="h-14 w-full border border-[#3E3E3E] rounded-full flex items-center justify-between relative px-6">
                            <h1 className="text-[#3E3E3E] text-base font-serif">Mar 14 - Mar 21</h1>
                            <div className="rounded-full size-10 bg-[#7B4F3A] absolute right-2 flex items-center justify-center">
                                <IoCalendarOutline className="text-xl text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 relative w-6/12">
                        <h1 className="text-base font-serif font-normal text-[#3E3E3E]">Guests:</h1>

                        <div
                            className="h-14 w-full border border-[#3E3E3E] rounded-full flex items-center justify-between px-6 cursor-pointer relative"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <h1 className="text-[#3E3E3E] text-base font-serif">{selectedGuests}</h1>

                            <div className="text-[#3E3E3E]">
                                {isOpen ? <IoChevronUp className="text-2xl" /> : <IoChevronDown className="text-2xl" />}
                            </div>
                        </div>

                        {isOpen && (
                            <div className="absolute top-[100px] w-80 bg-white border border-[#3E3E3E] rounded-xl shadow-lg z-10">
                                {guestOptions.map((option, index) => (
                                    <div
                                        key={index}
                                        className="px-6 py-3 text-[#3E3E3E] hover:bg-[#7B4F3A] hover:text-white cursor-pointer transition-colors"
                                        onClick={() => {
                                            setSelectedGuests(option);
                                            setIsOpen(false);
                                        }}
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <Button className="h-14 w-full bg-[#7B4F3A] rounded-full font-serif font-semibold">Book Now</Button>
            </div>
        </>
    );
}