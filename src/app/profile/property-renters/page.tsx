"use client";

import Help from "@heuvera/components/ui/Help";
import { useState } from "react";
import AccountHeader from "@heuvera/components/ui/AccountHeader";
import PersonalForm from "@heuvera/components/personal-info/PersonalForm";

export default function PersonInfo() {
  const [userImage, setUserImage] = useState("");

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
  return (
    <>
      <AccountHeader
        heading="Personal Info"
        subheading="Update your profile, contact details, and preferences to personalize
          your experience."
      />

      <div className="flex justify-between">
        <PersonalForm
          userImage={userImage}
          handleImageUpload={handleImageUpload}
        />

        <Help />
      </div>
    </>
  );
}
