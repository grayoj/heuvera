import React from "react";
import { LucideMapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Calendar } from "../../ui/calendar";
import { FilterContentProps } from "@heuvera/utils/props";

const FilterContent: React.FC<FilterContentProps> = ({
  type,
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
}) => {
  if (type === "location") {
    return (
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <h3 className="font-serif font-medium text-lg text-[#323232] dark:text-[#F8F7F2]">
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
    );
  }

  if (type === "dates") {
    return (
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <h3 className="font-serif font-medium text-lg text-[#323232] dark:text-[#F8F7F2]">
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
            <Calendar
              mode="single"
              selected={checkInDate}
              onSelect={setCheckInDate}
              numberOfMonths={1}
              className="bg-transparent scale-110 origin-center"
              styles={{
                day: { width: "40px", height: "40px" },
                month: { width: "100%" },
                caption_label: { fontSize: "1rem" },
                head_cell: { fontSize: "0.9rem", width: "40px" },
              }}
            />
          </motion.div>
          <motion.div
            className="p-4 border border-[#E3E2D9] dark:border-[#555555] rounded-lg bg-white dark:bg-[#555555] shadow-sm hover:shadow-md transition-shadow"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <p className="text-sm mb-2 text-[#7B4F3A] dark:text-[#8B5F4D] font-medium">
              Check out
            </p>
            <Calendar
              mode="single"
              selected={checkOutDate}
              onSelect={setCheckOutDate}
              numberOfMonths={1}
              className="bg-transparent scale-110 origin-center"
              styles={{
                day: { width: "40px", height: "40px" },
                month: { width: "100%" },
                caption_label: { fontSize: "1rem" },
                head_cell: { fontSize: "0.9rem", width: "40px" },
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    );
  }

  if (type === "guests") {
    return (
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <h3 className="font-serif font-medium text-lg text-[#323232] dark:text-[#F8F7F2]">
          Who will be there?
        </h3>
        <div className="space-y-3">
          {["Adults", "Children", "Infants", "Pets"].map((guestType, idx) => (
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
                  className="w-8 h-8 rounded-full border border-[#C4C3B8] dark:border-[#777777] flex items-center justify-center text-[#323232] dark:text-[#F8F7F2] bg-white dark:bg-[#555555]"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  -
                </motion.button>
                <span className="w-5 text-center">0</span>
                <motion.button
                  className="w-8 h-8 rounded-full border border-[#C4C3B8] dark:border-[#777777] flex items-center justify-center text-[#323232] dark:text-[#F8F7F2] bg-white dark:bg-[#555555]"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  +
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  return null;
};

export default FilterContent;
