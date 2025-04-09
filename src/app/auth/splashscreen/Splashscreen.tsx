"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeuveraLogo } from "@heuvera/components/logo";
import { useRouter } from "next/navigation";

const SplashScreen = () => {
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(true);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      router.push("/onboarding");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  const handleLogoInteraction = () => {
    setIsClicked(true);
    setTimeout(() => {
      router.push("/explore");
    }, 300);
  };

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          key="splash-container"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              duration: 0.8,
              ease: "easeOut",
            },
          }}
          exit={{
            opacity: 0,
            scale: 1.2,
            transition: {
              duration: 0.5,
              ease: "easeIn",
            },
          }}
          className="fixed inset-0 flex items-center justify-center bg-[#7B4F3A]"
        >
          {/* Circular background effect */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1.5,
              opacity: 0.1,
              transition: {
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
            className="absolute w-96 h-96 bg-[#F8F7F2] rounded-full opacity-10"
          />

          <motion.div
            key="splash-logo"
            initial={{
              scale: 0.5,
              rotate: -180,
              opacity: 0,
              filter: "blur(15px)",
            }}
            animate={{
              scale: isClicked ? 1.5 : 1,
              rotate: isClicked ? 360 : 0,
              opacity: 1,
              filter: "blur(0px)",
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 25,
                duration: 1.2,
              },
            }}
            className="relative z-10 flex items-center justify-center cursor-pointer"
            onClick={handleLogoInteraction}
          >
            <motion.div
              animate={{
                scale: [1, 1.03, 1],
                rotate: [0, 1, -1, 0],
                transition: {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              <HeuveraLogo width={80} height={80} color="#F8F7F2" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
