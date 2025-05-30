import Image from "next/image";
import Link from "next/link";
import {
  ArrowBigLeft,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { notFound } from "next/navigation";

// Same data as in work/page.tsx - will be replaced by Sanity later
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
  {
    id: "5",
    title: "Ganesha and Fish Family",
    year: "2023",
    category: "WORK",
    imageUrl: "/images/elephant-image.jpg",
  },
  {
    id: "6",
    title: "The Photographer (JB)",
    year: "2024",
    category: "WORK",
    imageUrl: "/images/fishery-image.jpg",
  },
  {
    id: "7",
    title: "Mary Madeleine Crucifixion",
    year: "2024",
    category: "WORK",
    imageUrl: "/images/sunshine-image.jpg",
  },
];

export default function ArtworkPage({ params }: { params: { id: string } }) {
  const artwork = featuredArt.find((art) => art.id === params.id);

  if (!artwork) {
    notFound();
  }

  // For navigation between artworks
  const currentIndex = featuredArt.findIndex((art) => art.id === params.id);
  const prevId =
    currentIndex > 0
      ? featuredArt[currentIndex - 1].id
      : featuredArt[featuredArt.length - 1].id;
  const nextId =
    currentIndex < featuredArt.length - 1
      ? featuredArt[currentIndex + 1].id
      : featuredArt[0].id;

  return (
    <main className="relative w-full h-[calc(100vh-80px)] mt-[80px] overflow-hidden">
      {/* Full screen background image */}
      <div className="absolute inset-0">
        <Image
          src={artwork.imageUrl || "/placeholder.svg?height=1080&width=1920"}
          alt={artwork.title}
          fill
          priority
          className="object-contain bg-gray-100"
        />
      </div>

      {/* Navigation arrows */}
      <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none">
        <Link
          href={`/work/${prevId}`}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-2 rounded-full transition-all pointer-events-auto"
          aria-label="View previous artwork"
        >
          <ChevronLeft className="h-8 w-8" />
        </Link>
        <Link
          href={`/work/${nextId}`}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-2 rounded-full transition-all pointer-events-auto"
        >
          <ChevronRight className="h-8 w-8" />
        </Link>
      </div>

      {/* Artwork info */}
      <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-sm px-4 py-2 text-sm rounded-md">
        {artwork.category} / {artwork.year}
      </div>

      {/* Back to gallery link */}
      <div className="absolute top-6 left-6">
        <Link
          href="/work"
          className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 text-sm rounded-md transition-all flex"
        >
          <span className="px-2">
            <ArrowLeft />
          </span>
          Gallery
        </Link>
      </div>

      {/* Artwork title */}
      <div className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-sm px-4 py-2 text-sm rounded-md">
        <h1 className="font-medium">{artwork.title}</h1>
      </div>
    </main>
  );
}
