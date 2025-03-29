import Image from 'next/image';

interface FindPropertyCard {
    category: string;
    count: number;
    imageUrl: string;
    width: string;
}


export function FindPropertyCard({ category, count, imageUrl, width = "w-3/12" }: FindPropertyCard) {
    return (
        <div className={`${width} h-96 rounded-2xl bg-red-200 relative`}>
            <Image
                src={imageUrl || '/apartment.jpg'}
                width={500}
                height={500}
                alt={`${category} property`}
                className="h-full w-full object-cover rounded-2xl"
            />
            <div className="flex flex-col absolute left-14 top-14">
                <h1 className="text-xl font-medium font-serif">{category}</h1>
                <h1 className="text-base font-normal font-serif">{count} Properties</h1>
            </div>
        </div>
    );
}