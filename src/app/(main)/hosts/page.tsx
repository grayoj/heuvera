"use client";

import { Button } from "@heuvera/components/ui/button";
import Input from "../../../components/ui/Input";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@heuvera/components/ui/avatar";
import Help from "@heuvera/components/ui/Help";
import { Plus, Upload } from "lucide-react";
import { useState } from "react";
import AccountHeader from "@heuvera/components/ui/AccountHeader";
import PageLayout from "@heuvera/components/ui/PageLayout";
import { motion } from "framer-motion";

export default function PersonInfo() {
  const [userImage, setUserImage] = useState("");
  const [isHelpVisible, setIsHelpVisible] = useState(false);

  function handleImageUpload() {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setUserImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  }
  const toggleHelp = () => {
    setIsHelpVisible(!isHelpVisible);
  };
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

  const avatarVariants = {
    hover: { scale: 1.05, boxShadow: "0px 0px 8px rgba(0,0,0,0.2)" },
  };
  return (
    <PageLayout>
      <AccountHeader
        heading="Admin Info"
        subheading="Update your profile, contact details, and preferences to personalize
              your experience."
      >
        <Button
          variant="default"
          className="rounded-full hover:cursor-pointer bg-[#CB2517] font-normal"
        >
          Delete Account
        </Button>
      </AccountHeader>

      <div className="flex justify-between">
        <form className="flex flex-col justify-between w-full pr-5">
          <div className="pb-5 border-b">
            <Avatar className="w-[75px] h-[75px]">
              <AvatarImage
                className="object-cover"
                src={userImage || "https://github.com/shadcn.png"}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex mt-5 justify-between">
              <div>
                <h2 className="text-[1rem] font-medium">Profile Picture</h2>
                <p className="text-[#898989] text-[14px] ">
                  PNG, JPEG under 15mb{" "}
                </p>
              </div>
              <div className="flex space-x-8">
                <Button
                  variant="default"
                  className="bg-[#7B4F3A] rounded-full hover:bg-[#664130] hover:cursor-pointer"
                  onClick={handleImageUpload}
                >
                  <Upload />
                  Upload Image
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full  hover:cursor-pointer"
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>

          <motion.div
            className="w-full flex flex-row w-full gap-5 border-b pt-5 pb-8"
            variants={itemVariants}
          >
            <Input label="First name" placeholder="John" className="w-full" />
            <Input label="Last name" placeholder="Doe" className="w-full" />
          </motion.div>

          <motion.div
            className="w-full flex flex-col md:flex-row w-full gap-5 pt-5 pb-8 border-b items-center justify-between"
            variants={itemVariants}
          >
            <div className="flex flex-col w-full gap-5">
              <Input
                label="Email"
                placeholder="example@gmail.com"
                className="w-12/12 md:w-12/12 lg:w-12/12 xl:w-9/12 2xl:w-6/12"
              />
              <div className="w-full flex items-center justify-between">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="outline"
                    className="max-w-fit px-3 md:px-4 text-xs md:text-sm lg:text-xs xl:text-sm"
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
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="px-3 md:px-4 text-xs md:text-sm lg:text-xs xl:text-sm"
                  >
                    Change email
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="w-full flex flex-row w-full gap-5 pt-5 pb-8 border-b items-center justify-between"
            variants={itemVariants}
          >
            <div className="flex flex-col w-full gap-5">
              <Input
                label="Phone number"
                placeholder="0000-0000-0000"
                className="w-12/12 md:w-12/12 lg:w-12/12 xl:w-9/12 2xl:w-6/12"
              />
              <div className="w-full flex items-center flex-wrap justify-between gap-5">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="outline"
                    className="max-w-fit text-xs px-3 md:px-4 md:text-sm lg:text-xs xl:text-sm"
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
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="px-3 md:px-4 text-xs md:text-sm lg:text-xs xl:text-sm"
                  >
                    Change phone number
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="w-full flex flex-row w-full gap-5 pt-5 pb-8 border-b items-center justify-between"
            variants={itemVariants}
          >
            <div className="flex flex-col w-full gap-5">
              <Input
                label="Address"
                placeholder="plot 24 room 1254 BC, Abuja"
                className="w-12/12 md:w-12/12 lg:w-12/12 xl:w-9/12 2xl:w-6/12"
              />
              <div className="w-full flex items-center justify-between gap-5">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="outline"
                    className="max-w-fit px-3 md:px-4 text-xs md:text-sm lg:text-xs xl:text-sm"
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
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="px-3 md:px-4 text-xs md:text-sm lg:text-xs xl:text-sm"
                  >
                    Change address
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </form>

        <Help isVisible={isHelpVisible} />
      </div>
    </PageLayout>
  );
}
