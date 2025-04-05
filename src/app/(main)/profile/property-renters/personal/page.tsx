"use client";

import Help from "@heuvera/components/ui/Help";
import { useState } from "react";
import AccountHeader from "@heuvera/components/ui/AccountHeader";
import PersonalForm from "@heuvera/components/personal-info/PersonalForm";
import ProfileBanner from "@heuvera/components/ui/ProfileBanner";
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

  return (
    <>
      <ProfileBanner toggleHelp={toggleHelp} isHelpVisible={isHelpVisible} />
      <div className="flex flex-col gap-5">
        <AccountHeader
          heading="Personal Info"
          subheading="Update your profile, contact details, and preferences to personalize
          your experience."
        />
        <div className="flex justify-between flex-col md:flex-col lg:flex-row relative">
          <motion.div
            className="flex-1"
            animate={{
              width: isHelpVisible ? "75%" : "100%",
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <PersonalForm
              userImage={userImage}
              handleImageUpload={handleImageUpload}
            />
          </motion.div>
          <Help isVisible={isHelpVisible} />
        </div>
      </div>
    </>
  );
}
