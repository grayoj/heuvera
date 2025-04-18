import { Clock } from "lucide-react";
import { Button } from "../ui/button";
import Input from "../ui/LabelInput";
import { motion } from "framer-motion";

export default function BankPayment() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.form
      className="flex flex-col space-y-4 h-full w-full max-w-[28rem]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Input label="Account Holder Name" placeholder="John Smith" />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Input label="Bank Name" placeholder="Enter your bank name" />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Input label="Account Number" placeholder="XXXXXXXX" />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Input label="Routing Number" placeholder="XXXXXXXXX" />
      </motion.div>

      <motion.div
        className="flex items-center space-x-2 p-3 bg-[#f9f5f3] dark:bg-[#444444] rounded-lg text-[14px] text-gray-600 dark:text-[#A7A7A7] mt-2"
        variants={itemVariants}
        whileHover={{ backgroundColor: "#f2ebe7" }}
      >
        <Clock size={16} className="text-[#7B4F3A] dark:text-[#8B5F4D]" />
        <span>Bank transfers typically take 2-3 business days to process</span>
      </motion.div>

      <motion.div variants={itemVariants}>
        <motion.button
          type="button"
          className="w-full bg-[#7B4F3A] dark:bg-[#8B5F4D] py-3 px-6 text-white rounded-lg hover:bg-[#664130] hover:cursor-pointer mt-4"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Save Payment Method
        </motion.button>
      </motion.div>
    </motion.form>
  );
}
