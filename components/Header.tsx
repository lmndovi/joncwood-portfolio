"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Instagram, Facebook, Twitter, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const navItems = [
  { href: "/about", label: "ABOUT" },
  { href: "/work", label: "SELECTED WORKS" },
  { href: "/contact", label: "CONTACT" },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md py-3 shadow-sm"
          : "bg-white/80 backdrop-blur-sm py-4 md:py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link
          href="/"
          className="text-md md:text-2xl tracking-widest font-light"
        >
          J O N &nbsp; C &nbsp; W O O D S
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map(({ href, label }) => (
                <NavigationMenuItem key={href}>
                  <Link href={href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent hover:bg-black/5",
                        pathname === href
                          ? "font-medium text-black"
                          : "text-gray-700 hover:text-black"
                      )}
                    >
                      {label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Social Media Links */}
          <div className="flex items-center space-x-4 ml-4">
            <Link
              href="https://www.instagram.com/jontwoods/?hl=en"
              aria-label="Instagram"
              className="hover:opacity-70 transition-opacity"
            >
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            className="p-2 rounded-full hover:bg-accent transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[72px] bg-white backdrop-blur-md z-40">
          <div className="container bg-white mx-auto px-6 py-8">
            <nav className="space-y-6">
              {navItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "block text-2xl font-light tracking-wider transition-colors",
                    pathname === href
                      ? "font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Mobile Social Media Links */}
            <div className="flex space-x-6 mt-12 pt-8 border-t">
              <Link
                href="https://instagram.com"
                aria-label="Instagram"
                className="hover:opacity-70 transition-opacity"
              >
                <Instagram className="h-6 w-6" />
              </Link>
              <Link
                href="https://facebook.com"
                aria-label="Facebook"
                className="hover:opacity-70 transition-opacity"
              >
                <Facebook className="h-6 w-6" />
              </Link>
              <Link
                href="https://twitter.com"
                aria-label="Twitter"
                className="hover:opacity-70 transition-opacity"
              >
                <Twitter className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
