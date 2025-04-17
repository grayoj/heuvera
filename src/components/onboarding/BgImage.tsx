import Image from "next/image";
import { motion } from "framer-motion";
import { texts } from "./data";

export default function BgImage() {
  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
        duration: 0.8
      }
    }
  };

  // Animation variants for text elements
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Animation for the image
  const imageVariants = {
    hidden: { scale: 1.2, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 1.2 }
    }
  };

  return (
    <div className="relative max-h-screen hidden md:block md:w-1/2 bg-cover bg-center overflow-hidden">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={imageVariants}
      >
        <Image
          width={500}
          height={500}
          alt="background image"
          src="/imgbackground.png"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[#7b4f3ac4] z-10"></div>
      <motion.div 
        className="absolute inset-0 z-20 flex items-center flex-col justify-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {texts.map(({ heading, subheading }, index) => (
          <motion.div
            key={index}
            className="flex flex-col text-white p-4 text-lg max-w-xl"
            variants={itemVariants}
          >
            <motion.h1 
              className={`${index === 0 && " mb-4"} font-bold`}
              variants={itemVariants}
            >
              {heading}
            </motion.h1>
            <motion.p 
              className="font-thin"
              variants={itemVariants}
            >
              {subheading}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}