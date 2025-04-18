"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@heuvera/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@heuvera/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import BusinessInfo from "@heuvera/components/onboarding/host/BusinessInfo";
import PersonalInfo from "@heuvera/components/onboarding/host/PersonalInfo";
import { FormInfo } from "@heuvera/components/onboarding/host/FormData";
import SocialInfo from "@heuvera/components/onboarding/host/SocialInfo";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import ProgressBar from "@heuvera/components/onboarding/ProgressBar";
import BgImage from "@heuvera/components/onboarding/BgImage";
import ContinueScreen from "@heuvera/components/onboarding/host/ContinueScreen";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.95,
  },
  disabled: {
    opacity: 0.5,
  },
};

const contentVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  }),
};

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState<FormInfo>({
    phoneNumber: "",
    bio: "",
    governmentId: "",
    idVerificationStatus: "pending", // pending, verified, rejected
    businessName: "",
    businessLogo: "",
    businessRegNumber: "",
    businessAddress: "",
    socialMediaLinks: {
      instagram: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      tiktok: "",
    },
    hostRatings: 0.0,
    asBusiness: false,
  });

  const [isStageValid, setIsStageValid] = useState({
    1: false,
    2: true,
    3: false,
  });

  const totalSteps = 3;

  // Update progress bar when step changes
  useEffect(() => {
    setProgress(Math.round((step / (totalSteps + 1)) * 100));
  }, [step, totalSteps]);

  // Check validation for steps
  useEffect(() => {
    if (step === 1) {
      setIsStageValid((prev) => ({
        ...prev,
        1: !!(formData.phoneNumber && formData.bio),
      }));
    } else if (step === 3) {
      setIsStageValid((prev) => ({
        ...prev,
        3: !!(
          formData.socialMediaLinks.instagram ||
          formData.socialMediaLinks.twitter ||
          formData.socialMediaLinks.facebook ||
          formData.socialMediaLinks.linkedin
        ),
      }));
    }
  }, [formData, step]);

  const handleInputChange = (field: string, value: string | boolean) => {
    if (field.includes(".")) {
      // Handle nested properties like socialMediaLinks.instagram
      const [parent, child] = field.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...(formData[parent as keyof FormInfo] as Record<string, any>),
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [field]: value,
      });
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData({
      ...formData,
      asBusiness: checked,
    });
  };

  const handleFileUpload =
    (name: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        // In a real app, you would upload this file to a server
        // For now, we'll just store the file name
        setFormData({
          ...formData,
          [name]: (e.target as HTMLInputElement).files![0].name,
        });
      }
    };

  const nextStep = () => {
    if (step === 1 && !isStageValid[1]) {
      return;
    }

    if (step === 3 && !isStageValid[3]) {
      return;
    }

    setDirection(1);

    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Submit the form
      setIsSubmitting(true);

      setTimeout(() => {
        setIsSubmitting(false);
        setStep(step + 1); // Move to success/completion screen
        console.log("Form submitted:", formData);
      }, 1500);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  return (
    <motion.div
      className="flex h-screen w-full"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {/* Left side - Background Image with Overlay */}
      <BgImage />

      {/* Right side - Multi-step Form */}
      <div className="w-full md:w-1/2 h-full overflow-y-auto bg-[#F8F7F2] dark:bg-[#333333] p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          {/* Progress Bar */}
          <ProgressBar stage={step} progress={progress} />

          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <Card className="bg-[#F8F7F2] dark:bg-[#333333] shadow-md border-[#E3E2D9] dark:border-[#444444]">
              <CardContent>
                <AnimatePresence mode="wait" initial={false} custom={direction}>
                  {step === 1 && (
                    <motion.div
                      key="personal-info"
                      custom={direction}
                      variants={contentVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                    >
                      <PersonalInfo
                        step={step}
                        formData={formData}
                        handleInputChange={handleInputChange}
                      />
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="business-info"
                      custom={direction}
                      variants={contentVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                    >
                      <BusinessInfo
                        step={step}
                        handleInputChange={handleInputChange}
                        handleFileUpload={handleFileUpload}
                        formData={formData}
                        handleSwitchChange={handleSwitchChange}
                      />
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="social-info"
                      custom={direction}
                      variants={contentVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                    >
                      <SocialInfo
                        step={step}
                        formData={formData}
                        handleInputChange={handleInputChange}
                      />
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div
                      key="success-screen"
                      custom={direction}
                      variants={contentVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                    >
                      <ContinueScreen />
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>

              <CardFooter className="flex justify-between pt-4">
                {step < 4 && (
                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      disabled={step === 1}
                      className="transition-all duration-300"
                    >
                      <ChevronLeft className="mr-1 h-4 w-4" />
                      Back
                    </Button>
                  </motion.div>
                )}

                {step < 4 && (
                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    animate={
                      (step === 1 && !isStageValid[1]) ||
                      (step === 3 && !isStageValid[3])
                        ? "disabled"
                        : ""
                    }
                  >
                    <Button
                      className="bg-[#7b4f3a] hover:bg-[#7b4f3ae3] transition-all duration-300"
                      onClick={nextStep}
                      disabled={
                        isSubmitting ||
                        (step === 1 && !isStageValid[1]) ||
                        (step === 3 && !isStageValid[3])
                      }
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting
                        </>
                      ) : (
                        <>
                          {step < totalSteps ? "Next" : "Submit"}
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
