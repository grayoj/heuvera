import { Plus, Upload } from "lucide-react";
import { Button } from "../ui/button";
import Input from "../ui/Input";
import { personInput } from "@heuvera/app/data/array";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { motion } from "framer-motion";

export default function PersonalForm({
  userImage,
  handleImageUpload,
}: {
  userImage: string;
  handleImageUpload: () => void;
}) {
  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  // Avatar hover animation
  const avatarVariants = {
    hover: { scale: 1.05, boxShadow: "0px 0px 8px rgba(0,0,0,0.2)" },
  };

  return (
    <motion.form
      className="flex flex-col justify-start gap-5 w-full pr-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="pb-5 border-b" variants={itemVariants}>
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
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="default"
                className="bg-[#7B4F3A] hover:bg-[#664130] hover:cursor-pointer text-sm md:text-sm lg:text-xs xl:text-sm"
                onClick={handleImageUpload}
              >
                <Upload />
                Upload Image
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="bg-[#F8F7F2] hover:cursor-pointer text-sm md:text-sm lg:text-xs xl:text-sm"
              >
                Remove
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="w-full flex flex-row w-full gap-5 space-y-6 border-b"
        variants={itemVariants}
      >
        <Input label="First name" placeholder="John" className="w-full" />
        <Input label="Last name" placeholder="Doe" className="w-full" />
      </motion.div>

      <motion.div
        className="w-full flex flex-row w-full gap-5 space-y-6 border-b items-center justify-between"
        variants={itemVariants}
      >
        <div className="flex flex-col w-full gap-5">
          <Input
            label="Email"
            placeholder="example@gmail.com"
            className="w-6/12 md:w-12/12 lg:w-12/12 xl:w-9/12 2xl:w-6/12"
          />
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="outline"
              className="bg-[#F8F7F2] max-w-fit text-sm md:text-sm lg:text-xs xl:text-sm"
            >
              <motion.div
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <Plus />
              </motion.div>
              Add another email
            </Button>
          </motion.div>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            className="bg-[#F8F7F2] text-sm md:text-sm lg:text-xs xl:text-sm"
          >
            Change email
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="w-full flex flex-row w-full gap-5 space-y-6 border-b items-center justify-between"
        variants={itemVariants}
      >
        <div className="flex flex-col w-full gap-5">
          <Input
            label="Phone number"
            placeholder="0000-0000-0000"
            className="w-6/12 md:w-12/12 lg:w-12/12 xl:w-9/12 2xl:w-6/12"
          />
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="outline"
              className="bg-[#F8F7F2] max-w-fit text-sm md:text-sm lg:text-xs xl:text-sm"
            >
              <motion.div
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <Plus />
              </motion.div>
              Add another phone number
            </Button>
          </motion.div>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            className="bg-[#F8F7F2] text-sm md:text-sm lg:text-xs xl:text-sm"
          >
            Change phone number
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="w-full flex flex-row w-full gap-5 space-y-6 border-b items-center justify-between"
        variants={itemVariants}
      >
        <div className="flex flex-col w-full gap-5">
          <Input
            label="Address"
            placeholder="plot 24 room 1254 BC, Abuja"
            className="w-6/12 md:w-12/12 lg:w-12/12 xl:w-9/12 2xl:w-6/12"
          />
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="outline"
              className="bg-[#F8F7F2] max-w-fit text-sm md:text-sm lg:text-xs xl:text-sm"
            >
              <motion.div
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <Plus />
              </motion.div>
              Add another address
            </Button>
          </motion.div>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            className="bg-[#F8F7F2] text-sm md:text-sm lg:text-xs xl:text-sm"
          >
            Change address
          </Button>
        </motion.div>
      </motion.div>
    </motion.form>
  );
}
