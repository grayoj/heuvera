"use client";

import { CircleCheck, Star } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import { GiPartyPopper } from "react-icons/gi";
// Confetti is commented out in the original, but we can use our own animation

export default function ContinueScreen() {
  const checkmarkControls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);
  const [showElements, setShowElements] = useState(false);
  const [animateBackground, setAnimateBackground] = useState(false);

  useEffect(() => {
    const sequence = async () => {
      await checkmarkControls.start({ scale: 0, opacity: 0 });
      await checkmarkControls.start({
        scale: 1.2,
        opacity: 1,
        transition: { duration: 0.5, ease: "easeInOut" },
      });
      await checkmarkControls.start({
        scale: 1,
        transition: { type: "spring", stiffness: 150, damping: 10 },
      });
      setIsVisible(true);
      
      // Add delay before showing other elements
      setTimeout(() => {
        setShowElements(true);
      }, 600);
      
      // Start background animation
      setTimeout(() => {
        setAnimateBackground(true);
      }, 300);
    };

    sequence();
  }, [checkmarkControls]);

  // Create custom confetti elements
  const confettiElements = Array.from({ length: 30 }).map((_, i) => {
    const size = Math.random() * 10 + 5;
    const left = Math.random() * 100;
    const animationDuration = Math.random() * 3 + 2;
    const delay = Math.random() * 0.5;
    
    return (
      <motion.div
        key={i}
        className="absolute z-0"
        style={{
          left: `${left}%`,
          top: "-20px",
          width: `${size}px`,
          height: `${size}px`,
          background: i % 3 === 0 ? "#7b4f3a" : i % 3 === 1 ? "#ffd700" : "#f8f9fa",
          borderRadius: i % 2 === 0 ? "50%" : "0",
          transform: i % 2 === 0 ? "rotate(45deg)" : "",
        }}
        initial={{ y: -10, opacity: 0 }}
        animate={showElements ? {
          y: ["0%", "100%"],
          opacity: [1, 0],
          rotate: i % 2 === 0 ? [0, 360] : [0, 0],
        } : {}}
        transition={{
          duration: animationDuration,
          ease: "easeOut",
          delay: delay,
          repeat: Infinity,
          repeatDelay: Math.random() * 2,
        }}
      />
    );
  });

  // Stars around the checkmark
  const stars = Array.from({ length: 6 }).map((_, i) => {
    const angle = (i * 60) * (Math.PI / 180);
    const radius = 80;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    return (
      <motion.div
        key={i}
        className="absolute"
        style={{
          x, y,
          originX: "center",
          originY: "center",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={showElements ? { scale: 1, opacity: 1 } : {}}
        transition={{
          duration: 0.4,
          delay: 0.8 + (i * 0.1),
          type: "spring",
        }}
      >
        <Star size={20} className="text-yellow-400 fill-yellow-400" />
      </motion.div>
    );
  });

  return (
    <motion.div
      className="w-full h-full flex flex-col justify-center items-center bg-transparent z-50 overflow-hidden relative py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background pattern */}
      <motion.div 
        className="absolute inset-0 opacity-10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: animateBackground ? 0.07 : 0 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute inset-0 bg-transparent" />
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.1,
            }}
          />
        ))}
      </motion.div>
      
      {/* Custom confetti */}
      {showElements && confettiElements}
      
      {/* Success icon with circle */}
      <motion.div className="relative flex items-center justify-center mb-8">
        {showElements && stars}
        <motion.div
          className="flex items-center justify-center rounded-full bg-[#7b4f3a] dark:bg-[#8B5F4D] text-white p-8 shadow-lg relative z-10"
          animate={checkmarkControls}
        >
          <CircleCheck size={80} strokeWidth={2} />
        </motion.div>
        
        {/* Pulsing ring animation */}
        {showElements && (
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-[#7b4f3a] dark:border-[#8B5F4D]"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        )}
      </motion.div>
      
      {/* Success message */}
      <motion.div 
        className="mt-6 text-center relative z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={isVisible ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h2 className="text-3xl font-bold text-[#A7A7A7] mb-3">Completed!</h2>
        <p className="text-[#898989] text-lg">Thank you for your submission.</p>
        
        <motion.p
          className="text-[#7b4f3a] dark:text-[#8B5F4D] mt-4 font-medium flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={showElements ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
        >
          <GiPartyPopper size={20} />
          We're excited to have you onboard!
          <GiPartyPopper size={20} />
        </motion.p>
      </motion.div>
      
      {/* Call to action button */}
      <motion.button
        className="mt-12 px-8 py-3 bg-[#7b4f3a] dark:bg-[#8B5F4D] text-white rounded-full font-medium shadow-lg hover:bg-[#8d5b45] transition-colors"
        initial={{ y: 30, opacity: 0 }}
        animate={showElements ? { y: 0, opacity: 1 } : {}}
        transition={{ 
          duration: 0.5,
          delay: 1,
          type: "spring",
          stiffness: 120
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Continue to Dashboard
      </motion.button>
    </motion.div>
  );
}