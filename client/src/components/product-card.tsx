// client/src/components/product-card.tsx
import { Link } from "wouter";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCartStore } from "@/lib/cart-store";
import { WishlistButton } from "@/components/wishlist-button";
import type { Product } from "@shared/schema";
import { assetUrl } from "@/lib/asset-url";

/** Looser shape the card can accept from pages */
export type ProductForCard = Omit<Product, "imageAlt"> & {
  imageUrl: string;
  image?: string;
  imageAlt?: string | null | undefined;
};

interface ProductCardProps {
  product: ProductForCard;
}

const BASE = import.meta.env.BASE_URL;

// FIX: always prefix BASE for non-HTTP paths, including those starting with "/"
const toSrc = (p?: string) => {
  if (!p) return undefined;
  if (/^https?:\/\//i.test(p)) return p;                  // absolute URL
  return BASE + p.replace(/^\/+/, "");                    // relative or "/..." -> BASE + path
};

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  // Normalize to a strict Product
  const canonical: Product = {
    ...(product as unknown as Product),
    imageUrl: product.image ?? product.imageUrl,
    imageAlt: product.imageAlt ?? null,
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // don't navigate when clicking the add button
    addItem(canonical);
  };

  const imgSrc = assetUrl(product.image ?? product.imageUrl);
  <img
  src={imgSrc}
  alt={canonical.imageAlt ?? canonical.name}
  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
  loading="lazy"
/>
  return (
    <Link href={`/product/${product.id}`}>
      <Card className="group cursor-pointer border-0 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <CardContent className="p-0">
          <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square mb-4">
            <img
              src={imgSrc}
              alt={canonical.imageAlt ?? canonical.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />

            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <WishlistButton product={canonical} className="bg-white/90 hover:bg-white shadow-md" />
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
              {canonical.name}
            </h3>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {canonical.description}
            </p>
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-khaista-turquoise">${canonical.price}</p>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {canonical.category}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
