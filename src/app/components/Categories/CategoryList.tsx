import { useState } from "react";
import { categories } from "./categoriesData";
import CategoryItem from "./CategoryItem";

const CategoryList = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    return (
        <div className="flex gap-8 overflow-x-auto">
            {categories.map(({ label, icon }) => (
                <CategoryItem
                    key={label}
                    label={label}
                    icon={icon}
                    selected={selectedCategory === label}
                    onSelect={setSelectedCategory}
                />
            ))}
        </div>
    );
};

export default CategoryList;
