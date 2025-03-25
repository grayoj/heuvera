'use client';

import { useState } from 'react';
import { categories } from './categoriesData';
import CategoryItem from './CategoryItem';

interface CategoryListProps {
  onCategorySelect: (category: string | null) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ onCategorySelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategorySelect = (category: string) => {
    const newCategory = selectedCategory === category ? null : category;
    setSelectedCategory(newCategory);
    onCategorySelect(newCategory);
  };

  return (
    <div className="flex gap-8 overflow-x-auto whitespace-nowrap no-scrollbar scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none]">
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
  );
};

export default CategoryList;