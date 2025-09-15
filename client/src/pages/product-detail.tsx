import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { ArrowLeft, ShoppingBag, Star, Truck, Shield, RefreshCcw, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useCartStore } from "@/lib/cart-store";
import { useToast } from "@/hooks/use-toast";
import { WishlistButton } from "@/components/wishlist-button";
import type { Product } from "@shared/schema";
import { assetUrl } from "@/lib/asset-url";

const BASE = import.meta.env.BASE_URL;

// ------- helpers (same contents as before) -------
const getSuggestedMaterials = (category: string) => { /* ... your bodies ... */ };
const getCareInstructions = (category: string) => { /* ... */ };
const getSizeGuide = (category: string) => { /* ... */ };

// ------- fetch product from static JSON -------
async function fetchProductById(id: string): Promise<Product | null> {
  const res = await fetch(BASE + "api/products.json");
  if (!res.ok) return null;

  const items = (await res.json()) as Array<
    Product & { image?: string; imageUrl?: string; imageAlt?: string | null }
  >;

  // id in JSON might be number or string; match loosely
  const found = items.find(p => String((p as any).id) === String(id));
  if (!found) return null;

  // normalize fields the UI expects
  return {
    ...found,
    imageUrl: found.image ?? found.imageUrl ?? "",
    imageAlt: found.imageAlt ?? null,
  } as Product;
}

export default function ProductDetail() {
  // accept both /product/:id and /products/:id
  const [m1, p1] = useRoute("/product/:id");
  const [m2, p2] = useRoute("/products/:id");
  const match = m1 || m2;
  const id = (p1?.id ?? p2?.id) as string | undefined;

  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore(s => s.addItem);
  const { toast } = useToast();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    enabled: !!id,
    queryFn: () => fetchProductById(id!),
  });

  if (!match) return null;

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

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast({ title: "Added to cart", description: `${product.name} has been added to your cart.` });
  };

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
            <img
              src={assetUrl(product.imageUrl)}
              alt={product.imageAlt || product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* ...the rest of your info/add-to-cart/sections unchanged... */}
      </div>
    </div>
  );
}
