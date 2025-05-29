"use client";

import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

// Rendered by Sanity later
const featuredArt = [
  {
    id: "1",
    title: "Death of the Elephant",
    year: "2016",
    category: "WORK",
    imageUrl: "/images/death-elephant-image.jpg",
  },
  {
    id: "2",
    title: "Pontification of Dementia",
    year: "2013",
    category: "WORK",
    imageUrl: "/images/pontification-image.jpg",
  },
  {
    id: "3",
    title: "The Juggling NHS Art Therapist",
    year: "2012",
    category: "WORK",
    imageUrl: "/images/juggling-image.jpg",
  },
  {
    id: "4",
    title: "Moondancer",
    year: "2012",
    category: "WORK",
    imageUrl: "/images/moondancer-image.jpg",
  },
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imageAspectRatio, setImageAspectRatio] = useState<
    "portrait" | "landscape" | "square"
  >("portrait");

  const currentArt = featuredArt[currentIndex];

  // Detect image aspect ratio
  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    const ratio = img.naturalWidth / img.naturalHeight;

    if (ratio > 1.2) {
      setImageAspectRatio("landscape");
    } else if (ratio < 0.8) {
      setImageAspectRatio("portrait");
    } else {
      setImageAspectRatio("square");
    }
  };

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % featuredArt.length);
  }, [isTransitioning]);

  const goToPrevious = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(
      (prev) => (prev - 1 + featuredArt.length) % featuredArt.length
    );
  }, [isTransitioning]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        goToNext();
      } else if (event.key === "ArrowLeft") {
        goToPrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrevious]);

  // Reset transition state after image loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className="w-full h-[calc(100vh-80px)] mt-[80px] bg-gray-100">
      {/* Image container with smart fitting */}
      <div className="relative w-full h-full">
        <Image
          key={currentIndex}
          src={currentArt.imageUrl || "/placeholder.svg"}
          alt={currentArt.title}
          fill
          priority
          onLoad={handleImageLoad}
          className={`transition-opacity duration-500 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          } ${
            imageAspectRatio === "portrait"
              ? "object-contain" // Don't crop portrait images
              : "object-cover" // Landscape images can be cropped
          }`}
        />
      </div>

      {/* Navigation arrows */}
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

      {/* Artwork info with better contrast */}
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

      {/* Carousel indicators */}
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
