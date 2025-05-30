import Image from "next/image";
import Link from "next/link";
import React from "react";

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

const work = () => {
  return (
    <main className="pt-24 pb-12 px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredArt.map((art) => (
          <Link key={art.id} href={`/work/${art.id}`} className="group">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={art.imageUrl}
                alt={art.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span>{art.title}</span>
              <span className="text-muted-foreground">{art.year}</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default work;
