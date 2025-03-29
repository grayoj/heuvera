import Image from 'next/image';

interface PropertyCategoryCard {
    category: string;
    count: number;
    imageUrl: string;
}

export function PropertyCategoryCard({ category, count, imageUrl }: PropertyCategoryCard) {
    return (
        <div className="w-full h-96 rounded-2xl bg-red-200 relative">
            <Image
                src={imageUrl || '/town.jpg'}
                width={500}
                height={500}
                alt={`${category} property`}
                className="w-full h-full object-cover rounded-2xl"
            />
            <div className="flex flex-col absolute left-14 top-14">
                <h1 className="text-xl font-medium font-serif">{category || 'Town House'}</h1>
                <h1 className="text-base font-normal font-serif">{count || 2} Properties</h1>
            </div>
        </div>
    );
}