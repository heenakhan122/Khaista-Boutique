import { useQuery } from "@tanstack/react-query";
import ProductCard, { type ProductForCard } from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@shared/schema";

const BASE = import.meta.env.BASE_URL;
const withBase = (p: string) =>
  /^https?:\/\//i.test(p) || p.startsWith("/") ? p : BASE + p.replace(/^\/+/, "");

async function fetchAllProducts(): Promise<ProductForCard[]> {
  const res = await fetch(BASE + "api/products.json");
  if (!res.ok) throw new Error(`Failed to load products.json (${res.status})`);
  const data = (await res.json()) as (Product & { image?: string; imageUrl?: string; imageAlt?: string | null })[];

  return data.map((p) => {
    const src = p.image ?? p.imageUrl!;
    const img = withBase(src);
    return { ...p, image: img, imageUrl: img, imageAlt: p.imageAlt ?? undefined } as ProductForCard;
  });
}

async function fetchFeaturedProducts(): Promise<ProductForCard[]> {
  const [all, ids] = await Promise.all([
    fetchAllProducts(),
    fetch(BASE + "api/featured-products.json").then((r) => {
      if (!r.ok) throw new Error(`Failed to load featured-products.json (${r.status})`);
      return r.json() as Promise<{ id: string }[]>;
    }),
  ]);
  const wanted = new Set(ids.map((x) => x.id));
  return all.filter((p) => wanted.has(p.id));
}

export default function Home() {
  const { data: featuredProducts = [], isLoading } = useQuery<ProductForCard[]>({
    queryKey: ["featured-products"],
    queryFn: fetchFeaturedProducts,
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6">Featured</h2>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
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
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
