import { memo, useMemo } from "react";
import { X } from "lucide-react";
import PropertyCard from "../cards/PropertyCards/PropertyCard";
import { PropertyData } from "../data/PropertyData";
import { motion } from "framer-motion";

type ListingsSectionProps = {
  selectedCategory: {
    type: string;
    name: string;
  };
  handleCloseFiltered: () => void;
};

export const ListingsSection = memo(function ListingsSection({
  selectedCategory,
  handleCloseFiltered,
}: ListingsSectionProps) {
  const filteredProperties = useMemo(() => {
    if (selectedCategory.type === "property") {
      return PropertyData.filter(
        (property) =>
          property.propertyCategory === selectedCategory.name ||
          property.amenities?.includes(selectedCategory.name),
      );
    } else if (selectedCategory.type === "location") {
      return PropertyData.filter(
        (property) =>
          property.propertyDetails?.location === selectedCategory.name ||
          property.propertyDetails?.location.includes(selectedCategory.name),
      );
    }
    return PropertyData;
  }, [selectedCategory]);

  const headingText =
    selectedCategory.type === "property"
      ? selectedCategory.name
      : `Properties in ${selectedCategory.name}`;

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="w-full flex justify-between items-center mb-6">
        <motion.h1
          initial={{ x: -15, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-2xl font-semibold font-serif text-[#333333] dark:text-[#A7A7A7]"
        >
          {headingText}
        </motion.h1>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCloseFiltered}
          className="cursor-pointer"
        >
          <X size={24} className="text-[#333333] dark:text-[#A7A7A7]" />
        </motion.div>
      </div>

      <motion.div
        className="pt-5 md:pt-10 lg:pt-10 xl:pt-10 2xl:pt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-6 gap-y-8 justify-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {filteredProperties.map((property) => (
          <motion.div
            key={`property-${property.id}`}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full flex justify-center"
            layout
          >
            <PropertyCard property={property} />
          </motion.div>
        ))}
      </motion.div>

      {filteredProperties.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full text-center py-16"
        >
          <p className="text-lg text-gray-500">
            No properties found matching your criteria.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
});
