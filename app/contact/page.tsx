import { Instagram } from "lucide-react";
import Link from "next/link";
import React from "react";

const contact = () => {
  return (
    <main className="pt-24 pb-12 px-6 md:px-12 min-h-screen bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-light tracking-widest text-foreground">
              CONTACT JON
            </h1>
            <div className="w-24 h-px bg-border mx-auto"></div>
          </div>

          {/* Bio Section */}
          <div className="space-y-6 text-lg md:text-xl leading-relaxed text-muted-foreground max-w-3xl mx-auto">
            <p>
              The youngest of 4 and born in Royston, Cambridgeshire, Jonathan
              Charles Woods is an artist, art therapist, dad and dog lover who
              has retired to the wilds of Penzance with his wonderful wife
              Carol.
            </p>
          </div>

          {/* Call to Action */}
          <div className="py-8">
            <p className="text-xl md:text-2xl font-medium text-foreground">
              His art is very much for sale!
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            <p>
              Get in touch to find out more about buying, commissioning,
              exploring his back catalogue or exhibiting Jon's work
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-8 pt-8">
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-foreground tracking-wider">
                EMAIL
              </h2>
              <Link
                href="mailto:jonwoods55@gmail.com"
                className="text-xl md:text-2xl text-foreground hover:text-muted-foreground transition-colors font-light"
              >
                jonwoods55@gmail.com
              </Link>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-foreground tracking-wider">
                FOLLOW
              </h2>
              <Link
                href="https://instagram.com"
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
};

export default contact;
