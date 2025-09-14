import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { useState } from "react";
import { ArrowLeft, ShoppingBag, Star, Truck, Shield, RefreshCcw, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useCartStore } from "@/lib/cart-store";
import { useToast } from "@/hooks/use-toast";
import { WishlistButton } from "@/components/wishlist-button";
import type { Product } from "@shared/schema";

// helpers (unchanged) ...
const getSuggestedMaterials = (category: string) => { /* ...exactly as you had... */ };
const getCareInstructions = (category: string) => { /* ... */ };
const getSizeGuide = (category: string) => { /* ... */ };

export default function ProductDetail() {
  // Accept both /product/:id and /products/:id (and trailing slash, handled by App routes)
  const [m1, p1] = useRoute("/product/:id");
  const [m2, p2] = useRoute("/products/:id");
  const match = m1 || m2;
  const id = (p1?.id ?? p2?.id) as string | undefined;

  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const { toast } = useToast();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["/api/products", id],
    enabled: !!id,
  });

  if (!match) return null;

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, quantity);
    toast({ title: "Added to cart", description: `${product.name} has been added to your cart.` });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-khaista-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl mx-auto mb-8"><Skeleton className="aspect-square rounded-lg" /></div>
          <div className="max-w-4xl mx-auto space-y-6">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/products"><Button>Browse All Products</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-khaista-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8">
          <Link href="/products">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Products
            </Button>
          </Link>
        </div>

        {/* Image */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="aspect-square rounded-lg overflow-hidden bg-white shadow-sm">
            <img src={product.imageUrl} alt={product.imageAlt || product.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Info */}
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <Badge variant="secondary" className="mb-2">{product.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-khaista-charcoal mb-4">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-3xl font-bold text-khaista-turquoise">${product.price}</span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (<Star key={i} className="h-4 w-4 fill-khaista-amber text-khaista-amber" />))}
                <span className="text-sm text-gray-600 ml-2">(12 reviews)</span>
              </div>
            </div>
          </div>

          <p className="text-gray-700 text-lg leading-relaxed">{product.description}</p>

          {/* Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">Quantity:</label>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>+</Button>
              </div>
              <span className="text-sm text-gray-600">({product.inStock} in stock)</span>
            </div>

            <div className="flex gap-4">
              <Button className="flex-1 bg-khaista-pink hover:bg-khaista-pink/90 font-serif" onClick={handleAddToCart} disabled={product.inStock === 0}>
                <ShoppingBag className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <WishlistButton product={product} className="border-khaista-pink text-khaista-pink hover:bg-khaista-pink hover:text-white" />
            </div>
          </div>

          {/* ...rest unchanged... */}
        </div>
      </div>
    </div>
  );
}
