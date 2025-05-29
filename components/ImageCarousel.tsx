"use client";

import React from "react";
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

  const currentArt = featuredArt[currentIndex];

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % featuredArt.length);
  };

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(
      (prev) => (prev - 1 + featuredArt.length) % featuredArt.length
    );
  };

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
  }, []);

  // Reset transition state after image loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          key={currentIndex}
          src={currentArt.imageUrl}
          alt={currentArt.title}
          fill
          priority
          className={`object-cover transition-opacity duration-500 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>
      {/* Navigation arrows */}
      <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none">
        <button
          onClick={goToPrevious}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full transition-all pointer-events-auto group"
          aria-label="View previous artwork"
          disabled={isTransitioning}
        >
          <ChevronLeft className="h-8 w-8 group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={goToNext}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full transition-all pointer-events-auto group"
          aria-label="View next artwork"
          disabled={isTransitioning}
        >
          <ChevronRight className="h-8 w-8 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Artwork info with transition */}
      <div className="absolute bottom-6 left-6">
        <div
          className={`bg-white/10 backdrop-blur-sm px-4 py-2 text-sm transition-all duration-300 ${
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
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentIndex
                ? "bg-white/80 scale-125"
                : "bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to artwork ${index + 1}`}
          />
        ))}
      </div>

      {/* Optional: Auto-advance carousel */}
      {/* Uncomment if you want auto-advancing carousel
      useEffect(() => {
        const interval = setInterval(() => {
          goToNext()
        }, 5000) // Change every 5 seconds
        
        return () => clearInterval(interval)
      }, [currentIndex])
      */}
    </div>
  );
};

export default ImageCarousel;
