// app/exhibition/page.tsx
import { getExhibitionPageContent } from "@/sanity/lib/fetch";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export default async function Exhibition() {
  const exhibitionContent = await getExhibitionPageContent();

  return (
    <main className="pt-24 pb-12 px-6 md:px-12 min-h-screen bg-background">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-light tracking-widest text-foreground">
            {exhibitionContent?.title}
          </h1>
          <div className="w-24 h-px bg-border mx-auto"></div>
        </div>

        {/* Flyer Image */}
        {exhibitionContent?.flyerImage && (
          <div className="relative w-full max-w-xl mx-auto aspect-[3/4]">
            <Image
              src={urlFor(exhibitionContent.flyerImage).url()}
              alt="Exhibition flyer"
              fill
              className="object-contain rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Description */}
        {exhibitionContent?.description && (
          <div className="space-y-6 text-lg md:text-xl leading-relaxed text-muted-foreground max-w-3xl mx-auto">
            <PortableText value={exhibitionContent.description} />
          </div>
        )}
      </div>
    </main>
  );
}
