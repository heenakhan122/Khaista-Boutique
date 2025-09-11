import { Button } from "@/components/ui/button";
import { Link } from "wouter";

// BASE-aware helper so images work on GitHub Pages project sites
const BASE = import.meta.env.BASE_URL; // e.g. "/Khaista-Boutique/"
const withBase = (p: string) =>
  /^https?:\/\//i.test(p) || p.startsWith("/")
    ? BASE + p.replace(/^\/+/, "")
    : BASE + p;

const backgroundImage = withBase("assets/background-website_1754950409732.jpeg");

export default function HeroSection() {
  return (
    <section className="relative h-96 md:h-screen bg-gradient-to-r from-khaista-light-pink/20 to-khaista-soft-pink/20 overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="text-center w-full">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 drop-shadow-lg">
            Authentic Afghan
            <span className="text-khaista-cream block drop-shadow-lg">Craftsmanship</span>
          </h1>

          <div className="bg-black/40 rounded-lg p-6 mb-8 max-w-4xl mx-auto backdrop-blur-sm">
            <p className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-3">
              Supporting Afghan women artisans through the timeless beauty of traditional handmade jewelry, dresses, and accessories
            </p>
            <p className="text-lg text-khaista-cream font-medium">
              Partnering with the Afghanistan Women's Council for financial independence
            </p>
          </div>

          <div className="space-x-4">
            <Link href="/products">
              <Button className="bg-khaista-pink text-white px-8 py-3 hover:bg-khaista-pink/90 font-serif text-lg">
                Shop Collection
              </Button>
            </Link>
            <Link href="/about">
              <Button
                variant="outline"
                className="border-2 border-khaista-pink text-khaista-pink px-8 py-3 hover:bg-khaista-pink hover:text-white font-serif text-lg bg-white/90 backdrop-blur-sm"
              >
                Our Story
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
