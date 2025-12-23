import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import ProductCard from "@/components/product-card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Product } from "@shared/schema";

export default function WhatsNew() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const newsletterMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest("POST", "/api/newsletter", { email });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for joining our newsletter. You'll be the first to know about new arrivals!",
      });
      setEmail("");
    },
    onError: () => {
      toast({
        title: "Subscription failed",
        description: "Please try again or check your email format.",
        variant: "destructive",
      });
    },
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      newsletterMutation.mutate(email);
    }
  };

  // Filter products to show newest ones (can be enhanced with actual date filtering)
  const newProducts = products?.slice(0, 6) || [];

  return (
    <div className="min-h-screen bg-khaista-cream">
      {/* Hero Section */}
      <section className="bg-khaista-soft-pink py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-khaista-pink text-white">New Arrivals</Badge>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-khaista-charcoal mb-4">
              What's New
            </h1>
            <p className="text-xl text-khaista-gray max-w-3xl mx-auto">
              Discover our latest collection of handcrafted Afghan treasures, freshly created by our talented artisans
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* New Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-square rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : newProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-khaista-gray text-lg">
              No new products available at the moment.
            </div>
          </div>
        )}

        {/* Coming Soon Section with Newsletter */}
        <section className="mt-16">
          <div className="bg-gradient-to-br from-khaista-soft-pink to-khaista-white rounded-xl p-8 md:p-12 shadow-sm text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-khaista-charcoal mb-4">
              More Coming Soon
            </h2>
            <p className="text-xl text-khaista-gray mb-8 max-w-2xl mx-auto">
              Our talented artisans are crafting beautiful new pieces. Be the first to discover them!
            </p>
            
            <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
              <h3 className="text-lg font-serif font-semibold text-khaista-charcoal mb-4">
                Subscribe for Updates
              </h3>
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-gray-300 focus:border-khaista-pink"
                  required
                />
                <Button 
                  type="submit" 
                  disabled={newsletterMutation.isPending}
                  className="w-full bg-khaista-pink text-white hover:bg-khaista-pink/90 disabled:opacity-50"
                >
                  {newsletterMutation.isPending ? "Subscribing..." : "Stay Updated"}
                </Button>
              </form>
              <p className="text-sm text-khaista-gray mt-3">
                Get notified about new arrivals, artisan stories, and exclusive offers
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}