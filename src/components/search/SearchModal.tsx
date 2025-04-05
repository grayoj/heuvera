import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LucideX,
  LucideSearch,
  LucideMapPin,
  LucideCalendar,
  LucideUsers,
} from "lucide-react";
import { SearchModalProps } from "@heuvera/utils/props";

const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  closeModal,
  activeFilter,
  toggleFilter,
  inputRef,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
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
            onClick={closeModal}
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
            {[
              {
                id: "location",
                label: "Where",
                icon: <LucideMapPin size={16} />,
              },
              {
                id: "dates",
                label: "When",
                icon: <LucideCalendar size={16} />,
              },
              { id: "guests", label: "Who", icon: <LucideUsers size={16} /> },
            ].map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => toggleFilter(filter.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  activeFilter === filter.id
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

        <motion.div className="py-4 px-2 shadow-md bg-[#F8F7F2] dark:bg-[#333333] rounded-xl flex-1 overflow-hidden flex flex-col mb-10">
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
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchModal;
