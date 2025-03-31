import { Card, CardContent } from "@heuvera/components/ui/card";
import { help } from "../../app/data/array";
import { Button } from "@heuvera/components/ui/button";
import {
  CircleHelp,
  EyeOff,
  Pencil,
  SquareArrowOutUpRight,
} from "lucide-react";

export default function Help() {
  return (
    <div className="space-y-4 flex md:flex-row md:flex-col lg:flex-col">
      {help.map((item, index) => (
        <Card
          className="w-74 md:w-74 lg:w-52 xl:w-74 2xl:w-74 bg-[#F8F7F2]"
          key={index}
        >
          <CardContent className="flex flex-col gap-2.5 md:gap-2.5 lg:gap-1.5 xl:gap-2.5 2xl:gap-2.5">
            <div className="text-[#7B4F3A] bg-[#7B4F3A80] w-fit p-2 rounded-full ">
              {index === 0 ? (
                <EyeOff className="h-6 md:h-6 lg:h-4 xl:h-6 w-6 md:w-6 lg:w-4 xl:w-6" />
              ) : index === 2 ? (
                <Pencil className="h-6 md:h-6 lg:h-4 xl:h-6 w-6 md:w-6 lg:w-4 xl:w-6" />
              ) : (
                <SquareArrowOutUpRight className="h-6 md:h-6 lg:h-4 xl:h-6 w-6 md:w-6 lg:w-4 xl:w-6" />
              )}
            </div>
            <h2 className="text-sm font-semibold">{item.title}</h2>
            <p className="text-[#898989] text-xs">{item.description}</p>
            <Button
              variant="outline"
              className="hover:cursor-pointer bg-[#F8F7F2] max-w-fit"
            >
              <CircleHelp />
              Further Help{" "}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
