import { X } from "lucide-react";
import PropertyCard from "../cards/PropertyCards/PropertyCard";
import { PropertyData } from "../data/PropertyData";
import { motion } from "framer-motion";

export function ListingsSection({
  selectedCategory,
  handleCloseFiltered,
}: {
  selectedCategory: { type: string; name: string };
  handleCloseFiltered: () => void;
}) {
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full flex justify-between items-center mb-6">
        <motion.h1
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-2xl font-semibold font-serif text-[#323232] dark:text-[#A7A7A7]"
        >
          {selectedCategory.type === "property"
            ? selectedCategory.name
            : `Properties in ${selectedCategory.name}`}
        </motion.h1>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleCloseFiltered}
          className="cursor-pointer"
        >
          <X size={24} className="text-[#323232] dark:text-[#A7A7A7]" />
        </motion.div>
      </div>

      <motion.div
        className="pt-5 md:pt-10 lg:pt-10 xl:pt-10 2xl:pt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-6 gap-y-8 justify-center"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
        }}
      >
        {PropertyData.map((property) => (
          <motion.div
            key={`property-${property.id}`}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full flex justify-center"
          >
            <PropertyCard property={property} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
