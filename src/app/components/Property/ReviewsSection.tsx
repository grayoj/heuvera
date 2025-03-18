import { Button } from "@heuvera/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { IoStar } from "react-icons/io5";
import { LucideMoreVertical } from "lucide-react";
import ReviewCard from "./ReviewCard";

export default function ReviewsSection() {
    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-serif font-medium text-[#3E3E3E] pb-2">Reviews</h1>
            <div className="flex gap-10 items-center">
                <ReviewCard />
                <ReviewCard />
            </div>
            <h1 className="text-base font-serif font-medium text-[#3E3E3E] underline">See all reviews</h1>
        </div>
    );
}
