import { Link } from "wouter";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCartStore } from "@/lib/cart-store";
import { WishlistButton } from "@/components/wishlist-button";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product & { image?: string; imageUrl?: string; imageAlt?: string };
}

// GitHub Pages serves your app at /<repo>/
// Vite exposes that as import.meta.env.BASE_URL (e.g., "/Khaista-Boutique/")
const BASE = import.meta.env.BASE_URL;

/** Build an <img> src that works in production:
 * - If it's an absolute URL (http/https) → return as-is
 * - If it starts with "/" → return as-is (you probably already prefixed)
 * - Else treat it as a file from client/public and prefix BASE
 * Also strips any leading "/" to avoid double slashes.
 */
function toSrc(p?: string) {
  if (!p) return undefined;
  if (/^https?:\/\//i.test(p) || p.startsWith("/")) return p;
  return BASE + p.replace(/^\/+/, "");
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  // Prefer product.image, else imageUrl (so it works whether you import images in TS or load from JSON)
  const imgSrc = toSrc(product.image ?? (product as any).imageUrl);

  return (
    <Link href={`/product/${product.id}`}>
      <Card className="group cursor-pointer border-0 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <CardContent className="p-0">
          <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square mb-4">
            <img
              src={imgSrc}
              alt={product.imageAlt || product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <WishlistButton
                product={product}
                className="bg-white/90 hover:bg-white shadow-md"
              />
            </div>
            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="default"
                size="icon"
                className="bg-khaista-turquoise hover:bg-khaista-turquoise/90 shadow-md"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="px-2">
            <h3 className="font-semibold text-khaista-charcoal mb-1 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {product.description}
            </p>
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-khaista-turquoise">${product.price}</p>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {product.category}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
