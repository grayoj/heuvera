"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  propertyTypes,
  rentRanges,
  stayDurations,
} from "@heuvera/components/data/OnbaordingData";
import { Badge } from "@heuvera/components/ui/badge";
import { Checkbox } from "@heuvera/components/ui/checkbox";
import { Label } from "@heuvera/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@heuvera/components/ui/select";
import { FormInfo } from "../Formdata";

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

const badgeVariants = {
  unselected: { scale: 1 },
  selected: { scale: 1.05, transition: { type: "spring", stiffness: 300 } },
};

interface HousingProps {
  stage: number;
  formData: FormInfo;
  handleInputChange: (field: string, value: boolean | string) => void;
  toggleArrayValue: (field: string, value: string) => void;
}

export default function Housing({
  stage,
  formData,
  handleInputChange,
  toggleArrayValue,
}: HousingProps) {
  // Validation state
  const [errors, setErrors] = useState({
    preferredRentRange: false,
    preferredPropertyTypes: false,
    stayDuration: false,
  });

  // Check for required fields
  useEffect(() => {
    if (stage === 3) {
      setErrors({
        preferredRentRange: !formData.preferredRentRange,
        preferredPropertyTypes: formData.preferredPropertyTypes.length === 0,
        stayDuration: !formData.stayDuration,
      });
    }
  }, [formData, stage]);

  // For API integration - prepare the data
  const prepareHousingData = () => {
    return {
      preferredRentRange: formData.preferredRentRange,
      preferredPropertyTypes: formData.preferredPropertyTypes,
      stayDuration: formData.stayDuration,
      hasPets: formData.hasPets,
      hasChildren: formData.hasChildren,
      smoking: formData.smoking,
    };
  };

  if (stage !== 3) return null;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      className="space-y-4"
    >
      <motion.div className="space-y-2" variants={itemVariants}>
        <Label htmlFor="preferredRentRange">
          Preferred Rent Range <span className="text-[#FF6B6B]">*</span>
        </Label>
        <Select
          value={formData.preferredRentRange}
          onValueChange={(value) =>
            handleInputChange("preferredRentRange", value)
          }
        >
          <SelectTrigger className={errors.preferredRentRange ? "" : ""}>
            <SelectValue placeholder="Select your preferred monthly rent" />
          </SelectTrigger>
          <SelectContent>
            {rentRanges.map((range) => (
              <SelectItem key={range} value={range}>
                {range}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.preferredRentRange && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-[#FF6B6B] mt-1"
          >
            Please select your preferred rent range
          </motion.p>
        )}
      </motion.div>

      <motion.div className="space-y-2" variants={itemVariants}>
        <Label>
          Preferred Property Types (Select all that apply){" "}
          <span className="text-[#FF6B6B]">*</span>
        </Label>
        <motion.div className="flex flex-wrap mt-2 gap-2">
          {propertyTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: formData.preferredPropertyTypes.includes(type.id)
                  ? 1.05
                  : 1,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Badge
                variant={
                  formData.preferredPropertyTypes.includes(type.id)
                    ? "default"
                    : "outline"
                }
                className="cursor-pointer mr-2 mb-2"
                onClick={() =>
                  toggleArrayValue("preferredPropertyTypes", type.id)
                }
              >
                {type.label}
              </Badge>
            </motion.div>
          ))}
        </motion.div>
        {errors.preferredPropertyTypes && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-[#FF6B6B] mt-1"
          >
            Please select at least one property type
          </motion.p>
        )}
      </motion.div>

      <motion.div className="space-y-2" variants={itemVariants}>
        <Label htmlFor="stayDuration">
          Stay Duration <span className="text-[#FF6B6B]">*</span>
        </Label>
        <Select
          value={formData.stayDuration}
          onValueChange={(value) => handleInputChange("stayDuration", value)}
        >
          <SelectTrigger className={errors.stayDuration ? "" : ""}>
            <SelectValue placeholder="How long do you plan to stay?" />
          </SelectTrigger>
          <SelectContent>
            {stayDurations.map((duration) => (
              <SelectItem key={duration} value={duration}>
                {duration}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.stayDuration && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-[#FF6B6B] mt-1"
          >
            Please select your preferred stay duration
          </motion.p>
        )}
      </motion.div>

      <motion.div className="space-y-4 pt-2" variants={containerVariants}>
        <motion.div
          className="flex items-center space-x-2"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <Checkbox
            id="hasPets"
            checked={formData.hasPets}
            onCheckedChange={(checked) =>
              handleInputChange("hasPets", checked === true)
            }
          />
          <Label htmlFor="hasPets">Do you have pets?</Label>
        </motion.div>

        <motion.div
          className="flex items-center space-x-2"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <Checkbox
            id="hasChildren"
            checked={formData.hasChildren}
            onCheckedChange={(checked) =>
              handleInputChange("hasChildren", checked === true)
            }
          />
          <Label htmlFor="hasChildren">Do you have children?</Label>
        </motion.div>

        <motion.div
          className="flex items-center space-x-2"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <Checkbox
            id="smoking"
            checked={formData.smoking}
            onCheckedChange={(checked) =>
              handleInputChange("smoking", checked === true)
            }
          />
          <Label htmlFor="smoking">Do you smoke?</Label>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
