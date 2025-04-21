export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export const cardAnimation = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  hover: {
    scale: 1.05,
    boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.2 },
  },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 100, damping: 15, duration: 0.6 },
  },
  hover: {
    scale: 1.03,
    boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.2 },
  },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 100, damping: 15, duration: 0.6 },
  },
  hover: {
    scale: 1.03,
    boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.2 },
  },
};


// animations.ts
export const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
};

export const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { delay, duration: 0.8, ease: "easeOut" },
});

export const slideInY = (delay = 0) => ({
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.7, delay },
});

export const slideInX = (delay = 0) => ({
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.7, delay },
});

export const slideOutY = (delay = 0) => ({
  initial: { y: -100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.7, delay },
});
