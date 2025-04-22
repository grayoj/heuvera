import { memo } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const SearchBar = dynamic(() => import("../search/SearchBar"), {
  loading: () => null,
});

import Hero from "../hero";

export const HeaderSection = memo(function HeaderSection({
  isMobile,
}: {
  isMobile: boolean;
}) {
  return (
    <div className="w-full h-full relative">
      <Hero />
      <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/3 px-4 z-10">
        <SearchBar isMobile={isMobile} />
      </div>
    </div>
  );
});
