// app/about/page.tsx
import { AboutPage } from "@/sanity.types";
import { getAboutPageContent } from "@/sanity/lib/fetch";
import { PortableText } from "@portabletext/react";

export default async function About() {
  const aboutContent: AboutPage = await getAboutPageContent();

  return (
    <main className="pt-24 pb-12 px-6 md:px-12 min-h-screen bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-light tracking-widest text-foreground">
              {aboutContent?.title}
            </h1>
            <div className="w-24 h-px bg-border mx-auto"></div>
          </div>

          {/* About Section */}
          <div className="space-y-6 text-lg md:text-xl leading-relaxed text-muted-foreground max-w-3xl mx-auto">
            {aboutContent?.about && <PortableText value={aboutContent.about} />}
          </div>
        </div>
      </div>
    </main>
  );
}
