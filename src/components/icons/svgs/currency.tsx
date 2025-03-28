import React from 'react';

interface CurrencyProps {
    color?: string;
    className?: string;
    isActive?: boolean;
}

export default function Currency({ 
    color, 
    className, 
    isActive = false 
}: CurrencyProps) {
    // Default colors for active and inactive states
    const activeColor = color || '7B4F3A';     // Brown color when active
    const inactiveColor = color || '323223';   // Dark gray when inactive

    const currentColor = isActive ? activeColor : inactiveColor;

    return (
        <div className={`size-5 ring ring-1 flex items-center justify-center ring bg-transparent rounded-full ring-[#${currentColor}] ${className}`}>
            <h1 className={`font-serif text-sm text-[#${currentColor}]`}>₦</h1>
        </div>
    );
}