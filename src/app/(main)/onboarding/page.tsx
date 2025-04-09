"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@heuvera/components/ui/card";
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

const OnboardingPage = () => {
  // State for tracking current stage and form completion
  const [stage, setStage] = useState(1);
  const [progress, setProgress] = useState(0);

  // State for form data
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

  // Calculate progress based on current stage
  const calculateProgress = () => {
    return Math.round((stage / 3) * 100);
  };

  // Next stage handler
  const handleNextStage = () => {
    if (stage < 3) {
      setStage((prev) => prev + 1);
      setProgress(calculateProgress()); // Update progress when moving to next stage
    } else {
      // Form submission logic would go here
      setStage((prev) => prev + 1);
      setProgress(calculateProgress()); // Update progress when moving to next stage
      console.log("Form submitted:", formData);
    }
  };

  // Previous stage handler
  const handlePrevStage = () => {
    if (stage > 1) {
      setStage((prev) => prev - 1);
    }
  };
  console.log(stage);
  return (
    <div className="flex min-h-screen w-full ">
      {/* Left section with background image */}
      <BgImage />

      {/* Right section with multi-step form */}
      <div className="w-full md:w-1/2 bg-white p-6 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <ProgressBar stage={stage} progress={progress} />

          <Card>
            <CardHeader>
              <Stage1Header stage={stage} />
              <Stage2Header stage={stage} />
              <Stage3Header stage={stage} />
            </CardHeader>

            {stage !== 4 ? (
              <CardContent>
                {/* Stage 1: Location */}
                <Location
                  stage={stage}
                  formData={formData}
                  handleInputChange={handleInputChange}
                />

                {/* Stage 2: Personal Information */}
                <PersonalInfo
                  formData={formData}
                  stage={stage}
                  handleInputChange={handleInputChange}
                  toggleArrayValue={toggleArrayValue}
                />

                {/* Stage 3: Housing Preferences */}
                <Housing
                  formData={formData}
                  stage={stage}
                  handleInputChange={handleInputChange}
                  toggleArrayValue={toggleArrayValue}
                />
              </CardContent>
            ) : (
              <CardContent>
                <ContinueScreen />
              </CardContent>
            )}

            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevStage}
                disabled={stage === 1}
              >
                Back
              </Button>
              <Button
                className="bg-[#7b4f3a] hover:bg-[#7b4f3ae3]"
                onClick={handleNextStage}
              >
                {stage < 3 ? "Next" : stage === 3 ? "Submit" : "Finish"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
