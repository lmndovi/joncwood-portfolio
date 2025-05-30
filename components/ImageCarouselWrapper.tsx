// This is a server component that fetches data and passes it to the client component

import { getFeaturedArtworks } from "@/sanity/lib/fetch";
import ImageCarousel from "./ImageCarousel";
import { Artwork } from "@/sanity.types";

export default async function ImageCarouselWrapper() {
  // Fetch featured artworks from Sanity
  const featuredArt: Artwork[] = await getFeaturedArtworks();

  // Pass the data as props to the client component
  return <ImageCarousel initialArtworks={featuredArt} />;
}
