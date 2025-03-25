'use client';

import PropertyCard from '@heuvera/components/cards/PropertyCards/PropertyCard';
import Categories from '@heuvera/components/categories/Categories';
import { PropertyData } from '@heuvera/components/data/PropertyData';
import Footer from '@heuvera/components/footer';
import SearchBar from '@heuvera/components/search/SearchBar';
import useIsMobile from '@heuvera/hooks/IsMobile';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Skeletal Preloader Component
const SkeletalPreloader = () => {
  return (
    <div className="pt-5 md:pt-10 lg:pt-10 xl:pt-10 2xl:pt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-8 justify-center">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="w-full flex justify-center">
          <div className="w-full max-w-[300px] animate-pulse">
            <div className="bg-gray-200 w-full h-60 md:h-36 lg:h-28 xl:h-36 2xl:h-44 rounded-lg mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function Explore() {
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredProperties, setFilteredProperties] = useState(PropertyData);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Filter properties based on selected category
  useEffect(() => {
    if (selectedCategory) {
      const filtered = PropertyData.filter(
        (property) =>
          property.propertyCategory.toLowerCase() ===
          selectedCategory.toLowerCase(),
      );
      setFilteredProperties(filtered);
    } else {
      setFilteredProperties(PropertyData);
    }
  }, [selectedCategory]);

  return (
    <div className="flex flex-col flex-1 h-full w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24">
      <div className="w-full gap-5 flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-between">
          <SearchBar isMobile={isMobile} />
        </div>
        <Categories
          onCategorySelect={(category) => setSelectedCategory(category)}
        />
      </div>

      {loading ? (
        <SkeletalPreloader />
      ) : (
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
          {filteredProperties.map((property) => (
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
      )}
      {/* <Footer/> */}
    </div>
  );
}
