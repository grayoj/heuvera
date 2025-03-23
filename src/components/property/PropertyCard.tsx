import {
  Bath,
  BedDouble,
  BookMarked,
  CheckCircle,
  Pencil,
  RectangleVertical,
  Trash,
} from 'lucide-react';
import Image from 'next/image';
import { Button } from '@heuvera/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@heuvera/components/ui/card';
import PropertyIcon from './PropertyIcon'; // Adjust the import path if necessary

interface Property {
  price: string;
  address: string;
  noOfBeds: number;
  noOfBaths: number;
  measurement: string;
}

export default function PropertyCard({ property }: { property: Property }) {
    return (
        <Card className="w-[303px] pt-0 gap-0">
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
                        {property.price}{' '}
                        <span className="text-[#898989] text-sm">/night</span>
                    </div>
                    <CheckCircle />
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
                    <BookMarked />
                </CardDescription>
            </CardHeader>
            <CardFooter className="flex space-x-2 mt-5">
                <Button
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
        </Card>
    );
}
