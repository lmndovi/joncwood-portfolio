"use client";

import { useState } from "react";
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

  return (
    <main className="relative h-screen w-full overflow-hidden">
      {/* Full screen background image */}
      <div className="absolute inset-0">
        <Image
          src={
            art.mainImage?.asset
              ? urlFor(art.mainImage).url()
              : "/placeholder.svg?height=1080&width=1920"
          }
          alt={art.title || "Artwork"}
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Navigation arrows */}
      <div className="absolute inset-0 flex items-center justify-between px-4 md:px-6 pointer-events-none">
        <Link
          href={`/work/${prevId}`}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-2 rounded-full transition-all pointer-events-auto"
          aria-label="View previous artwork"
        >
          <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
        </Link>
        <Link
          href={`/work/${nextId}`}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-2 rounded-full transition-all pointer-events-auto"
          aria-label="View next artwork"
        >
          <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
        </Link>
      </div>

      {/* Toggle details button */}
      <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 text-sm transition-all rounded-lg text-black/70 hover:text-black"
        >
          <h1>
            {art.title} {art.year}
          </h1>
          <p>Click for description</p>
        </button>
      </div>

      {/* Modal details */}
      {showDetails && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 md:p-8">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setShowDetails(false)}
              className="absolute top-4 right-4 p-2 hover:bg-black/10 rounded-full transition-colors"
              aria-label="Close details"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {art.title}
                </h1>
                <p className="text-lg text-gray-600">{art.year}</p>
              </div>

              {art.description && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">
                    Description
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                    {art.description}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {art.medium && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                      Medium
                    </h3>
                    <p className="text-gray-700">{art.medium}</p>
                  </div>
                )}
                {art.dimensions && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                      Dimensions
                    </h3>
                    <p className="text-gray-700">{art.dimensions}</p>
                  </div>
                )}
              </div>

              {art.category && (
                <div className="pt-4 border-t border-gray-200">
                  <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                    {art.category}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
