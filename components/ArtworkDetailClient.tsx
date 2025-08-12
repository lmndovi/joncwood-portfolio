"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Artwork } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

export default function ArtworkDetailClient({
  art,
  prevId,
  nextId,
}: {
  art: Artwork;
  prevId: string;
  nextId: string;
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  // Measure header height and update on resize/scroll (header changes size on scroll)
  useEffect(() => {
    const measure = () => {
      const header = document.querySelector("header");
      const h = header ? Math.ceil(header.getBoundingClientRect().height) : 0;
      setHeaderHeight(h);
    };

    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, { passive: true });

    // optional: mutation observer in case header classes change the height
    const headerEl = document.querySelector("header");
    let mo: MutationObserver | null = null;
    if (headerEl && "MutationObserver" in window) {
      mo = new MutationObserver(measure);
      mo.observe(headerEl, {
        attributes: true,
        attributeFilter: ["class", "style"],
      });
    }

    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
      if (mo) mo.disconnect();
    };
  }, []);

  // Inline style for the fixed image container below the header
  const imageContainerStyle: React.CSSProperties = {
    position: "fixed",
    top: headerHeight,
    left: 0,
    right: 0,
    height: `calc(100vh - ${headerHeight}px)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "black",
    zIndex: 40, // below header (header uses z-50)
  };

  // Modal uses a higher z-index so it sits above header and image if opened
  return (
    <main className="relative w-full">
      {/* Image container fixed below header */}
      <div style={imageContainerStyle}>
        {/* Use a relative wrapper so next/image with `fill` works */}
        <div className="relative w-full h-full flex items-center justify-center">
          {art.fullImage?.asset ? (
            <Image
              src={urlFor(art.fullImage).url()}
              alt={art.title || "Artwork"}
              fill
              priority
              className="object-contain max-w-full max-h-full"
              // Note: Next/Image accepts `fill` when parent has explicit width/height,
              // here the parent has `height: calc(...)` so it's fine.
            />
          ) : (
            <div className="text-white">No image</div>
          )}

          {/* Navigation arrows (inside the image container) */}
          <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none">
            <Link
              href={`/work/${prevId}`}
              className="pointer-events-auto bg-white hover:bg-white/90 p-3 rounded-full shadow-lg"
              aria-label="Previous artwork"
            >
              <ChevronLeft className="h-6 w-6 text-gray-800" />
            </Link>

            <Link
              href={`/work/${nextId}`}
              className="pointer-events-auto bg-white hover:bg-white/90 p-3 rounded-full shadow-lg"
              aria-label="Next artwork"
            >
              <ChevronRight className="h-6 w-6 text-gray-800" />
            </Link>
          </div>

          {/* Toggle/details button (bottom-left in the image container) */}
          <div className="absolute left-6 bottom-6 z-50">
            <button
              onClick={() => setShowDetails(true)}
              className="cursor-pointer bg-white hover:bg-white/70 backdrop-blur-sm px-4 py-2 text-sm text-gray-800 rounded-md shadow-lg transition-all duration-300"
              aria-expanded={showDetails}
            >
              <h1 className="font-medium leading-tight">
                {art.title} <span className="font-light">{art.year}</span>
              </h1>
              <p className="text-xs">Click for description</p>
            </button>
          </div>

          {/* Modal details */}
          {showDetails && (
            <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl relative">
                <button
                  onClick={() => setShowDetails(false)}
                  className="absolute top-4 right-4 p-2 hover:bg-black/10 rounded-full transition-colors"
                  aria-label="Close details"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Details content as before */}
                <div className="space-y-6">
                  {/* Title and year */}
                  <div className="border-b border-gray-200 pb-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      {art.title}
                    </h1>
                    <p className="text-lg text-gray-600">{art.year}</p>
                  </div>

                  {/* Description */}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">
                      Description
                    </h2>
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                      {art.description}
                    </p>
                  </div>

                  {/* Technical details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">
                        Medium
                      </h3>
                      <p className="text-gray-700">{art.medium}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">
                        Dimensions
                      </h3>
                      <p className="text-gray-700">{art.dimensions}</p>
                    </div>
                  </div>

                  {/* Category tag */}
                  <div className="pt-4 border-t border-gray-200">
                    <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                      {art.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
