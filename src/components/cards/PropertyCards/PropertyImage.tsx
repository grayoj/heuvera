import { useState } from "react";
import Image from "next/image";
import BookmarkButton from "@heuvera/components/buttons/BookmarkButton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface PropertyImageCarouselProps {
  images?: string[];
  isPriority: boolean;
}

const PropertyImageCarousel = ({
  images = [],
  isPriority = false,
}: PropertyImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div
      className="relative w-full h-60 md:h-36 lg:h-28 xl:h-32 2xl:h-40 overflow-hidden rounded-t-2xl"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {!imgLoaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-[#444444] animate-pulse" />
      )}
      {images.length > 0 ? (
        <>
          <div className="w-full h-full">
            <Image
              src={images[currentIndex]}
              alt={`Property image ${currentIndex + 1}`}
              width={500}
              height={500}
              className="w-full h-full object-cover transition-all duration-300"
              priority={isPriority}
              fetchPriority={isPriority ? "high" : "auto"}
              loading={isPriority ? "eager" : "lazy"}
              onLoad={() => setImgLoaded(true)}
            />
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className={`absolute top-1/2 left-2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/80 dark:bg-[#33333388] rounded-full shadow-md transition-opacity duration-200 ${isHovering ? "opacity-80" : "opacity-0"} hover:opacity-100`}
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={handleNext}
                className={`absolute top-1/2 right-2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/80 dark:bg-[#333333] rounded-full shadow-md transition-opacity duration-200 ${isHovering ? "opacity-80" : "opacity-0"} hover:opacity-100`}
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>

              <div
                className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 transition-opacity duration-200`}
              >
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${currentIndex === index ? "bg-white dark:bg-[#333333] w-3" : "bg-white/60 dark:bg-[#33333388]"}`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-t-2xl">
          <p className="text-gray-500">No Images Available</p>
        </div>
      )}

      <div className="absolute top-3 right-3 size-8 md:size-8 lg:size-6 xl:size-6 2xl:size-8 bg-[#F8F7F2] dark:bg-[#333333] text-[#333333] dark:text-[#F8F7F2] font-bold flex items-center justify-center rounded-full shadow-md z-10">
        <BookmarkButton />
      </div>
    </div>
  );
};

export default React.memo(PropertyImageCarousel);
