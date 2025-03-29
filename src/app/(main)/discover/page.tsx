"use client";

import { FindPropertyCard } from '@heuvera/components/cards/DiscoverCards/FindPropertyCard';
import { PropertyCategoryCard } from '@heuvera/components/cards/DiscoverCards/PropertyCategoryCard';
import CategoryList from '@heuvera/components/categories/CategoryList';
import Hero from '@heuvera/components/hero';
import SearchBar from '@heuvera/components/search/SearchBar';
import useIsMobile from '@heuvera/hooks/IsMobile';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { PropertyData } from '@heuvera/components/data/PropertyData';
import PropertyCard from '@heuvera/components/cards/PropertyCards/PropertyCard';

interface DiscoverProps {
  onCategorySelect: (category: string | null) => void;
}


const Discover: React.FC<DiscoverProps> = ({
  onCategorySelect
}) => {
  const isMobile = useIsMobile();
  const categoriesRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<{ type: string, name: string } | null>(null);

  const propertyCategories = [
    { id: 1, category: 'Town House', count: 2, imageUrl: '/town.jpg' },
    { id: 2, category: 'Apartment', count: 5, imageUrl: '/apartment.jpg' },
    { id: 3, category: 'Villa', count: 3, imageUrl: '/villa.jpg' },
    { id: 4, category: 'Penthouse', count: 1, imageUrl: '/penthouse.jpg' },
    { id: 5, category: 'Cottage', count: 4, imageUrl: '/cottage.jpg' }
  ];

  const propertyLocation = [
    { id: 1, category: 'Abuja', count: 158, imageUrl: '/abuja.jpg' },
    { id: 2, category: 'Lagos', count: 94, imageUrl: '/lagos.jpg' },
    { id: 3, category: 'Kano', count: 76, imageUrl: '/kano.jpg' },
    { id: 4, category: 'Chicago', count: 63, imageUrl: '/chicago.jpg' },
    { id: 5, category: 'San Francisco', count: 52, imageUrl: '/sanfrancisco.jpg' },
    { id: 6, category: 'Austin', count: 47, imageUrl: '/austin.jpg' }
  ];

  const handlePropertyCategoryClick = (category: string) => {
    setSelectedCategory({ type: "property", name: category });
  };

  const handleLocationClick = (location: string) => {
    setSelectedCategory({ type: "location", name: location });
  };

  const handleCloseFiltered = () => {
    setSelectedCategory(null);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardAnimation = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 }
    }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    },
    hover: {
      scale: 1.03,
      boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 }
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    },
    hover: {
      scale: 1.03,
      boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <>
      <div className='w-full h-full px-4 md:px-8 lg:px-12 xl:px-14 2xl:px-20 flex flex-col gap-10 md:gap-20'>
        <motion.div
          className='w-full h-full relative'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Hero />
          <motion.div
            className="absolute bottom-0 left-0 right-0 transform translate-y-1/3 px-4 z-10"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <SearchBar isMobile={isMobile} />
          </motion.div>
        </motion.div>

        <div className='w-full flex items-center justify-center gap-3'>
          <div className='border-b overflow-hidden' ref={categoriesRef}>
            <CategoryList onCategorySelect={onCategorySelect} />
          </div>
        </div>

        {selectedCategory ? (
          <motion.div
            className='w-full'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className='w-full flex justify-between items-center mb-6'>
              <motion.h1
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className='text-2xl font-semibold font-serif text-[#323232]'
              >
                {selectedCategory.type === "property" ? selectedCategory.name : `Properties in ${selectedCategory.name}`}
              </motion.h1>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCloseFiltered}
                className="cursor-pointer"
              >
                <X size={24} className="text-[#323232]" />
              </motion.div>
            </div>

            <motion.div
              className="pt-5 md:pt-10 lg:pt-10 xl:pt-10 2xl:pt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-6 gap-y-8 justify-center"
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
        ) : (
          <>
            <motion.div
              className='w-full flex flex-col items-center justify-center'
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
            >
              <motion.h1 variants={fadeInUp} className='text-center text-2xl md:text-3xl lg:text-2xl xl:text-3xl 2xl:text-3xl font-semibold font-serif text-[#323232]'>
                Feature Categories
              </motion.h1>
              <motion.h1 variants={fadeInUp} className='text-center text-base md:text-base lg:text-base xl:text-xl 2xl:text-xl font-normal font-serif text-[#323232]'>
                Discover your perfect property by the features that matter most to you
              </motion.h1>
              <motion.div
                className='w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 pt-10'
                variants={staggerContainer}
              >
                {propertyCategories.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={cardAnimation}
                    whileHover="hover"
                    onClick={() => handlePropertyCategoryClick(item.category)}
                    className="cursor-pointer"
                  >
                    <PropertyCategoryCard
                      category={item.category}
                      count={item.count}
                      imageUrl={item.imageUrl}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className='w-full flex flex-col items-center justify-center'
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
            >
              <motion.h1 variants={fadeInUp} className='text-center text-2xl md:text-3xl lg:text-2xl xl:text-3xl 2xl:text-3xl font-semibold font-serif text-[#323232]'>
                Find Properties in These Cities
              </motion.h1>
              <motion.h1 variants={fadeInUp} className='text-center text-base md:text-base lg:text-base xl:text-xl 2xl:text-xl font-normal font-serif text-[#323232]'>
                Based on your viewing history, we think you'll love these locations
              </motion.h1>
              <motion.div
                className='w-full flex flex-col gap-5 pt-10'
                variants={staggerContainer}
              >
                <motion.div className='w-12/12 flex flex-col md:flex-row gap-5' variants={fadeInUp}>
                  <motion.div
                    className='w-full md:w-6/12 cursor-pointer'
                    variants={slideInLeft}
                    whileHover="hover"
                    onClick={() => handleLocationClick(propertyLocation[0].category)}
                  >
                    <FindPropertyCard
                      category={propertyLocation[0].category}
                      count={propertyLocation[0].count}
                      imageUrl={propertyLocation[0].imageUrl}
                      width="w-12/12"
                    />
                  </motion.div>
                  <div className='w-full md:w-6/12 flex flex-col md:flex-row gap-5'>
                    <motion.div
                      className='w-full md:w-6/12 cursor-pointer'
                      variants={cardAnimation}
                      whileHover="hover"
                      onClick={() => handleLocationClick(propertyLocation[1].category)}
                    >
                      <FindPropertyCard
                        category={propertyLocation[1].category}
                        count={propertyLocation[1].count}
                        imageUrl={propertyLocation[1].imageUrl}
                        width="w-12/12"
                      />
                    </motion.div>
                    <motion.div
                      className='w-full md:w-6/12 cursor-pointer'
                      variants={cardAnimation}
                      whileHover="hover"
                      onClick={() => handleLocationClick(propertyLocation[2].category)}
                    >
                      <FindPropertyCard
                        category={propertyLocation[2].category}
                        count={propertyLocation[2].count}
                        imageUrl={propertyLocation[2].imageUrl}
                        width="w-12/12"
                      />
                    </motion.div>
                  </div>
                </motion.div>
                <motion.div className='w-12/12 flex flex-col md:flex-row gap-5' variants={fadeInUp}>
                  <div className='w-full md:w-6/12 flex flex-col md:flex-row gap-5'>
                    <motion.div
                      className='w-full md:w-6/12 cursor-pointer'
                      variants={cardAnimation}
                      whileHover="hover"
                      onClick={() => handleLocationClick(propertyLocation[1].category)}
                    >
                      <FindPropertyCard
                        category={propertyLocation[1].category}
                        count={propertyLocation[1].count}
                        imageUrl={propertyLocation[1].imageUrl}
                        width="w-full md:w-12/12"
                      />
                    </motion.div>
                    <motion.div
                      className='w-full md:w-6/12 cursor-pointer'
                      variants={cardAnimation}
                      whileHover="hover"
                      onClick={() => handleLocationClick(propertyLocation[2].category)}
                    >
                      <FindPropertyCard
                        category={propertyLocation[2].category}
                        count={propertyLocation[2].count}
                        imageUrl={propertyLocation[2].imageUrl}
                        width="w-12/12"
                      />
                    </motion.div>
                  </div>
                  <motion.div
                    className='w-full md:w-6/12 cursor-pointer'
                    variants={slideInRight}
                    whileHover="hover"
                    onClick={() => handleLocationClick(propertyLocation[0].category)}
                  >
                    <FindPropertyCard
                      category={propertyLocation[0].category}
                      count={propertyLocation[0].count}
                      imageUrl={propertyLocation[0].imageUrl}
                      width="w-12/12"
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </div>
    </>
  );
}

export default Discover;