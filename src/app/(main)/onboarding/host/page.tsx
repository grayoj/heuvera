'use client'

import React, { useState } from "react";
import { Button } from "@heuvera/components/ui/button";
import { Card, CardContent } from "@heuvera/components/ui/card";
import { Progress } from "@heuvera/components/ui/progress";
import BgImage from "@heuvera/components/onboarding/host/BgImage";
import BusinessInfo from "@heuvera/components/onboarding/host/BusinessInfo";
import PersonalInfo from "@heuvera/components/onboarding/host/PersonalInfo";
import { FormInfo } from "@heuvera/components/onboarding/host/FormData";
import SocialInfo from "@heuvera/components/onboarding/host/SocialInfo";
import ProgressBar from "@heuvera/components/onboarding/host/ProgressBar";

export default function Onboarding() {
  const [step, setStep] = useState(1);
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
    },
    hostRatings: 0.0,
    asBusiness: false,
  });

  const totalSteps = 3;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      // Handle nested properties like socialMediaLinks.instagram
      const [parent, child] = name.split(".");
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
        [name]: value,
      });
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData({
      ...formData,
      asBusiness: checked,
    });
  };

  const handleFileUpload = (name: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Submit the form
      console.log("Form submitted:", formData);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left side - Background Image with Overlay */}
      <BgImage />

      {/* Right side - Multi-step Form */}
      <div className="w-full md:w-1/2 h-full overflow-y-auto bg-white p-8">
        <div className="max-w-md mx-auto">
          {/* Progress Bar */}
          <ProgressBar step={step} totalSteps={totalSteps} />

          <Card>
            <CardContent className="pt-6">
              {/* Step 1: Personal Information */}
              <PersonalInfo step={step} formData={formData} handleInputChange={handleInputChange} />

              {/* Step 2: Business Information */}
              <BusinessInfo step={step} handleInputChange={handleInputChange} handleFileUpload={handleFileUpload} formData={formData} handleSwitchChange={handleSwitchChange} />

              {/* Step 3: Social Media & Additional Info */}
              <SocialInfo step={step} formData={formData} handleInputChange={handleInputChange} />
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            <Button variant="outline" className='text-[#7b4f3a] bg-[#7b4f3a] hover:text-[#6b422e]' onClick={prevStep} disabled={step === 1}>
              Back
            </Button>
            <Button onClick={nextStep}>
              {step === totalSteps ? "Submit" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
