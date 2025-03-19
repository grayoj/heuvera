"use client";

import { PropertyData } from "@heuvera/app/components/Arrays/PropertyData";
import PropertyCard from "@heuvera/app/components/cards/PropertyCards/PropertyCard";
import Categories from "@heuvera/app/components/Categories/Categories";
import MarketplaceLayout from "../page";
import { motion } from "framer-motion";

export default function Explore() {
    return (
        <>
            <MarketplaceLayout>
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
                                transition: { staggerChildren: 0.15 }, // Stagger delay between items
                            },
                        }}
                    >
                        {PropertyData.map((property) => (
                            <motion.div
                                key={property.id}
                                variants={{
                                    hidden: { opacity: 0, y: 30 }, // Start hidden and slightly lower
                                    visible: { opacity: 1, y: 0 }, // Fade in and move up
                                }}
                                transition={{ duration: 0.6, ease: "easeOut" }} // Smooth transition
                            >
                                <PropertyCard property={property} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </MarketplaceLayout>
        </>
    );
}
