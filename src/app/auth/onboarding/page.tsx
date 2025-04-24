"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@heuvera/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import BgImage from "@heuvera/components/onboarding/BgImage";
import ProgressBar from "@heuvera/components/onboarding/ProgressBar";
import Stage1Header from "@heuvera/components/onboarding/stage1/Stage1Header";
import Stage2Header from "@heuvera/components/onboarding/stage2/Stage2Header";
import Stage3Header from "@heuvera/components/onboarding/stage3/Stage3Header";
import Location from "@heuvera/components/onboarding/stage1/Location";
import PersonalInfo from "@heuvera/components/onboarding/stage2/PersonalInfo";
import Housing from "@heuvera/components/onboarding/stage3/Housing";
import { Button } from "@heuvera/components/ui/button";
import { FormInfo } from "@heuvera/components/onboarding/Formdata";
import ContinueScreen from "@heuvera/components/onboarding/ContineScreen";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

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

const OnboardingPage = () => {
  const [stage, setStage] = useState(1);
  const [progress, setProgress] = useState(33);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [direction, setDirection] = useState(1);

  const [formData, setFormData] = useState<FormInfo>({
    country: "",
    state: "",
    city: "",
    address: "",

    isStudent: false,
    isEmployed: false,
    occupation: "",
    incomeRange: "",
    interests: [],

    preferredRentRange: "",
    preferredPropertyTypes: [],
    moveInDate: null,
    stayDuration: "",
    hasPets: false,
    hasChildren: false,
    smoking: false,
  });

  const [isStageValid, setIsStageValid] = useState({
    1: false,
    2: true,
    3: false,
  });

  useEffect(() => {
    if (stage === 1) {
      setIsStageValid((prev) => ({
        ...prev,
        1: !!(
          formData.country &&
          formData.state &&
          formData.city &&
          formData.address
        ),
      }));
    } else if (stage === 3) {
      setIsStageValid((prev) => ({
        ...prev,
        3: !!(
          formData.preferredRentRange &&
          formData.preferredPropertyTypes.length > 0 &&
          formData.stayDuration
        ),
      }));
    }
  }, [formData, stage]);

  // Handler for updating form data
  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field as keyof FormInfo]: value }));
  };

  // Toggle array values (for interests and property types)
  const toggleArrayValue = (field: string, value: string) => {
    setFormData((prev) => {
      const currentValues =
        prev[field as "interests" | "preferredPropertyTypes"];
      return {
        ...prev,
        [field]: currentValues.includes(value)
          ? currentValues.filter((item) => item !== value)
          : [...currentValues, value],
      };
    });
  };

  useEffect(() => {
    setProgress(Math.round((stage / 4) * 100));
  }, [stage]);

  const handleNextStage = () => {
    if (stage === 1 && !isStageValid[1]) {
      return;
    }

    if (stage === 3 && !isStageValid[3]) {
      return;
    }

    setDirection(1);

    if (stage < 3) {
      setStage((prev) => prev + 1);
    } else {
      setIsSubmitting(true);

      setTimeout(() => {
        setIsSubmitting(false);
        setStage((prev) => prev + 1);
        console.log("Form submitted:", formData);
      }, 1500);
    }
  };

  const handlePrevStage = () => {
    if (stage > 1) {
      setDirection(-1);
      setStage((prev) => prev - 1);
    }
  };

  return (
    <motion.div
      className="flex min-h-screen w-full"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <BgImage />
      <div className="w-full md:w-1/2 bg-[#F8F7F2] dark:bg-[#333333] p-6 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <ProgressBar stage={stage} progress={progress} />

          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <Card className="bg-[#F8F7F2] dark:bg-[#333333] shadow-md border-[#D3D2C9] dark:border-[#444444]">
              <CardHeader>
                <AnimatePresence mode="wait">
                  {stage === 1 && <Stage1Header key="header-1" stage={stage} />}
                  {stage === 2 && <Stage2Header key="header-2" stage={stage} />}
                  {stage === 3 && <Stage3Header key="header-3" stage={stage} />}
                </AnimatePresence>
              </CardHeader>

              <CardContent>
                <AnimatePresence mode="wait" initial={false} custom={direction}>
                  {stage === 1 && (
                    <Location
                      key="location"
                      stage={stage}
                      formData={formData}
                      handleInputChange={handleInputChange}
                    />
                  )}
                  {stage === 2 && (
                    <PersonalInfo
                      key="personal-info"
                      formData={formData}
                      stage={stage}
                      handleInputChange={handleInputChange}
                      toggleArrayValue={toggleArrayValue}
                    />
                  )}
                  {stage === 3 && (
                    <Housing
                      key="housing"
                      formData={formData}
                      stage={stage}
                      handleInputChange={handleInputChange}
                      toggleArrayValue={toggleArrayValue}
                    />
                  )}
                  {stage === 4 && (
                    <motion.div
                      key="continue-screen"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <ContinueScreen />
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>

              <CardFooter className="flex justify-between pt-4">
                {stage < 4 && (
                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button
                      variant="outline"
                      onClick={handlePrevStage}
                      disabled={stage === 1 || stage === 4}
                      className="transition-all duration-300"
                    >
                      <ChevronLeft className="mr-1 h-4 w-4" />
                      Back
                    </Button>
                  </motion.div>
                )}

                {stage < 4 && (
                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    animate={
                      (stage === 1 && !isStageValid[1]) ||
                      (stage === 3 && !isStageValid[3])
                        ? "disabled"
                        : ""
                    }
                  >
                    <Button
                      className="bg-[#7b4f3a] hover:bg-[#7b4f3ae3] transition-all duration-300"
                      onClick={handleNextStage}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting
                        </>
                      ) : (
                        <>
                          {stage < 3 ? "Next" : "Submit"}
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                )}

                {/* {stage === 4 && (
                                    <motion.div
                                        variants={buttonVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <Button
                                            className="bg-[#7b4f3a] hover:bg-[#7b4f3ae3] transition-all duration-300"
                                            onClick={() => window.location.href = "/dashboard"}
                                        >
                                            Go to Dashboard
                                            <ChevronRight className="ml-1 h-4 w-4" />
                                        </Button>
                                    </motion.div>
                                )} */}
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default OnboardingPage;
