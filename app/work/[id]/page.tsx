import { getAllArtworks, getArtworkById } from "@/sanity/lib/fetch";
import { notFound } from "next/navigation";
import { Artwork } from "@/sanity.types";
import ArtworkDetailClient from "@/components/ArtworkDetailClient";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const artworks: Artwork[] = await getAllArtworks();
  return artworks.map((art) => ({ id: art._id }));
}

export default async function ArtworkPage({ params }: Props) {
  const { id } = await params;

  const art = await getArtworkById(id);
  if (!art) notFound();

  const allArtworks = (await getAllArtworks()) as Artwork[];
  const currentIndex = allArtworks.findIndex((a) => a._id === id);
  const prevId =
    currentIndex > 0
      ? allArtworks[currentIndex - 1]._id
      : allArtworks[allArtworks.length - 1]._id;
  const nextId =
    currentIndex < allArtworks.length - 1
      ? allArtworks[currentIndex + 1]._id
      : allArtworks[0]._id;

  return <ArtworkDetailClient art={art} prevId={prevId} nextId={nextId} />;
}
