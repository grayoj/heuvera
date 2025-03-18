import Image from "next/image";

export default function PropertyImage({ imageUrl }: { imageUrl?: string }) {
    return (
        <div className="w-full h-44">
            {imageUrl ? (
                <Image
                    src={imageUrl}
                    alt="Property"
                    width={500}
                    height={500}
                    className="w-full h-full rounded-t-2xl object-cover"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-t-2xl">
                    <p className="text-gray-500">No Image Available</p>
                </div>
            )}
        </div>
    );
}
