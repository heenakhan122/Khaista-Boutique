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
const CATALOG_VERSION = 3;
const CATALOG_URL = `${BASE}api/products.json?v=${CATALOG_VERSION}`;

// ------- fetch product from static JSON (works on GitHub Pages) -------
async function fetchProductById(id: string): Promise<Product | null> {
  const res = await fetch(CATALOG_URL, { cache: "no-store" });
  if (!res.ok) return null;

  const items = (await res.json()) as Array<
    Product & { image?: string; imageUrl?: string; imageAlt?: string | null }
  >;

  const found = items.find((p) => String((p as any).id) === String(id));
  if (!found) return null;

  return {
    ...found,
    imageUrl: found.image ?? found.imageUrl ?? "",
    imageAlt: found.imageAlt ?? null,
  } as Product;
}

// ---- helpers (real bodies) ----
const getSuggestedMaterials = (category: string) => {
  switch (category) {
    case "jewelry":
      return "Traditional Afghan silver, brass, coral beads, turquoise stones, glass beads";
    case "clothing":
      return "Premium cotton, silk, traditional Afghan embroidery thread, metallic accents";
    case "bags":
      return "Durable canvas, traditional Afghan textiles, leather accents, metal hardware";
    default:
      return "High-quality traditional Afghan materials";
  }
};

const getCareInstructions = (category: string) => {
  switch (category) {
    case "jewelry":
      return "Store in a dry place away from moisture. Clean gently with a soft cloth. Avoid exposure to perfumes and chemicals.";
    case "clothing":
      return "Hand wash in cold water with mild detergent. Air dry away from direct sunlight. Iron on low heat if needed.";
    case "bags":
      return "Spot clean with damp cloth. Allow to air dry completely. Store in a cool, dry place when not in use.";
    default:
      return "Handle with care. Clean gently and store properly to maintain quality.";
  }
};

const getSizeGuide = (category: string) => {
  switch (category) {
    case "jewelry":
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><strong>Necklaces:</strong></div><div>Adjustable length 16-20 inches</div>
            <div><strong>Bracelets:</strong></div><div>Adjustable 6.5-8.5 inches</div>
            <div><strong>Earrings:</strong></div><div>Drop length varies by design</div>
          </div>
          <p className="text-xs text-gray-600 mt-2">Most jewelry pieces are adjustable. Contact us for custom sizing.</p>
        </div>
      );
    case "clothing":
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2 text-sm border-b pb-2">
            <div><strong>Size</strong></div><div><strong>Chest (in)</strong></div><div><strong>Length (in)</strong></div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-sm"><div>Small</div><div>34-36</div><div>42-44</div></div>
          <div className="grid grid-cols-3 gap-2 text-sm"><div>Medium</div><div>38-40</div><div>44-46</div></div>
          <div className="grid grid-cols-3 gap-2 text-sm"><div>Large</div><div>42-44</div><div>46-48</div></div>
          <div className="grid grid-cols-3 gap-2 text-sm"><div>X-Large</div><div>46-48</div><div>48-50</div></div>
          <p className="text-xs text-gray-600 mt-2">Traditional Afghan dresses are designed to fit loosely. Custom sizing available through Khaista Tailors.</p>
        </div>
      );
    case "bags":
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><strong>Small bags:</strong></div><div>8" x 6" x 3"</div>
            <div><strong>Medium bags:</strong></div><div>12" x 9" x 4"</div>
            <div><strong>Large bags:</strong></div><div>16" x 12" x 5"</div>
            <div><strong>Tote bags:</strong></div><div>18" x 14" x 6"</div>
          </div>
          <p className="text-xs text-gray-600 mt-2">Measurements are approximate. Each handmade piece may vary slightly.</p>
        </div>
      );
    default:
      return <p className="text-sm text-gray-600">Size information varies by product. Contact us for specific measurements.</p>;
  }
};

// ---- component ----
export default function ProductDetail() {
  // Accept both /product/:id and /products/:id
  const [m1, p1] = useRoute("/product/:id");
  const [m2, p2] = useRoute("/products/:id");
  const match = m1 || m2;
  const id = (p1?.id ?? p2?.id) as string | undefined;

  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const { toast } = useToast();

  const { data: product, isLoading } = useQuery<Product | null>({
    queryKey: ["product", id, CATALOG_VERSION],       // include version to bust caches
    enabled: !!id,
    queryFn: () => fetchProductById(id!),
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
            <img
              src={assetUrl(product.imageUrl)}
              alt={product.imageAlt || product.name}
              className="w-full h-full object-cover"
            />
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

          {/* Product Details */}
          <Card>
            <CardHeader><CardTitle className="text-lg font-serif">Product Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><h4 className="font-medium text-gray-900">Materials</h4><p className="text-gray-600">{product.materials || getSuggestedMaterials(product.category)}</p></div>
              {product.dimensions && (<div><h4 className="font-medium text-gray-900">Dimensions</h4><p className="text-gray-600">{product.dimensions}</p></div>)}
              <div><h4 className="font-medium text-gray-900">Care Instructions</h4><p className="text-gray-600">{product.careInstructions || getCareInstructions(product.category)}</p></div>
              <div><h4 className="font-medium text-gray-900">Origin</h4><p className="text-gray-600">Handcrafted in Afghanistan by skilled female artisans</p></div>
            </CardContent>
          </Card>

          {/* Size Guide */}
          <Card>
            <CardHeader><CardTitle className="text-lg font-serif flex items-center gap-2"><Ruler className="h-5 w-5" /> Size Guide</CardTitle></CardHeader>
            <CardContent>{getSizeGuide(product.category)}</CardContent>
          </Card>

          {/* Return Policy */}
          <Card className="border-khaista-soft-pink bg-khaista-cream/50">
            <CardHeader><CardTitle className="text-lg font-serif flex items-center gap-2"><RefreshCcw className="h-5 w-5" /> Return & Exchange Policy</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-white p-4 rounded-lg border border-khaista-pink/20">
                <h4 className="font-semibold text-khaista-charcoal mb-2">All Sales Final - No Returns</h4>
                <p className="text-sm text-gray-600 mb-3">Due to the handmade nature of our products and support for our Afghan artisans, we do not accept returns.</p>
                <h4 className="font-semibold text-khaista-pink mb-2">Free Exchanges & Alterations</h4>
                <p className="text-sm text-gray-600">We offer <strong>free exchanges</strong> and <strong>free alterations</strong> within 30 days.</p>
              </div>
              <div className="text-xs text-gray-600">
                <p>• Exchanges available for different sizes or colors (subject to availability)</p>
                <p>• Free alterations through our Khaista Tailors network</p>
              </div>
            </CardContent>
          </Card>

          {/* Shipping badges (optional) */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-khaista-turquoise" />
                  <div>
                    <div className="font-medium text-sm">Free Shipping</div>
                    <div className="text-xs text-gray-600">Orders over $100</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-khaista-turquoise" />
                  <div>
                    <div className="font-medium text-sm">Secure Payment</div>
                    <div className="text-xs text-gray-600">SSL encrypted</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <RefreshCcw className="h-5 w-5 text-khaista-turquoise" />
                  <div>
                    <div className="font-medium text-sm">Free Exchanges</div>
                    <div className="text-xs text-gray-600">&amp; Alterations</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
