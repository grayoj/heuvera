import { useRef } from "react";
import CategoryList from "../categories/CategoryList";

export function CategoriesSection({
    onCategorySelect,
}: {
    onCategorySelect: (category: string | null) => void;
}) {
    const categoriesRef = useRef<HTMLDivElement>(null);
    return (
        <div className="w-full flex items-center justify-center gap-3">
            <div className="border-b overflow-hidden" ref={categoriesRef}>
                <CategoryList onCategorySelect={onCategorySelect} />
            </div>
        </div>
    );
}
