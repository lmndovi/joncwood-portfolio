import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import { getAllArtworks, getArtworkById } from "@/sanity/lib/fetch";
import { Artwork } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

// Generate static params for all artworks
export async function generateStaticParams() {
  const featuredArt: Artwork[] = await getAllArtworks();
  return featuredArt.map((art) => ({
    id: art._id,
  }));
}

export default async function ArtworkPage({
  params,
}: {
  params: { id: string };
}) {
  const art = await getArtworkById(params.id);

  if (!art) {
    notFound();
  }
  // For navigation between artworks
  const allArtworks: Artwork[] = await getAllArtworks();

  const currentIndex = allArtworks.findIndex((art) => art._id === params.id);
  const prevId =
    currentIndex > 0
      ? allArtworks[currentIndex - 1]._id
      : allArtworks[allArtworks.length - 1]._id;
  const nextId =
    currentIndex < allArtworks.length - 1
      ? allArtworks[currentIndex + 1]._id
      : allArtworks[0]._id;

  return (
    <main className="relative w-full h-[calc(100vh-80px)] mt-[80px] overflow-hidden">
      {/* Full screen background image */}
      <div className="absolute inset-0">
        <Image
          src={
            urlFor(art.mainImage).url() ||
            "/placeholder.svg?height=1080&width=1920"
          }
          alt={art.title}
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
        {art.category} / {art.year}
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
        <h1 className="font-medium">{art.title}</h1>
      </div>
    </main>
  );
}
