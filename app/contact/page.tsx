import { ContactPage } from "@/sanity.types";
import { getContactPageContent } from "@/sanity/lib/fetch";
import { Instagram } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function contact() {
  const contactContent: ContactPage = await getContactPageContent();

  return (
    <main className="pt-24 pb-12 px-6 md:px-12 min-h-screen bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-light tracking-widest text-foreground">
              {contactContent?.title}
            </h1>
            <div className="w-24 h-px bg-border mx-auto"></div>
          </div>

          {/* Bio Section */}
          <div className="space-y-6 text-lg md:text-xl leading-relaxed text-muted-foreground max-w-3xl mx-auto">
            <p>{contactContent?.bio}</p>
          </div>

          {/* Call to Action */}
          <div className="py-8">
            <p className="text-xl md:text-2xl font-medium text-foreground">
              {contactContent?.callToAction}
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            <p>{contactContent.servicesText}</p>
          </div>

          {/* Contact Information */}
          <div className="space-y-8 pt-8">
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-foreground tracking-wider">
                {contactContent?.emailHeading}
              </h2>
              <Link
                href={contactContent?.email || ""}
                className="text-xl md:text-2xl text-foreground hover:text-muted-foreground transition-colors font-light"
              >
                {contactContent?.email}
              </Link>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-foreground tracking-wider">
                {contactContent?.socialHeading}
              </h2>
              <Link
                href={contactContent?.instagramUrl || ""}
                aria-label="Instagram"
                className="inline-block text-foreground hover:text-muted-foreground transition-colors"
              >
                <Instagram className="h-8 w-8" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
