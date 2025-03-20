"use client";

import { PropertyData } from "@heuvera/components/data/PropertyData";
import PropertyCard from "@heuvera/components/cards/PropertyCards/PropertyCard";
import Categories from "@heuvera/components/categories/Categories";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <div className="flex flex-col flex-1 h-full w-full">
        <Categories />
        <motion.div
          className="pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-10 gap-y-10 justify-items-stretch"
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
              transition={{ duration: 0.6, ease: "easeOut" }}>
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
}
