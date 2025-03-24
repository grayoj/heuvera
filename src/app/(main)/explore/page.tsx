'use client';

import PropertyCard from '@heuvera/components/cards/PropertyCards/PropertyCard';
import Categories from '@heuvera/components/categories/Categories';
import { PropertyData } from '@heuvera/components/data/PropertyData';
import SearchBar from '@heuvera/components/search/SearchBar';
import useIsMobile from '@heuvera/hooks/IsMobile';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Explore() {
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col flex-1 h-full w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24">
      <div className="w-full gap-5 flex flex-col items-center justify-center">
        <div className='w-full flex items-center justify-between'>
          <SearchBar isMobile={isMobile} />
        </div>
        <Categories />
      </div>
      <motion.div
        className="pt-5 md:pt-10 lg:pt-10 xl:pt-10 2xl:pt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-8 justify-center"
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
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="w-full flex justify-center">
                <div className="h-96 w-full md:size-60 lg:h-52 lg:w-56 xl:w-80 xl:h-70 2xl:size-80 rounded-2xl bg-gray-200 animate-pulse">
                  <div></div>
                </div>
              </div>
            ))
          : PropertyData.map((property) => (
              <motion.div
                key={property.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="w-full flex justify-center"
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
      </motion.div>
    </div>
  );
}
