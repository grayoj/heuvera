"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Label } from "@heuvera/components/ui/label";
import { Input } from "@heuvera/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@heuvera/components/ui/select";
import { Checkbox } from "@heuvera/components/ui/checkbox";
import { FormInfo } from "../Formdata";
import {
  incomeRanges,
  interestOptions,
} from "@heuvera/components/data/OnbaordingData";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  },
  exit: {
    opacity: 0,
    x: -100,
    transition: { duration: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

interface PersonalInfoProps {
  stage: number;
  formData: FormInfo;
  handleInputChange: (field: string, value: string | boolean) => void;
  toggleArrayValue: (field: string, value: string) => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  stage,
  formData,
  handleInputChange,
  toggleArrayValue,
}) => {
  const [isClient, setIsClient] = useState(false);
  const [animateEmployment, setAnimateEmployment] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Animate employment section with delay when employment status changes
  useEffect(() => {
    if (formData.isEmployed) {
      setTimeout(() => {
        setAnimateEmployment(true);
      }, 100);
    } else {
      setAnimateEmployment(false);
    }
  }, [formData.isEmployed]);

  // For API integration - prepare the data
  const preparePersonalData = () => {
    return {
      isStudent: formData.isStudent,
      isEmployed: formData.isEmployed,
      occupation: formData.occupation,
      incomeRange: formData.incomeRange,
      interests: formData.interests
    };
  };

  if (stage !== 2) return null;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      className="space-y-6"
    >
      <motion.div className="space-y-4" variants={itemVariants}>
        <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.02 }}>
          <Checkbox
            id="isStudent"
            checked={formData.isStudent}
            onCheckedChange={(checked) =>
              handleInputChange("isStudent", checked === true)
            }
          />
          <Label htmlFor="isStudent" className="font-medium cursor-pointer">
            I am currently a student
          </Label>
        </motion.div>

        <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.02 }}>
          <Checkbox
            id="isEmployed"
            checked={formData.isEmployed}
            onCheckedChange={(checked) =>
              handleInputChange("isEmployed", checked === true)
            }
          />
          <Label htmlFor="isEmployed" className="font-medium cursor-pointer">
            I am currently employed
          </Label>
        </motion.div>
      </motion.div>

      {formData.isEmployed && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4 pl-2 border-l-2 border-gray-200 overflow-hidden"
        >
          <motion.div className="space-y-2">
            <Label htmlFor="occupation" className="text-sm font-medium">
              What is your occupation?
            </Label>
            <Input
              id="occupation"
              placeholder="E.g. Software Engineer, Teacher, etc."
              value={formData.occupation}
              onChange={(e) => handleInputChange("occupation", e.target.value)}
            />
          </motion.div>

          <motion.div className="space-y-2">
            <Label htmlFor="incomeRange" className="text-sm font-medium">
              Income Range
            </Label>
            {isClient && (
              <Select
                value={formData.incomeRange}
                onValueChange={(value) =>
                  handleInputChange("incomeRange", value)
                }
              >
                <SelectTrigger id="incomeRange">
                  <SelectValue placeholder="Select your income range" />
                </SelectTrigger>
                <SelectContent>
                  {incomeRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </motion.div>
        </motion.div>
      )}

      <motion.div className="space-y-3" variants={itemVariants}>
        <Label className="block text-sm font-medium mb-1">
          What are your interests? (Select all that apply)
        </Label>
        <motion.div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {interestOptions.map((interest, index) => (
            <motion.div
              key={interest.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 + 0.2 }}
              whileHover={{ scale: 1.03 }}
              className={`flex items-center space-x-2 bg-transparent border border-[#E3E2D9] dark:border-[#555555] p-2 h-14 rounded-md hover:bg-gray-100 dark:hover:bg-[#444444] transition-colors ${formData.interests.includes(interest.id) ? "border-[#7b4f3a] dark:border-[#7b4f3a] bg-[#7b4f3a10]" : ""
                }`}
            >
              <Checkbox
                id={`interest-${interest.id}`}
                checked={formData.interests.includes(interest.id)}
                onCheckedChange={() =>
                  toggleArrayValue("interests", interest.id)
                }
              />
              <Label
                htmlFor={`interest-${interest.id}`}
                className="cursor-pointer text-sm w-full"
              >
                {interest.label}
              </Label>
            </motion.div>
          ))}
        </motion.div>
        <motion.p
          variants={itemVariants}
          className="text-xs text-[#A7A7A7] mt-1"
        >
          This helps us match you with properties in communities that align with
          your lifestyle.
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default PersonalInfo;