"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@heuvera/components/ui/select";
import { FormInfo } from "../Formdata";
import { Label } from "@heuvera/components/ui/label";
import Input from "@heuvera/components/ui/LabelInput";

// Animation variants
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

export default function Location({
  stage,
  handleInputChange,
  formData,
}: {
  stage: number;
  handleInputChange: (field: string, value: string) => void;
  formData: FormInfo;
}) {
  const [validation, setValidation] = useState({
    country: false,
    state: false,
    city: false,
    address: false,
  });

  useEffect(() => {
    if (stage === 1) {
      setValidation({
        country: !!formData.country,
        state: !!formData.state,
        city: !!formData.city,
        address: !!formData.address,
      });
    }
  }, [formData, stage]);

  const prepareLocationData = () => {
    return {
      country: formData.country,
      state: formData.state,
      city: formData.city,
      address: formData.address,
    };
  };

  // Only render if this is the current stage
  if (stage !== 1) return null;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      className="space-y-4"
    >
      <motion.div className="space-y-2" variants={itemVariants}>
        <Label htmlFor="country">
          Country <span className="text-[#FF6B6B]">*</span>
        </Label>
        <Select
          value={formData.country}
          onValueChange={(value) => handleInputChange("country", value)}
        >
          <SelectTrigger
            id="country"
            className={!validation.country && formData.country === "" ? "" : ""}
          >
            <SelectValue placeholder="Select your country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="usa">United States</SelectItem>
            <SelectItem value="canada">Canada</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
            <SelectItem value="australia">Australia</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        {!validation.country && formData.country === "" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-[#FF6B6B] mt-1"
          >
            Country is required
          </motion.p>
        )}
      </motion.div>

      <motion.div className="space-y-2" variants={itemVariants}>
        <Label htmlFor="state">
          State/Province <span className="text-[#FF6B6B]">*</span>
        </Label>
        <Input
          placeholder="Enter your state or province"
          value={formData.state}
          onChange={(e) => handleInputChange("state", e.target.value)}
          className={!validation.state && formData.state === "" ? "" : ""}
        />
        {!validation.state && formData.state === "" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-[#FF6B6B] mt-1"
          >
            State/Province is required
          </motion.p>
        )}
      </motion.div>

      <motion.div className="space-y-2" variants={itemVariants}>
        <Label htmlFor="city">
          City <span className="text-[#FF6B6B]">*</span>
        </Label>
        <Input
          placeholder="Enter your city"
          value={formData.city}
          onChange={(e) => handleInputChange("city", e.target.value)}
          className={!validation.city && formData.city === "" ? "" : ""}
        />
        {!validation.city && formData.city === "" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-[#FF6B6B] mt-1"
          >
            City is required
          </motion.p>
        )}
      </motion.div>

      <motion.div className="space-y-2" variants={itemVariants}>
        <Label htmlFor="address">
          Address <span className="text-[#FF6B6B]">*</span>
        </Label>
        <Input
          placeholder="Enter your address"
          value={formData.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
          className={!validation.address && formData.address === "" ? "" : ""}
        />
        {!validation.address && formData.address === "" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-[#FF6B6B] mt-1"
          >
            Address is required
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
}
