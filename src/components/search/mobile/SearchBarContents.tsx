import { FilterType, RenderMobileSearchBarProps } from "@heuvera/utils/props";
import { motion, AnimatePresence } from "framer-motion";
import { LucideMapPin, LucideCalendar, LucideUsers, LucideSearch, LucideX, LucideTrash } from "lucide-react";  // Assuming these are the correct import paths
import { useRef, useState } from "react";


const RenderMobileSearchBar: React.FC<RenderMobileSearchBarProps> = ({ closeSearchModal, toggleFilter, activeFilter, clearAll }) => {

    const inputRef = useRef(null);

    const filters = [
        {
            id: "location" as FilterType,
            label: "Where",
            icon: <LucideMapPin className="text-black dark:text-[#A7A7A7]" size={16} />,
        },
        {
            id: "dates" as FilterType,
            label: "When",
            icon: <LucideCalendar className="text-black dark:text-[#A7A7A7]" size={16} />,
        },
        {
            id: "guests" as FilterType,
            label: "Who",
            icon: <LucideUsers className="text-black dark:text-[#A7A7A7]" size={16} />,
        },
    ];

    return (
        <motion.div
            className="fixed inset-0 z-[2000] bg-[#E3E2D9] dark:bg-[#555555] flex flex-col px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className="flex items-center justify-between p-4 px-2"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
            >
                <button
                    onClick={closeSearchModal}
                    className="p-2 rounded-full hover:bg-[#F8F7F2] dark:bg-[#333333]"
                >
                    <LucideX className="text-[#323232] dark:text-white" />
                </button>
                <span className="font-serif font-medium text-[#323232] dark:text-[#F8F7F2]">
                    Search
                </span>
                <div className="w-8 h-8"></div>
            </motion.div>

            <motion.div
                className="w-full flex items-center justify-center"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
            >
                <div className="px-2 pt-2 flex gap-2 overflow-x-auto no-scrollbar rounded-t-xl bg-[#F8F7F2] dark:bg-[#333333]">
                    {filters.map((filter) => (
                        <motion.button
                            key={filter.id}
                            onClick={() => toggleFilter(filter.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${activeFilter === filter.id
                                ? "border-[#7B4F3A] dark:border-[#8B5F4D] bg-[#F8F7F2] dark:bg-[#333333] text-[#7B4F3A] dark:text-[#8B5F4D]"
                                : "border-[#E3E2D9] dark:border-[#555555] text-[#323232]"
                                }`}
                            whileTap={{ scale: 0.95 }}
                        >
                            {filter.icon}
                            <span className="font-serif text-black dark:text-[#A7A7A7]">
                                {filter.label}
                            </span>
                        </motion.button>
                    ))}
                </div>
            </motion.div>

            <motion.div
                className="py-4 px-2 shadow-md bg-[#F8F7F2] dark:bg-[#333333] rounded-xl flex-1 overflow-hidden flex flex-col mb-10"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
            >
                <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <LucideSearch className="text-[#7B4F3A] dark:text-[#8B5F4D]" />
                    </div>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Where are you going?"
                        className="w-full pl-12 pr-4 py-3 bg-[#F8F7F2] dark:bg-[#333333] border border-[#C4C3B8] dark:border-[#666666] rounded-full outline-none text-[#323232] dark:text-[#A7A7A7] font-serif"
                        autoFocus
                    />
                </div>

                <div className="flex-1 py-4 px-2 overflow-y-auto">
                    <AnimatePresence mode="wait">
                        {activeFilter === "location" && (
                            <motion.div
                                className="space-y-4"
                                key="location"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h3 className="font-serif font-medium text-lg text-[#323232] dark:text-[#A7A7A7]">
                                    Popular destinations
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {[
                                        "Malibu, California",
                                        "Miami, Florida",
                                        "Aspen, Colorado",
                                        "New York, New York",
                                        "Las Vegas, Nevada",
                                    ].map((location, idx) => (
                                        <motion.div
                                            key={location}
                                            className="flex items-center gap-3 p-4 bg-white dark:bg-[#555555] shadow-sm rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: idx * 0.07 }}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <LucideMapPin className="text-[#7B4F3A] dark:text-[#8B5F4D]" />
                                            <span className="font-serif">{location}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                        {activeFilter === "dates" && (
                            <motion.div
                                className="space-y-4"
                                key="dates"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h3 className="font-serif font-medium text-lg text-[#323232] dark:text-[#A7A7A7]">
                                    When will you be there?
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <motion.div
                                        className="p-4 border border-[#E3E2D9] dark:border-[#555555] rounded-lg bg-white dark:bg-[#555555] shadow-sm hover:shadow-md transition-shadow"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <p className="text-sm mb-2 text-[#7B4F3A] dark:text-[#8B5F4D] font-medium">
                                            Check in
                                        </p>
                                        <p className="font-serif">Add date</p>
                                    </motion.div>
                                    <motion.div
                                        className="p-4 border border-[#E3E2D9] dark:border-[#555555] rounded-lg bg-white dark:bg-[#555555] shadow-sm hover:shadow-md transition-shadow"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: 0.2 }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <p className="text-sm text-[#7B4F3A] dark:text-[#8B5F4D] font-medium">
                                            Check out
                                        </p>
                                        <p className="font-serif">Add date</p>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}
                        {activeFilter === "guests" && (
                            <motion.div
                                className="space-y-4"
                                key="guests"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h3 className="font-serif font-medium text-lg text-[#323232] dark:text-[#A7A7A7]">
                                    Who's coming?
                                </h3>
                                <div className="space-y-3">
                                    {["Adults", "Children", "Infants", "Pets"].map(
                                        (guestType, idx) => (
                                            <motion.div
                                                key={guestType}
                                                className="flex items-center justify-between py-4 px-4 border-b border-[#E3E2D9] dark:border-[#555555] bg-white dark:bg-[#555555] rounded-lg shadow-sm"
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3, delay: idx * 0.07 }}
                                            >
                                                <div>
                                                    <p className="font-serif">{guestType}</p>
                                                    {guestType === "Adults" && (
                                                        <p className="text-sm text-[#7B4F3A] dark:text-[#8B5F4D]">
                                                            Ages 13+
                                                        </p>
                                                    )}
                                                    {guestType === "Children" && (
                                                        <p className="text-sm text-[#7B4F3A] dark:text-[#8B5F4D]">
                                                            Ages 2-12
                                                        </p>
                                                    )}
                                                    {guestType === "Infants" && (
                                                        <p className="text-sm text-[#7B4F3A] dark:text-[#8B5F4D]">
                                                            Under 2
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <motion.button
                                                        className="w-8 h-8 rounded-full border border-[#C4C3B8] dark:border-[#444444] items-center justify-center text-[#323232] bg-white dark:bg-[#555555]"
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                    >
                                                        -
                                                    </motion.button>
                                                    <span className="w-5 text-center">0</span>
                                                    <motion.button
                                                        className="w-8 h-8 rounded-full border border-[#C4C3B8] dark:border-[#444444] flex items-center justify-center text-[#323232] bg-white dark:bg-[#555555]"
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                    >
                                                        +
                                                    </motion.button>
                                                </div>
                                            </motion.div>
                                        ),
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {!activeFilter && (
                            <motion.div
                                className="space-y-4"
                                key="recent"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h3 className="font-serif font-medium text-lg text-[#323232]">
                                    Recent searches
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {[
                                        "Malibu Beach House - 2 nights",
                                        "Downtown Loft - 3 nights",
                                        "Mountain Cabin - Weekend",
                                    ].map((search, idx) => (
                                        <motion.div
                                            key={search}
                                            className="flex items-center gap-3 p-4 bg-white dark:bg-[#555555] shadow-sm rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: idx * 0.07 }}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <LucideSearch className="text-[#7B4F3A] dark:text-[#8B5F4D]" />
                                            <span className="font-serif">{search}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <motion.div
                    className="py-2 px-2 sticky bottom-0 w-full"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                >
                    <div className="flex gap-3">
                        <button
                            onClick={clearAll}
                            className="flex-1 bg-transparent text-[#7B4F3A] dark:text-[#8B5F4D] border border-[#7B4F3A] dark:border-[#8B5F4D] font-serif font-medium py-3 rounded-lg flex items-center justify-center gap-2"
                        >
                            <LucideTrash size={18} />
                            <span>Clear All</span>
                        </button>
                        <button className="flex-1 bg-[#7B4F3A] dark:bg-[#8B5F4D] text-white font-serif font-medium py-3 rounded-lg flex items-center justify-center gap-2">
                            <LucideSearch size={18} />
                            <span>Search</span>
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default RenderMobileSearchBar;
