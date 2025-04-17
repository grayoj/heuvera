import Image from "next/image";

export default function Onboarding() {
    return (
        <>
            <div className="w-full">
                <div className="flex w-full h-screen">
                    <div className="relative h-full w-1/2 ">
                        <Image src="/town.jpg" alt="" className="w-full h-full" width={300} height={300} />
                        <div className="absolute inset-0 bg-[#7B4F3A10] dark:bg-[#8B5F4D99] z-10"></div>
                        <div className="absolute top-20 left-20 w-full z-20">
                            Hey
                        </div>
                    </div>
                    <div className="h-full w-1/2 bg-[#F8F7F2] dark:bg-[#333333] z-20">
                    
                    </div>
                </div>
            </div>
        </>
    );
}