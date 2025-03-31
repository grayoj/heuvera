import { Plus, Upload } from "lucide-react";
import { Button } from "../ui/button";
import Input from "../ui/Input";
import { personInput } from "@heuvera/app/data/array";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

export default function PersonalForm({
  userImage,
  handleImageUpload,
}: {
  userImage: string;
  handleImageUpload: () => void;
}) {
  return (
    <form className="flex flex-col justify-start gap-5 w-full pr-5">
      <div className="pb-5 border-b">
        <Avatar className="">
          <AvatarImage
            className="object-cover rounded-full size-20 md:size-20 lg:size-14 xl:size-20"
            src={userImage || "https://github.com/shadcn.png"}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex mt-5 gap-3 md:gap-3 lg:gap-0 flex-col md:flex-col lg:flex-row justify-between">
          <div>
            <h2 className="text-xl md:text-xl lg:text-base xl:text-xl font-medium">
              Profile Picture
            </h2>
            <p className="text-[#898989] text-base md:text-base lg:text-xs xl:text-base ">
              PNG, JPEG under 15mb{" "}
            </p>
          </div>
          <div className="flex space-x-5">
            <Button
              variant="default"
              className="bg-[#7B4F3A] hover:bg-[#664130] hover:cursor-pointer text-sm md:text-sm lg:text-xs xl:text-sm"
              onClick={handleImageUpload}
            >
              <Upload />
              Upload Image
            </Button>
            <Button
              variant="outline"
              className="bg-[#F8F7F2] hover:cursor-pointer text-sm md:text-sm lg:text-xs xl:text-sm"
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-row w-full gap-5 space-y-6 border-b">
        <Input label="First name" placeholder="John" className="w-full" />
        <Input label="Last name" placeholder="Doe" className="w-full" />
      </div>
      <div className="w-full flex flex-row w-full gap-5 space-y-6 border-b items-center justify-between">
        <div className="flex flex-col w-full gap-5">
          <Input
            label="Email"
            placeholder="example@gmail.com"
            className="w-6/12 md:w-12/12 lg:w-12/12 xl:w-9/12 2xl:w-6/12"
          />
          <Button
            variant="outline"
            className="bg-[#F8F7F2] max-w-fit text-sm md:text-sm lg:text-xs xl:text-sm"
          >
            Add another email
            <Plus />
          </Button>
        </div>
        <Button
          variant="outline"
          className="bg-[#F8F7F2] text-sm md:text-sm lg:text-xs xl:text-sm"
        >
          Change email
        </Button>
      </div>
      <div className="w-full flex flex-row w-full gap-5 space-y-6 border-b items-center justify-between">
        <div className="flex flex-col w-full gap-5">
          <Input
            label="Phone number"
            placeholder="0000-0000-0000"
            className="w-6/12 md:w-12/12 lg:w-12/12 xl:w-9/12 2xl:w-6/12"
          />
          <Button
            variant="outline"
            className="bg-[#F8F7F2] max-w-fit text-sm md:text-sm lg:text-xs xl:text-sm"
          >
            Add another phone number
            <Plus />
          </Button>
        </div>
        <Button
          variant="outline"
          className="bg-[#F8F7F2] text-sm md:text-sm lg:text-xs xl:text-sm"
        >
          Change phone number
        </Button>
      </div>
      <div className="w-full flex flex-row w-full gap-5 space-y-6 border-b items-center justify-between">
        <div className="flex flex-col w-full gap-5">
          <Input
            label="Address"
            placeholder="plot 24 room 1254 BC, Abuja"
            className="w-6/12 md:w-12/12 lg:w-12/12 xl:w-9/12 2xl:w-6/12"
          />
          <Button
            variant="outline"
            className="bg-[#F8F7F2] max-w-fit text-sm md:text-sm lg:text-xs xl:text-sm"
          >
            Add another address
            <Plus />
          </Button>
        </div>
        <Button
          variant="outline"
          className="bg-[#F8F7F2] text-sm md:text-sm lg:text-xs xl:text-sm"
        >
          Change address
        </Button>
      </div>
    </form>
  );
}
