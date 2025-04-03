import { motion } from "framer-motion";
import Hero from "../hero";
import SearchBar from "../search/SearchBar";

export function HeaderSection({ isMobile }: { isMobile: boolean }) {
  return (
    <motion.div
      className="w-full h-full relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Hero />
      <motion.div
        className="absolute bottom-0 left-0 right-0 transform translate-y-1/3 px-4 z-10"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <SearchBar isMobile={isMobile} />
      </motion.div>
    </motion.div>
  );
}
