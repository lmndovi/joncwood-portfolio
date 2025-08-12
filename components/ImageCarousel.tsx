"use client";

import React, { useCallback, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Artwork } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

const ImageCarousel = ({ initialArtworks }: { initialArtworks: Artwork[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const featuredArt = initialArtworks;
  const currentArt = featuredArt[currentIndex];

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % featuredArt.length);
  }, [isTransitioning, featuredArt.length]);

  const goToPrevious = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(
      (prev) => (prev - 1 + featuredArt.length) % featuredArt.length
    );
  }, [isTransitioning, featuredArt.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") goToNext();
      else if (event.key === "ArrowLeft") goToPrevious();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrevious]);

  // Reset transition state after change
  useEffect(() => {
    const timer = setTimeout(() => setIsTransitioning(false), 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className="w-full h-[calc(100vh-80px)] mt-[80px] bg-gray-100">
      {/* Image */}
      <div className="relative w-full h-full mt-10">
        {currentArt.mainImage?.asset && (
          <Image
            key={currentIndex}
            src={urlFor(currentArt.mainImage).url() || "/placeholder.svg"}
            alt={currentArt.title || "Untitled artwork"}
            fill
            priority
            className={`transition-opacity duration-500 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            } object-cover [object-position:center_40%]`}
            style={{ objectPosition: "center 40%" }}
          />
        )}
      </div>

      {/* Arrows */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-6 pointer-events-none">
        <button
          onClick={goToPrevious}
          className="bg-white/90 hover:bg-white backdrop-blur-sm p-3 rounded-full transition-all pointer-events-auto group shadow-lg"
          aria-label="View previous artwork"
          disabled={isTransitioning}
        >
          <ChevronLeft className="h-8 w-8 text-gray-800 group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={goToNext}
          className="bg-white/90 hover:bg-white backdrop-blur-sm p-3 rounded-full transition-all pointer-events-auto group shadow-lg"
          aria-label="View next artwork"
          disabled={isTransitioning}
        >
          <ChevronRight className="h-8 w-8 text-gray-800 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Artwork info */}
      <div className="absolute bottom-6 left-6">
        <div
          className={`bg-white/90 backdrop-blur-sm px-4 py-2 text-sm text-gray-800 rounded-md shadow-lg transition-all duration-300 ${
            isTransitioning
              ? "opacity-0 translate-y-2"
              : "opacity-100 translate-y-0"
          }`}
        >
          {currentArt.category} / {currentArt.year}
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 right-6 flex space-x-2">
        {featuredArt.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setCurrentIndex(index);
              }
            }}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex
                ? "bg-gray-800 scale-125"
                : "bg-gray-400 hover:bg-gray-600"
            }`}
            aria-label={`Go to artwork ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
