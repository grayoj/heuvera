import React from 'react';

interface CurrencyProps {
    color: string;
    className: string;
}

export default function Currency({ color, className }: CurrencyProps) {
    return (
        <>
            <div className={`size-5 ring ring-1 flex items-center justify-center ring bg-transparent rounded-full ring-[#${color}] ${className}`}>
                <h1 className={`font-serif text-sm text-[#${color}]`}>₦</h1>
            </div>
        </>
    )
}
