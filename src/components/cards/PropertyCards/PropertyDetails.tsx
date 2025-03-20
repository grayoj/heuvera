import BadgeCheck from "../../icons/svgs/badgeCheck";
import { IoBed, IoPerson } from "react-icons/io5";
import { FaBath } from "react-icons/fa";
import BookmarkButton from "../../Buttons/BookmarkButton";
import { FaStar } from "react-icons/fa6";

export default function PropertyDetails({
    price,
    address,
    beds,
    baths,
    guests,
    isVerified,
    rating
}: {
    price: number,
    address: string,
    beds: number,
    baths: number,
    guests: number,
    isVerified: boolean,
    rating: number
}) {
    return (
        <div className="h-36 flex flex-col justify-evenly">
            {/* Price and Badge */}
            <div className="flex flex-row justify-between">
                <h1 className="text-2xl text-[#3F3B2B] font-semibold font-serif">
                    ₦{(price ?? 0).toLocaleString()}
                    <span className="text-sm text-[#898989] font-serif font-normal"> /night</span>
                </h1>
                {isVerified && <BadgeCheck color="#7B4F3A" />}
            </div>

            {/* Address */}
            <div className="flex flex-row">
                <h1 className="text-sm text-[#505050] font-normal font-serif">{address}</h1>
            </div>

            {/* Icons */}
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-5">
                    <div className="gap-1 flex items-center">
                        <IoBed className="text-[#898989] text-xl" />
                        <h1 className="text-[#898989] text-base font-serif">{beds}</h1>
                    </div>
                    <div className="gap-1 flex items-center">
                        <FaBath className="text-[#898989] text-base" />
                        <h1 className="text-[#898989] text-base font-serif">{baths}</h1>
                    </div>
                    <div className="gap-1 flex items-center">
                        <IoPerson className="text-[#898989] text-base" />
                        <h1 className="text-[#898989] text-base font-serif">{guests}</h1>
                    </div>
                </div>
                <div className="flex flex-row items-center gap-1">
                    <h1 className="text-base text-base font-medium font-serif text-[#898989]">{rating}</h1>
                    <FaStar className="text-yellow-400 text-base" />
                </div>
                {/* <BookmarkButton /> */}
            </div>
        </div>
    );
}
