import { FormInfo } from "./FormData";
import Input from "@heuvera/components/ui/Input";
import { Label } from "@heuvera/components/ui/label";
import { CardDescription, CardTitle } from "@heuvera/components/ui/card";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { BsTiktok } from "react-icons/bs";

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

export default function SocialInfo({
  step,
  handleInputChange,
  formData,
}: {
  step: number;
  handleInputChange: (field: string, value: string) => void;
  formData: FormInfo;
}) {
  const [socialIcons, setSocialIcons] = useState({
    instagram: <Instagram />,
    twitter: <Twitter />,
    facebook: <Facebook />,
    linkedin: <Linkedin />,
    tiktok: <BsTiktok />,
  });

  return (
    <div>
      {step === 3 && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
          className="space-y-6"
        >
          <div>
            <CardTitle>Social Media Profiles</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300 mt-1">
              Connect your social media accounts to enhance your profile
              visibility
            </CardDescription>
          </div>

          <div className="space-y-4">
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="instagram" className="flex items-center">
                {socialIcons.instagram} <span>Instagram</span>
              </Label>
              <Input
                id="instagram"
                placeholder="@username"
                value={formData.socialMediaLinks?.instagram || ""}
                onChange={(e: any) =>
                  handleInputChange(
                    "socialMediaLinks.instagram",
                    e.target.value,
                  )
                }
                className="relative"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Connect with visual content enthusiasts
              </p>
            </motion.div>

            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="twitter" className="flex items-center">
                {socialIcons.twitter} <span>Twitter</span>
              </Label>
              <Input
                id="twitter"
                placeholder="@username"
                value={formData.socialMediaLinks?.twitter || ""}
                onChange={(e: any) =>
                  handleInputChange("socialMediaLinks.twitter", e.target.value)
                }
                className="relative"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Share quick updates and engage with your audience
              </p>
            </motion.div>

            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="facebook" className="flex items-center">
                {socialIcons.facebook} <span>Facebook</span>
              </Label>
              <Input
                id="facebook"
                placeholder="Profile URL or username"
                value={formData.socialMediaLinks?.facebook || ""}
                onChange={(e: any) =>
                  handleInputChange("socialMediaLinks.facebook", e.target.value)
                }
                className="relative"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Build community and share detailed content
              </p>
            </motion.div>

            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="linkedin" className="flex items-center">
                {socialIcons.linkedin} <span>LinkedIn</span>
              </Label>
              <Input
                id="linkedin"
                placeholder="Profile URL or username"
                value={formData.socialMediaLinks?.linkedin || ""}
                onChange={(e: any) =>
                  handleInputChange("socialMediaLinks.linkedin", e.target.value)
                }
                className="relative"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Connect with professional networks and businesses
              </p>
            </motion.div>

            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="tiktok" className="flex items-center">
                {socialIcons.tiktok} <span>TikTok</span>
              </Label>
              <Input
                id="tiktok"
                placeholder="@username"
                value={formData.socialMediaLinks?.tiktok || ""}
                onChange={(e: any) =>
                  handleInputChange("socialMediaLinks.tiktok", e.target.value)
                }
                className="relative"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Share short-form video content with a wider audience
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
