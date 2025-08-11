import { Artwork } from "@/sanity.types";
import { getAllArtworks } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function WorkPage() {
  const artworks: Artwork[] = await getAllArtworks();

  if (!artworks || artworks.length === 0) {
    return (
      <main className="pt-24 pb-12 px-6 md:px-12">
        <div className="text-center">
          <h1 className="text-2xl font-light tracking-widest mb-4">WORK</h1>
          <p className="text-muted-foreground">No artworks found.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-12 px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {artworks.map((art) => {
          const width = art.imageWidth || 4;
          const height = art.imageHeight || 3;
          return (
            <Link key={art._id} href={`/work/${art._id}`} className="group">
              <div
                className={`relative overflow-hidden aspect-[${width}/${height}]`}
              >
                {art.mainImage?.asset && (
                  <Image
                    src={urlFor(art.mainImage).url()}
                    alt={art.title || "Untitled artwork"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="mt-2 flex justify-between text-sm">
                <span>{art.title}</span>
                <span className="text-muted-foreground">{art.year}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
