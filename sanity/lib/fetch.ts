import { AboutPage } from "@/sanity.types";
import { client } from "./client";

// Utility function to get featured artworks
export async function getFeaturedArtworks() {
  return client.fetch(`
      *[_type == "artwork" && featured == true] | order(featuredOrder asc) {
        _id,
        title,
        "id": _id,
        year,
        category,
        mainImage,
        "slug": slug.current
      }
    `);
}

// Get all artworks
export async function getAllArtworks() {
  return client.fetch(`
    *[_type == "artwork"] | order(year desc) {
      _id,
      title,
      "id": _id,
      year,
      category,
      mainImage {
        ...,
        asset->{
          _id,
          url,
          metadata { dimensions { width, height } }
        }
      },
      fullImage {
        ...,
        asset->{
          _id,
          url,
          metadata { dimensions { width, height } }
        }
      },
      "slug": slug.current,
      description,
      dimensions,
      medium
    }
  `);
}

// Get a single artwork by ID
export async function getArtworkById(id: string) {
  return client.fetch(
    `
      *[_type == "artwork" && _id == $id][0] {
        _id,
        title,
        "id": _id,
        year,
        category,
        mainImage {
          ...,
          asset->{
            _id,
            url,
            metadata { dimensions { width, height } }
          }
        },
        fullImage {
          ...,
          asset->{
            _id,
            url,
            metadata { dimensions { width, height } }
          }
        },
        "slug": slug.current,
        description,
        dimensions,
        medium
      }
    `,
    { id }
  );
}
export async function getAboutPageContent(): Promise<AboutPage> {
  return client.fetch(
    `*[_type == "aboutPage"][0]{
      title,
      about
    }`
  );
}

export async function getExhibitionPageContent() {
  return client.fetch(`
    *[_type == "exhibitionPage"][0]{
      title,
      flyerImage,
      description
    }
  `);
}

// Get contact page content
export async function getContactPageContent() {
  return client.fetch(`
      *[_type == "contactPage"][0] {
        title,
        bio,
        callToAction,
        servicesText,
        emailHeading,
        email,
        socialHeading,
        instagramUrl
      }
    `);
}
