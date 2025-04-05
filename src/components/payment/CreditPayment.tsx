import { Lock } from "lucide-react";
import { Button } from "../ui/button";
import Input from "../ui/Input";
import { motion } from "framer-motion";

export default function CreditPayment() {
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
      className="flex flex-col space-y-4 h-full w-full max-w-md"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="flex space-x-4" variants={itemVariants}>
        <div className="flex-grow">
          <Input label="Cardholder Name" placeholder="John Smith" />
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Input label="Card Number" placeholder="XXXX XXXX XXXX XXXX" />
      </motion.div>

      <motion.div className="flex space-x-4" variants={itemVariants}>
        <div className="flex-1">
          <Input label="Expiry Date" placeholder="MM/YY" />
        </div>
        <div className="flex-1">
          <Input
            label="CVC"
            placeholder="XXX"
            // type="password"
          />
        </div>
      </motion.div>

      <motion.div
        className="flex items-center space-x-2 mt-2"
        variants={itemVariants}
        whileHover={{ x: 5 }}
      >
        <input
          type="checkbox"
          id="saveCard"
          className="rounded text-[#7B4F3A]"
        />
        <label
          htmlFor="saveCard"
          className="text-[14px] text-gray-700 dark:text-[#A7A7A7]"
        >
          Save card for future payments
        </label>
      </motion.div>

      <motion.div
        className="flex items-center space-x-2 p-3 bg-[#f9f5f3] dark:bg-[#444444] rounded-lg text-[14px] text-gray-600 dark:text-[#A7A7A7] mt-2"
        variants={itemVariants}
        whileHover={{ backgroundColor: "#f2ebe7" }}
      >
        <Lock size={16} className="text-[#7B4F3A] dark:text-[#8B5F4D]" />
        <span>
          Your payment information is secured with end-to-end encryption
        </span>
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
