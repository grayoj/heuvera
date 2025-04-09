import Image from "next/image";
import { Button } from "../ui/button";
import { Trash, Upload } from "lucide-react";

export default function PropertyImage() {
  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <h3>Property Image</h3>
        <Button variant="outline">
          <Upload size={16} />
          Upload Image
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {[1, 2, 3].map((index) => (
          <div key={index} className="relative">
            <Image
              className=" rounded-lg "
              src="https://picsum.photos/313/170"
              width={313}
              height={150}
              alt="picture"
            />
            <Trash className="absolute top-2 right-2 text-[#EA4335] bg-white rounded-full p-1  cursor-pointer" />
          </div>
        ))}
      </div>
    </div>
  );
}
