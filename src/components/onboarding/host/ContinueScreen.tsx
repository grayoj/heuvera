import { CircleCheck } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
// import Confetti from "react-confetti";

export default function ContinueScreen() {
  const checkmarkControls = useAnimation();
  //   const [showConfetti, setShowConfetti] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const sequence = async () => {
      await checkmarkControls.start({ scale: 0, opacity: 0 });
      await checkmarkControls.start({
        scale: 1.2,
        opacity: 1,
        transition: { duration: 0.3, ease: "easeInOut" },
      });
      await checkmarkControls.start({
        scale: 1,
        transition: { type: "spring", stiffness: 150, damping: 10 },
      });
      //   setShowConfetti(true);
      setIsVisible(true);
    };

    sequence();
  }, [checkmarkControls]);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      // fixed top-0 left-0
      className="w-full h-full flex flex-col justify-center items-center bg-white bg-opacity-90 z-50"
      variants={containerVariants}
      initial="initial"
      animate={isVisible ? "animate" : "initial"}
    >
      {/* {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          gravity={0.2}
          tweenDuration={600}
          opacity={0.8}
        />
      )} */}
      <motion.div
        className="flex flex-col items-center justify-center rounded-full bg-[#7b4f3a] text-white p-8 shadow-lg"
        animate={checkmarkControls}
      >
        <CircleCheck size={80} />
      </motion.div>
      <div className="mt-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Completed!</h2>
        <p className="text-gray-600 mt-2">Thank you for your submission.</p>
      </div>
    </motion.div>
  );
}
