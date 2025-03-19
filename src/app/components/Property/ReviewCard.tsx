import { Button } from "@heuvera/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { IoStar } from "react-icons/io5";
import { LucideMoreVertical } from "lucide-react";
import { FaStar } from "react-icons/fa6";

export default function ReviewCard() {
    return (
        <div className="w-full flex flex-col gap-5 rounded-xl border border-[#E3E2D9] p-6">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row">
                    <div className="flex gap-2 items-center">
                        <div className="size-10 rounded-full">
                            <Avatar className="rounded-full overflow-hidden block">
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback className="bg-[#E3E2D9] font-serif">FG</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-base font-medium font-serif text-[#323232]">Gerald Maduabubuhari</h1>
                            <div className="flex flex-row gap-2">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className="text-yellow-400 text-2xl" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <LucideMoreVertical className="text-[#3e3e3e] text-2xl" />
                </div>
            </div>
            <h1 className="text-base font-serif text-[#3e3e3e]">
                Absolutely stunning! The apartment exceeded my expectations.
                The interiors are elegant, the view is breathtaking, and the
                staff is incredibly professional. I felt safe and comfortable
                throughout my stay."
            </h1>
            <div className="flex flex-row justify-between">
                <h1 className="text-[#3e3e3e] text-base font-serif">Was this review helpful?</h1>
                <div className="flex flex-row gap-2">
                    <Button variant="outline" className="bg-transparent font-serif">Yes</Button>
                    <Button variant="outline" className="bg-transparent font-serif">No</Button>
                </div>
            </div>
        </div>
    );
}