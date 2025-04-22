import { AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

export default function PaymentSecurity() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };


  return (
    <motion.div
      className="w-72 bg-[#f9f5f3] dark:bg-[#444444] p-6 rounded-lg h-fit"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h3
        className="font-medium text-lg mb-4 flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AlertCircle
            size={18}
            className="mr-2 text-[#7B4F3A] dark:text-[#8B5F4D]"
          />
        </motion.div>
        Payment Security
      </motion.h3>
      <ul className="space-y-3 text-sm text-gray-700 dark:text-[#A7A7A7]">
        {[
          "All transactions are secured with 256-bit encryption",
          "We never store your complete card details on our servers",
          "24/7 fraud monitoring to protect your account",
          "Compatible with all major payment networks",
        ].map((text, index) => (
          <motion.li
            key={index}
            className="flex items-start"
            variants={itemVariants}
          >
            <motion.div
              className="h-6 w-6 flex-shrink-0 rounded-full bg-[#7B4F3A] dark:bg-[#8B5F4D] text-white flex items-center justify-center text-base leading-none mr-2"
              whileHover={{ scale: 1.1 }}
            >
              ✓
            </motion.div>
            <span>{text}</span>
          </motion.li>
        ))}
      </ul>
      <motion.div
        className="border-t mt-4 pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <p className="text-sm text-gray-600 dark:text-[#A7A7A7]">
          Need help with payments?
        </p>
        <Button
          variant="outline"
          className="mt-2 w-full hover:bg-[#f9f5f3] hover:bg-[#444444]"
        >
          Contact Support
        </Button>
      </motion.div>
    </motion.div>
  );
}
