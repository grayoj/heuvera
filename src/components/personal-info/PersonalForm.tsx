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
    <form className="flex flex-col justify-between w-full pr-5">
      <div className="pb-5 border-b">
        <Avatar className="">
          <AvatarImage
            className="object-cover rounded-full size-20"
            src={userImage || "https://github.com/shadcn.png"}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex mt-5 justify-between">
          <div>
            <h2 className="text-[1rem] font-medium">Profile Picture</h2>
            <p className="text-[#898989] text-[14px] ">PNG, JPEG under 15mb </p>
          </div>
          <div className="flex space-x-5">
            <Button
              variant="default"
              className="bg-[#7B4F3A] hover:bg-[#664130] hover:cursor-pointer"
              onClick={handleImageUpload}
            >
              <Upload />
              Upload Image
            </Button>
            <Button
              variant="outline"
              className="bg-[#F8F7F2] hover:cursor-pointer"
            >
              Remove
            </Button>
          </div>
        </div>
      </div>

      {personInput.map((item, index) => (
        <div
          key={index}
          className={`${item.label2 && "flex-row"} flex flex-col space-y-4`}
        >
          <div className="flex justify-between items-center space-x-4 space-y-5 border-b w-full">
            <div className="flex flex-col justify-center mt-3 space-y-4 w-[40%]">
              <Input label={item.label || ""} value={item.value || ""} />
              {index >= 1 && (
                <Button
                  variant="outline"
                  className="w-fit bg-[#F8F7F2] hover:cursor-pointer"
                >
                  <Plus />
                  {item.secondaryBtn}
                </Button>
              )}
            </div>
            {item.label2 && (
              <Input
                className="w-[40%]"
                label={item.label2 || ""}
                value={item.value || ""}
              />
            )}
            {index >= 1 && (
              <Button
                variant="outline"
                className=" hover:cursor-pointer bg-[#F8F7F2]"
              >
                {item.primaryBtn}
              </Button>
            )}
          </div>
        </div>
      ))}
    </form>
  );
}
