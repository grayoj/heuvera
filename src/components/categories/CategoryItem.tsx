import React from 'react';

interface CategoryItemProps {
    label: string;
    icon: React.ComponentType<{ size: number }>;
    selected: boolean;
    onSelect: (label: string) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
    label,
    icon: Icon,
    selected,
    onSelect,
}) => (
    <div
        onClick={() => onSelect(label)}
        className={`h-[78px] md:h-[88px] lg:h-[68px] xl:h-[88px] 2xl:h-[88px] flex flex-col items-center justify-center gap-2 px-2 border-b-2 transition cursor-pointer ${selected
                ? 'border-b-[#7B4F3A] text-[#7B4F3A]'
                : 'border-transparent text-neutral-500'
            }`}
    >
        <Icon size={24} />
        <div className="font-medium text-xs font-serif">{label}</div>
    </div>
);

export default CategoryItem;
