import {
  cardAnimation,
  fadeInUp,
  slideInLeft,
  slideInRight,
  staggerContainer,
} from "../animations/anim";
import { FindPropertyCard } from "../cards/DiscoverCards/FindPropertyCard";
import { PropertyCategoryCard } from "../cards/DiscoverCards/PropertyCategoryCard";
import { motion } from "framer-motion";

export function FeaturedSection({
  propertyCategories,
  propertyLocation,
  handlePropertyCategoryClick,
  handleLocationClick,
}: {
  propertyCategories: {
    id: number;
    category: string;
    count: number;
    imageUrl: string;
  }[];
  propertyLocation: {
    id: number;
    category: string;
    count: number;
    imageUrl: string;
  }[];
  handlePropertyCategoryClick: (category: string) => void;
  handleLocationClick: (location: string) => void;
}) {
  return (
    <>
      <motion.div
        className="w-full flex flex-col items-center justify-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <motion.h1
          variants={fadeInUp}
          className="text-center text-2xl md:text-3xl lg:text-2xl xl:text-3xl 2xl:text-3xl font-semibold font-serif text-[#323232]"
        >
          Feature Categories
        </motion.h1>
        <motion.h1
          variants={fadeInUp}
          className="text-center text-base md:text-base lg:text-base xl:text-xl 2xl:text-xl font-normal font-serif text-[#323232]"
        >
          Discover your perfect property by the features that matter most to you
        </motion.h1>
        <motion.div
          className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 pt-10"
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
        className="w-full flex flex-col items-center justify-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <motion.h1
          variants={fadeInUp}
          className="text-center text-2xl md:text-3xl lg:text-2xl xl:text-3xl 2xl:text-3xl font-semibold font-serif text-[#323232]"
        >
          Find Properties in These Cities
        </motion.h1>
        <motion.h1
          variants={fadeInUp}
          className="text-center text-base md:text-base lg:text-base xl:text-xl 2xl:text-xl font-normal font-serif text-[#323232]"
        >
          Based on your viewing history, we think you'll love these locations
        </motion.h1>
        <motion.div
          className="w-full flex flex-col gap-5 pt-10"
          variants={staggerContainer}
        >
          <motion.div
            className="w-12/12 flex flex-col md:flex-row gap-5"
            variants={fadeInUp}
          >
            <motion.div
              className="w-full md:w-6/12 cursor-pointer"
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
            <div className="w-full md:w-6/12 flex flex-col md:flex-row gap-5">
              <motion.div
                className="w-full md:w-6/12 cursor-pointer"
                variants={cardAnimation}
                whileHover="hover"
                onClick={() =>
                  handleLocationClick(propertyLocation[1].category)
                }
              >
                <FindPropertyCard
                  category={propertyLocation[1].category}
                  count={propertyLocation[1].count}
                  imageUrl={propertyLocation[1].imageUrl}
                  width="w-12/12"
                />
              </motion.div>
              <motion.div
                className="w-full md:w-6/12 cursor-pointer"
                variants={cardAnimation}
                whileHover="hover"
                onClick={() =>
                  handleLocationClick(propertyLocation[2].category)
                }
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
          <motion.div
            className="w-12/12 flex flex-col md:flex-row gap-5"
            variants={fadeInUp}
          >
            <div className="w-full md:w-6/12 flex flex-col md:flex-row gap-5">
              <motion.div
                className="w-full md:w-6/12 cursor-pointer"
                variants={cardAnimation}
                whileHover="hover"
                onClick={() =>
                  handleLocationClick(propertyLocation[1].category)
                }
              >
                <FindPropertyCard
                  category={propertyLocation[1].category}
                  count={propertyLocation[1].count}
                  imageUrl={propertyLocation[1].imageUrl}
                  width="w-full md:w-12/12"
                />
              </motion.div>
              <motion.div
                className="w-full md:w-6/12 cursor-pointer"
                variants={cardAnimation}
                whileHover="hover"
                onClick={() =>
                  handleLocationClick(propertyLocation[2].category)
                }
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
              className="w-full md:w-6/12 cursor-pointer"
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
  );
}
