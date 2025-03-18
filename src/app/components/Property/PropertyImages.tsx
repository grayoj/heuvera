import Image from "next/image";

export default function PropertyImages() {
    return (
        <>
            <div className="w-full h-[40rem] bg-blue-400 rounded-[3rem]">
                <Image
                    src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Property main image"
                    height={500}
                    width={500}
                    className="w-full h-full rounded-[3rem] object-cover"
                />
            </div>
            <div className="flex flex-row gap-6">
                <div className="w-6/12 bg-red-300 h-60 rounded-[3rem]">
                    <Image
                        src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Property secondary image"
                        height={500}
                        width={500}
                        className="w-full h-full rounded-[3rem] object-cover"
                    />
                </div>
                <div className="w-6/12 bg-red-100 h-60 rounded-[3rem]">
                    <Image
                        src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Property tertiary image"
                        height={500}
                        width={500}
                        className="w-full h-full rounded-[3rem] object-cover"
                    />
                </div>
            </div>
            <div className="relative w-full h-[40rem] bg-blue-400 rounded-[3rem] overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1592595896551-12b371d546d5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Property Image"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-[3rem]"
                />

                <div className="absolute bottom-6 right-6 w-56 h-32 rounded-[2rem] overflow-hidden">
                    <Image
                        src="https://images.unsplash.com/photo-1592595896551-12b371d546d5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="absolute inset-0 bg-cover bg-center blur-lg rounded-[3rem]"
                        alt="Blurred background"
                        width={500}
                        height={500}
                    />

                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-lg font-serif font-medium">
                        View 7 More Pictures
                    </div>
                </div>
            </div>
        </>
    );
}