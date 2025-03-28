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
    <div className="space-y-4 ">
      {help.map((item, index) => (
        <Card className="w-[18.625rem] bg-[#F8F7F2]" key={index}>
          <CardContent>
            <div className="mb-2.5 text-[#7B4F3A] bg-[#7B4F3A80] w-fit p-2 rounded-full ">
              {index === 0 ? (
                <EyeOff />
              ) : index === 2 ? (
                <Pencil />
              ) : (
                <SquareArrowOutUpRight />
              )}
            </div>
            <h2 className="text-[14px] font-semibold">{item.title}</h2>
            <p className="text-[#898989] text-[12px] mb-2.5">
              {item.description}
            </p>
            <Button
              variant="outline"
              className="rounded-full  hover:cursor-pointer"
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
