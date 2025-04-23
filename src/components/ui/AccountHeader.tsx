import { motion } from "framer-motion";
import { LucideHelpCircle } from "lucide-react";
import { Button } from "./button";
import { ButtonAnimation } from "../animations/anim";

export default function AccountHeader({
  heading,
  subheading,
  children,
  className,
  toggleHelp,
  isHelpVisible
}: {
  heading: string;
  subheading: string;
  children?: React.ReactNode;
  className?: string;
  toggleHelp: () => void;
  isHelpVisible: boolean;
}) {
  return (
    <div className="hidden md:block">
      <div
        className={`flex justify-between border-b items-center py-4 ${className}`}
      >
        <div className="">
          <h2 className="text-xl md:text-xl lg:text-base xl:text-xl 2xl:text-xl font-medium-">
            {heading}
          </h2>
          <p className="text-[#898989] dark:text-[#666666] font-normal md:text-sm lg:text-xs xl:text-base 2xl:text-base">
            {subheading}
          </p>
        </div>
        <div className="flex gap-4">
          {children}
          <motion.div variants={ButtonAnimation}>
            <Button
              variant="outline"
              className="bg-[#F8F7F2] dark:bg-[#333333] hover:cursor-pointer font-serif"
              onClick={toggleHelp}
            >
              <LucideHelpCircle />
              {isHelpVisible ? "Close Help" : "Help"}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
