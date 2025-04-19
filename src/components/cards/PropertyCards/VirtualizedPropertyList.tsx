import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import PropertyCard from "./PropertyCard";
import { Property } from "@heuvera/utils/props";

interface VirtualizedPropertyListProps {
  properties: Property[];
  columnsCount: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
}

const VirtualizedPropertyList: React.FC<VirtualizedPropertyListProps> = ({
  properties,
  columnsCount,
}) => {
  const [visibleRangeStart, setVisibleRangeStart] = useState(0);
  const [visibleItemsCount, setVisibleItemsCount] = useState(20);
  const listRef = useRef<HTMLDivElement>(null);
  const itemHeight = 400; // Approximate height of each property card
  const bufferSize = 5; // Additional items to render above/below viewport

  // Determine current active columns based on window width
  const [activeColumns, setActiveColumns] = useState(1);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width >= 1536) setActiveColumns(columnsCount.xxl);
      else if (width >= 1280) setActiveColumns(columnsCount.xl);
      else if (width >= 1024) setActiveColumns(columnsCount.lg);
      else if (width >= 768) setActiveColumns(columnsCount.md);
      else setActiveColumns(columnsCount.sm);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, [columnsCount]);

  // Calculate total rows based on properties length and active columns
  const totalRows = Math.ceil(properties.length / activeColumns);

  useEffect(() => {
    const handleScroll = () => {
      if (!listRef.current) return;

      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Calculate which items should be visible
      const startRow = Math.max(
        0,
        Math.floor(scrollTop / itemHeight) - bufferSize,
      );
      const visibleRows =
        Math.ceil(viewportHeight / itemHeight) + bufferSize * 2;

      setVisibleRangeStart(startRow * activeColumns);
      setVisibleItemsCount(visibleRows * activeColumns);
    };

    handleScroll(); // Initial calculation
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeColumns, itemHeight, bufferSize]);

  // Items to render - only those in visible range
  const visibleProperties = useMemo(() => {
    const endIndex = Math.min(
      visibleRangeStart + visibleItemsCount,
      properties.length,
    );
    return properties.slice(visibleRangeStart, endIndex);
  }, [properties, visibleRangeStart, visibleItemsCount]);

  // Create placeholder for entire list height to maintain scrollbar
  const totalHeight = totalRows * itemHeight;

  // Calculate top offset for visible items
  const topOffset = Math.floor(visibleRangeStart / activeColumns) * itemHeight;

  return (
    <div
      ref={listRef}
      className="relative w-full"
      style={{ height: `${totalHeight}px` }}
    >
      <div
        className={`absolute left-0 right-0 grid gap-x-6 gap-y-8`}
        style={{
          top: `${topOffset}px`,
          gridTemplateColumns: `repeat(${activeColumns}, minmax(0, 1fr))`,
        }}
      >
        {visibleProperties.map((property) => (
          <motion.div
            key={`property-${property.id}`}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full flex justify-center"
            initial="hidden"
            animate="visible"
          >
            <PropertyCard property={property} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(VirtualizedPropertyList);
