import Image from 'next/image';

interface FindPropertyCard {
    category: string;
    count: number;
    imageUrl: string;
    width: string;
}


export function FindPropertyCard({ category, count, imageUrl, width = "w-3/12" }: FindPropertyCard) {
    return (
        <div className={`${width} h-96 md:h-52 lg:h-64 xl:h-72 2xl:h-96 rounded-2xl bg-red-200 relative`}>
            <Image
                src={imageUrl || '/apartment.jpg'}
                width={500}
                height={500}
                alt={`${category} property`}
                className="h-full w-full object-cover rounded-2xl"
            />
            <div className="flex flex-col absolute left-14 md:left-6 lg:left-6 xl:left-8 2xl:left-14 top-14 md:top-6 lg:top-6 xl:top-8 2xl:top-14">
                <h1 className="text-xl font-medium font-serif">{category}</h1>
                <h1 className="text-base font-normal font-serif">{count} Properties</h1>
            </div>
        </div>
    );
}