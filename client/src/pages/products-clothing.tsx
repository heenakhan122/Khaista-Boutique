import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Star, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/cart-store";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";

export default function ProductsClothing() {
  const addItem = useCartStore(state => state.addItem);
  const { toast } = useToast();

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products/category/clothing"],
  });

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-khaista-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-khaista-light-pink rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 bg-khaista-light-pink rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-khaista-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-khaista-charcoal mb-4">
            Afghan Clothing Collection
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse our stunning collection of traditional Afghan clothing, featuring elaborate Kochi dresses and authentic Afghan attire.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products?.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow border-khaista-soft-pink">
              <div className="aspect-square relative overflow-hidden rounded-t-lg">
                <Link href={`/product/${product.id}`}>
                  <img
                    src={product.imageUrl}
                    alt={product.imageAlt || product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                {product.featured === 1 && (
                  <Badge className="absolute top-3 left-3 bg-khaista-pink text-white">
                    Featured
                  </Badge>
                )}
              </div>
              <CardContent className="p-6">
                <Link href={`/product/${product.id}`}>
                  <h3 className="font-serif font-bold text-xl text-khaista-charcoal mb-2 group-hover:text-khaista-pink transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-khaista-pink">
                    ${product.price}
                  </span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-khaista-pink text-khaista-pink" />
                    ))}
                  </div>
                </div>
                <Button 
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-khaista-pink hover:bg-khaista-pink/90 font-serif"
                  disabled={product.inStock === 0}
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}