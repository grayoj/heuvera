import {
  BadgeCheck,
  Bath,
  BedDouble,
  Bookmark,
  Pencil,
  RectangleVertical,
  Trash,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@heuvera/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@heuvera/components/ui/card";
import PropertyIcon from "./PropertyIcon";

interface Property {
  price: string;
  address: string;
  noOfBeds: number;
  noOfBaths: number;
  measurement: string;
}

export default function PropertyCard({
  property,
  className,
  showActBtns,
  setOpen,
}: {
  property: Property;
  className?: string;
  showActBtns?: boolean;
  open?: string;
  setOpen?: (value: string) => void;
}) {
  return (
    <div
      className="h-96 w-full md:size-60 lg:h-52 lg:w-56 xl:w-72 xl:h-86 2xl:w-72 2xl:h-86 rounded-2xl border border-[#E3E2D9] dark:border-[#555555] flex flex-col justify-start"
    >
      <div className="w-full h-60 md:h-36 lg:h-28 xl:h-40 2xl:h-40 overflow-hidden rounded-t-2xl">
        <Image
          src="https://picsum.photos/303/172"
          className="w-full h-full object-cover transition-all duration-300"
          width={303}
          height={172}
          alt="cardImage"
        />
      </div>
      <div className="py-3 flex flex-col justify-between">
        <CardHeader className="gap-3">
          <CardTitle className="text-2xl flex justify-between items-center">
            <div>
              {property.price}{" "}
              <span className="text-[#898989] text-sm">/night</span>
            </div>
            <BadgeCheck color="#7b4f3a" />
          </CardTitle>
          <CardDescription className="text-[#505050] text-[0.69rem] flex justify-between">
            <div className="flex flex-col gap-3">
              <p className="">{property.address}</p>
              <div className="flex space-x-5 text-sm text-[#E3E2D9]">
                <PropertyIcon>
                  <BedDouble />
                  <span>{property.noOfBeds}</span>
                </PropertyIcon>
                <PropertyIcon>
                  <Bath />
                  <span>{property.noOfBaths}</span>
                </PropertyIcon>
                <PropertyIcon>
                  <RectangleVertical />
                  <span>{property.measurement}</span>
                </PropertyIcon>
              </div>
            </div>
          </CardDescription>
        </CardHeader>
        {showActBtns && (
          <CardFooter className="flex justify-between mt-4">
            <Button
              onClick={() => setOpen && setOpen("edit")}
              variant="outline"
              className="bg-[#F8F7F2] rounded-full cursor-pointer"
            >
              <Pencil />
              Edit
            </Button>
            <Button
              variant="default"
              className="bg-[#CB2517] hover:bg-[#a71e11] rounded-full cursor-pointer"
            >
              <Trash />
              Delete
            </Button>
          </CardFooter>
        )}
      </div>

    </div>
  );
}
