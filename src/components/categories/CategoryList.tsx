"use client";

import { useState, useRef } from "react";
import { categories } from "./categoriesData";
import CategoryItem from "./CategoryItem";
import {
  LucideCircleChevronLeft,
  LucideCircleChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

interface CategoryListProps {
  onCategorySelect: (category: string | null) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ onCategorySelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleCategorySelect = (category: string) => {
    const newCategory = selectedCategory === category ? null : category;
    setSelectedCategory(newCategory);
    onCategorySelect(newCategory);
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const scrollAmount = 200;
      const newScrollLeft =
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount;

      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });

      setTimeout(() => {
        setShowLeftArrow(newScrollLeft > 0);
        setShowRightArrow(newScrollLeft < scrollWidth - clientWidth);
      }, 300);
    }
  };

  return (
    <div className="relative flex items-center">
      {showLeftArrow && (
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scroll("left")}
        >
          <LucideCircleChevronLeft className="text-[#A7A7A7] dark:text-[#666666] cursor-pointer" />
        </motion.div>
      )}

      <div
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto whitespace-nowrap no-scrollbar scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none] px-6"
      >
        {categories.map(({ label, icon }) => (
          <CategoryItem
            key={label}
            label={label}
            icon={icon}
            selected={selectedCategory === label}
            onSelect={() => handleCategorySelect(label)}
          />
        ))}
      </div>

      {showRightArrow && (
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scroll("right")}
        >
          <LucideCircleChevronRight className="text-[#A7A7A7] dark:text-[#666666] cursor-pointer" />
        </motion.div>
      )}
    </div>
  );
};

export default CategoryList;
