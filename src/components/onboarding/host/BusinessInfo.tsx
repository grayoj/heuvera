import { FormInfo } from "./FormData";
import StepHeading from "./StepHeading";
import Textarea from "@heuvera/components/ui/Textarea";
import Input from "@heuvera/components/ui/Input";
import { CardDescription, CardTitle } from "@heuvera/components/ui/card";
import { motion } from "framer-motion";
import { Label } from "@heuvera/components/ui/label";
import { useEffect, useState } from "react";
import { Switch } from "@heuvera/components/ui/switch";

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

export default function BusinessInfo({
  step,
  handleInputChange,
  handleFileUpload,
  formData,
  handleSwitchChange,
}: {
  step: number;
  handleInputChange: (field: string, value: string) => void;
  handleFileUpload: (
    name: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  formData: FormInfo;
  handleSwitchChange: (checked: boolean) => void;
}) {
  const [validation, setValidation] = useState({
    businessName: false,
    businessRegNumber: false,
    businessAddress: false,
  });

  useEffect(() => {
    if (step === 2 && formData.asBusiness) {
      setValidation({
        businessName: !!formData.businessName,
        businessRegNumber: !!formData.businessRegNumber,
        businessAddress: !!formData.businessAddress,
      });
    }
  }, [formData, step]);

  return (
    <div>
      {step === 2 && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
          className="space-y-6"
        >
          <div>
            <CardTitle>Business Information</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300 mt-1">
              Register as a business if you're hosting on behalf of a company
            </CardDescription>
          </div>

          <motion.div
            className="flex items-center space-x-2 mb-6"
            variants={itemVariants}
          >
            <Switch
              id="asBusiness"
              checked={formData.asBusiness}
              onCheckedChange={handleSwitchChange}
            />
            <Label htmlFor="asBusiness">Register as a business</Label>
          </motion.div>

          {formData.asBusiness && (
            <div className="space-y-4">
              <motion.div className="space-y-2" variants={itemVariants}>
                <Label htmlFor="businessName">
                  Business Name <span className="text-[#FF6B6B]">*</span>
                </Label>
                <Input
                  id="businessName"
                  placeholder="Your Business Name"
                  value={formData.businessName}
                  onChange={(e) =>
                    handleInputChange("businessName", e.target.value)
                  }
                  className={
                    !validation.businessName && formData.businessName === ""
                      ? ""
                      : ""
                  }
                />
                {!validation.businessName && formData.businessName === "" && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-[#FF6B6B] mt-1"
                  >
                    Business Name is required
                  </motion.p>
                )}
              </motion.div>

              <motion.div className="space-y-2" variants={itemVariants}>
                <Label htmlFor="businessLogo">Business Logo</Label>
                <div className="mt-1">
                  {formData.businessLogo ? (
                    <div className="flex flex-col items-center justify-center p-4 border border-dashed rounded-md">
                      <div className="text-center">
                        <span className="font-bold">Chosen File:</span>{" "}
                        {formData.businessLogo}
                      </div>
                      <Input
                        type="file"
                        id="businessLogo"
                        className="mt-2 w-64 mx-auto"
                        onChange={(e) => handleFileUpload("businessLogo", e)}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center p-4 border border-dashed rounded-md">
                      <Input
                        type="file"
                        id="businessLogo"
                        typeClassname="flex items-center max-w-fit"
                        onChange={(e) => handleFileUpload("businessLogo", e)}
                      />
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div className="space-y-2" variants={itemVariants}>
                <Label htmlFor="businessRegNumber">
                  Business Registration Number{" "}
                  <span className="text-[#FF6B6B]">*</span>
                </Label>
                <Input
                  id="businessRegNumber"
                  placeholder="Registration Number"
                  value={formData.businessRegNumber}
                  onChange={(e) =>
                    handleInputChange("businessRegNumber", e.target.value)
                  }
                  className={
                    !validation.businessRegNumber &&
                    formData.businessRegNumber === ""
                      ? ""
                      : ""
                  }
                />
                {!validation.businessRegNumber &&
                  formData.businessRegNumber === "" && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-[#FF6B6B] mt-1"
                    >
                      Business Registration Number is required
                    </motion.p>
                  )}
              </motion.div>

              <motion.div className="space-y-2" variants={itemVariants}>
                <Label htmlFor="businessAddress">
                  Business Address <span className="text-[#FF6B6B]">*</span>
                </Label>
                <Textarea
                  id="businessAddress"
                  label=""
                  placeholder="Full Business Address"
                  value={formData.businessAddress}
                  onChange={(e) =>
                    handleInputChange("businessAddress", e.target.value)
                  }
                  className={
                    !validation.businessAddress &&
                    formData.businessAddress === ""
                      ? ""
                      : ""
                  }
                />
                {!validation.businessAddress &&
                  formData.businessAddress === "" && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-[#FF6B6B] mt-1"
                    >
                      Business Address is required
                    </motion.p>
                  )}
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
