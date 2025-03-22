"use client";

import { PropertyData } from "@heuvera/components/data/PropertyData";
import PropertyCard from "@heuvera/components/cards/PropertyCards/PropertyCard";
import Categories from "@heuvera/components/categories/Categories";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 h-full w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24">
      <Categories />
      <motion.div
        className="pt-5 md:pt-10 lg:pt-10 xl:pt-10 2xl:pt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-8 justify-center"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
          },
        }}
      >
        {PropertyData.map((property) => (
          <motion.div
            key={property.id}
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
    </div>
  );
}
