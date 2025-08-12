import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Star } from "lucide-react";
import HeroSection from "@/components/hero-section";
import ProductCard from "@/components/product-card";
import NewsletterSignup from "@/components/newsletter-signup";
import { Button } from "@/components/ui/button";
import type { Product } from "@shared/schema";

export default function Home() {
  const { data: featuredProducts, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products/featured"],
  });

  const testimonials = [
    {
      text: "The jewelry is absolutely stunning and the craftsmanship is incredible. I love knowing that my purchase supports Afghan women artisans.",
      author: "Sarah M.",
      location: "New York, USA"
    },
    {
      text: "My traditional dress is gorgeous and fits perfectly. The attention to detail is remarkable. Highly recommend!",
      author: "Amina K.",
      location: "London, UK"
    },
    {
      text: "Beautiful products with meaningful stories. Fast shipping and excellent customer service. Will definitely order again!",
      author: "Maria G.",
      location: "Toronto, Canada"
    }
  ];

  return (
    <div>
      <HeroSection />

      {/* AWC Partnership Banner */}
      <section className="py-8 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg text-khaista-charcoal">
              <span className="font-semibold">Proud partner of the Afghanistan Women's Council</span> - Supporting Afghan women's financial independence through traditional craftsmanship
            </p>
            <Link href="/about">
              <Button variant="outline" className="mt-4 border-khaista-pink text-khaista-pink hover:bg-khaista-pink hover:text-white">
                Learn About Our Impact
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-khaista-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-khaista-charcoal mb-4">
              Handcrafted Collections
            </h2>
            <p className="text-lg text-khaista-gray max-w-2xl mx-auto">
              Each piece tells a story of generations-old techniques passed down through Afghan artisan families
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Jewelry Category */}
            <Link href="/products/jewelry">
              <div className="group cursor-pointer transform hover:-translate-y-2 transition-all duration-300">
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <img 
                    src="/assets/traad jewlery_1755024989288.webp" 
                    alt="Traditional Afghan Jewelry" 
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-serif font-semibold mb-2">Traditional Jewelry</h3>
                      <p className="text-sm opacity-90">Silver coins, crescents & ornate designs</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Dresses Category */}
            <Link href="/products/clothing">
              <div className="group cursor-pointer transform hover:-translate-y-2 transition-all duration-300">
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <img 
                    src="/assets/Traditional Afghan Clothing_1755024555984.jpg" 
                    alt="Traditional Afghan Dresses" 
                    className="w-full h-64 object-cover object-top group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-serif font-semibold mb-2">Traditional Dresses</h3>
                      <p className="text-sm opacity-90">Kochi & Pashtun embroidered garments</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Bags Category */}
            <Link href="/products/bags">
              <div className="group cursor-pointer transform hover:-translate-y-2 transition-all duration-300">
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <img 
                    src="/assets/Traditional Afghan bags_1755024555983.jpg" 
                    alt="Traditional Afghan Bags" 
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-serif font-semibold mb-2">Handwoven Bags</h3>
                      <p className="text-sm opacity-90">Vintage patterns & vibrant colors</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-khaista-charcoal mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-khaista-gray">Discover our most cherished pieces</p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/products">
              <Button className="bg-khaista-pink text-white px-8 py-3 hover:bg-khaista-pink/90">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-gradient-to-r from-khaista-pink to-khaista-light-pink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Empowering Afghan Women Through Craft
            </h2>
            <p className="text-xl mb-8 max-w-4xl mx-auto">
              Every purchase supports Afghan women artisans, preserving centuries-old traditions while providing sustainable income for families. Together, we celebrate the rich cultural heritage of Afghanistan through authentic handmade craftsmanship.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">100+</div>
                <p className="text-lg">Women Artisans Supported</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">500+</div>
                <p className="text-lg">Handcrafted Pieces</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">25+</div>
                <p className="text-lg">Countries Reached</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-khaista-charcoal mb-4">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-khaista-cream p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <div className="flex text-khaista-amber">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="font-semibold text-khaista-charcoal">{testimonial.author}</div>
                <div className="text-sm text-gray-600">{testimonial.location}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSignup />
    </div>
  );
}
