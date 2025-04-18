import { FormInfo } from "./FormData";
import StepHeading from "./StepHeading";
import Textarea from "@heuvera/components/ui/Textarea";
import Input from "@heuvera/components/ui/LabelInput";
import { CardDescription, CardTitle } from "@heuvera/components/ui/card";
import { motion } from "framer-motion";
import { Label } from "@heuvera/components/ui/label";
import { useEffect, useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    x: -100,
    transition: { duration: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function PersonalInfo({
  step,
  handleInputChange,
  formData,
}: {
  step: number;
  handleInputChange: (field: string, value: string) => void;
  formData: FormInfo;
}) {
  const [validation, setValidation] = useState({
    phoneNumber: false,
    bio: false,
    governmentId: false,
  });

  useEffect(() => {
    if (step === 2) {
      setValidation({
        phoneNumber: !!formData.phoneNumber,
        bio: !!formData.bio,
        governmentId: !!formData.governmentId,
      });
    }
  }, [formData, step]);

  const preparePersonalInfoData = () => {
    return {
      phoneNumber: formData.phoneNumber,
      bio: formData.bio,
      governmentId: formData.governmentId,
    };
  };

  return (
    <div>
      {step === 1 && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
          className="space-y-4"
        >
          <div>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300 mt-1">
              Help us get to know you better to personalize your hosting
              experience
            </CardDescription>
          </div>

          <motion.div className="space-y-2" variants={itemVariants}>
            <Label htmlFor="phoneNumber">
              Phone Number <span className="text-[#FF6B6B]">*</span>
            </Label>
            <Input
              placeholder="0000 - 0000 - 0000"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              className={
                !validation.phoneNumber && formData.phoneNumber === "" ? "" : ""
              }
            />
            {!validation.phoneNumber && formData.phoneNumber === "" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-[#FF6B6B] mt-1"
              >
                Phone Number is required
              </motion.p>
            )}
          </motion.div>

          <motion.div className="space-y-2" variants={itemVariants}>
            <Label htmlFor="bio">
              About You <span className="text-[#FF6B6B]">*</span>
            </Label>
            <Textarea
              label=""
              id="bio"
              placeholder="Share a brief introduction about yourself, your interests, and what makes you a great host..."
              value={formData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              className={!validation.bio && formData.bio === "" ? "" : ""}
            />
            {!validation.bio && formData.bio === "" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-[#FF6B6B] mt-1"
              >
                Bio information is recommended
              </motion.p>
            )}
          </motion.div>

          <motion.div className="space-y-2" variants={itemVariants}>
            <Label htmlFor="governmentId">
              Government ID Number<span className="text-[#FF6B6B]">*</span>
            </Label>
            <Input
              placeholder="NIN"
              value={formData.governmentId}
              onChange={(e) =>
                handleInputChange("governmentId", e.target.value)
              }
              className={
                !validation.governmentId && formData.governmentId === ""
                  ? ""
                  : ""
              }
            />
            {!validation.governmentId && formData.governmentId === "" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-[#FF6B6B] mt-1"
              >
                Government ID may be required for verification
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
