"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import Divider from "../Divider";
import SectionHeaderText from "../text/SectionHeaderText";

interface HostInfoProps {
  propertyHost: {
    name: string;
    profilePicture: string;
  };
}

export default function HostInfo({ propertyHost }: HostInfoProps) {
  return (
    <>
      <Divider />
      <div className="flex flex-col gap-5">
        <SectionHeaderText title="Property Host" />
        <div className="flex gap-2 items-center">
          <div className="size-10 rounded-full">
            <Avatar className="rounded-full overflow-hidden block">
              <AvatarImage src={propertyHost.profilePicture} alt="@shadcn" />
              <AvatarFallback className="bg-[#E3E2D9] bg-[#555555] font-serif">
                FG
              </AvatarFallback>
            </Avatar>
          </div>
          <h1 className="text-base font-normal font-serif text-[#323232] dark:text-[#F3F2EC]">
            {propertyHost.name}
          </h1>
        </div>
      </div>
    </>
  );
}
