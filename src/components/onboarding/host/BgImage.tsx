import Image from "next/image";
// import { texts } from "./data";

export default function BgImage() {
  return (
    <div className="relative max-h-screen hidden md:block md:w-1/2 bg-cover bg-center overflow-hidden">
      <Image
        width={500}
        height={500}
        alt="background image"
        src="/imgbackground.png"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[#7b4f3ac4] z-10"></div>
      <div className="absolute inset-0 z-20 flex items-center flex-col justify-center">
        {/* {texts.map(({ heading, subheading }, index) => (
          <div
            key={index}
            className="flex flex-col text-white p-4 text-lg max-w-xl"
          >
            <h1 className={`${index === 0 && " mb-4"} font-bold`}>{heading}</h1>
            <p className="font-thin">{subheading}</p>
          </div>
        ))} */}
      </div>
    </div>
  );
}
