import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const shop = () => {
  return (
    <main className="pt-24 pb-12 px-6 md:px-12 min-h-screen bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-light tracking-widest text-foreground">
              SHOP
            </h1>
            <div className="w-24 h-px bg-border mx-auto"></div>
          </div>

          {/* Main Content */}
          <div className="space-y-12">
            {/* Redbubble Section */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-light text-foreground leading-relaxed max-w-3xl mx-auto">
                  Currently selling prints, posters, cushions, mugs, stickers
                  and more on Redbubble
                </h2>
              </div>

              <div className="py-4">
                <Button asChild size="lg" className="text-lg px-8 py-6">
                  <Link
                    href="https://www.redbubble.com/people/jonwoodsart/shop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3"
                  >
                    Shop All
                    <ExternalLink className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-border"></div>

            {/* Original Artwork Section */}
            <div className="space-y-6">
              <h2 className="text-xl md:text-2xl font-medium text-foreground tracking-wider">
                ORIGINAL ARTWORK
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                For original artwork, please contact Jonathan at{" "}
                <Link
                  href="mailto:jonwoods55@gmail.com"
                  className="text-foreground hover:text-muted-foreground transition-colors font-medium underline decoration-1 underline-offset-2"
                >
                  jonwoods55@gmail.com
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default shop;
