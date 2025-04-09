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
    <Card
      className={`${className ? className : "w-[30%]"} pt-0 px-0 gap-0  bg-transparent`}
    >
      <Image
        src="https://picsum.photos/303/172"
        className="rounded-tl-xl rounded-tr-xl mb-[0.69rem]"
        width={303}
        height={172}
        alt="cardImage"
      />
      <CardHeader className="gap-0">
        <CardTitle className="text-[1.75rem] mb-2.5 flex justify-between items-center">
          <div>
            {property.price}{" "}
            <span className="text-[#898989] text-sm">/night</span>
          </div>
          <BadgeCheck color="#7b4f3a" />
        </CardTitle>
        <CardDescription className="text-[#505050] text-[0.69rem] flex justify-between">
          <div>
            <p className="mb-2">{property.address}</p>
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
          <Bookmark className="text-gray-300" />
        </CardDescription>
      </CardHeader>
      {showActBtns && (
        <CardFooter className="flex space-x-2 mt-5">
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
    </Card>
  );
}
