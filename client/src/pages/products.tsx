import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { useMemo, useState, useEffect } from "react";
import ProductCard, { type ProductForCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@shared/schema";

const BASE = import.meta.env.BASE_URL;
const CATALOG_VERSION = 3;
const CATALOG_URL = `${BASE}api/products.json?v=${CATALOG_VERSION}`;

async function fetchAllProducts(): Promise<ProductForCard[]> {
  const res = await fetch(CATALOG_URL, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load products.json (${res.status})`);
  const data = (await res.json()) as (Product & {
    image?: string;
    imageUrl?: string;
    imageAlt?: string | null;
  })[];
  return data.map((p) => {
    const src = p.image ?? p.imageUrl ?? "";
    return {
      ...p,
      image: src || undefined,
      imageUrl: src || "",
      imageAlt: p.imageAlt ?? undefined,
    } as ProductForCard;
  });
}

// Map route "clothing" -> UI category "dresses" (but filter by "clothing")
const normalizeForUI = (raw: string) =>
  raw === "clothing" ? "dresses" : raw;

export default function Products() {
  const [, params] = useRoute("/products/:category");
  const rawParam = (params?.category ?? "all").toLowerCase();
  const uiFromRoute = normalizeForUI(rawParam);

  const [selectedCategory, setSelectedCategory] = useState<string>(uiFromRoute);
  useEffect(() => setSelectedCategory(uiFromRoute), [uiFromRoute]);

  const { data: allProducts = [], isLoading } = useQuery<ProductForCard[]>({
    queryKey: ["products", CATALOG_VERSION],
    queryFn: fetchAllProducts,
  });

  const products = useMemo(() => {
    if (selectedCategory === "all") return allProducts;
    const wanted = selectedCategory === "dresses" ? "clothing" : selectedCategory;
    return allProducts.filter((p) => p.category?.toLowerCase() === wanted);
  }, [allProducts, selectedCategory]);

  const categories = [
    { value: "all", label: "All Products" },
    { value: "jewelry", label: "Jewelry" },
    { value: "dresses", label: "Dresses" }, // UI label
    { value: "bags", label: "Bags" },
  ] as const;

  const categoryInfo = {
    all: {
      title: "All Products",
      description: "Discover our complete collection of authentic Afghan handcrafted items",
    },
    jewelry: {
      title: "Afghan Jewelry Collection",
      description:
        "Discover our exquisite collection of traditional Afghan jewelry, handcrafted by skilled artisans using techniques passed down through generations.",
    },
    dresses: {
      title: "Traditional Dresses",
      description:
        "Stunning Kochi and Pashtun dresses with intricate embroidery and authentic patterns.",
    },
    bags: {
      title: "Handwoven Bags",
      description:
        "Colorful traditional bags featuring vintage patterns and vibrant embroidered designs.",
    },
  } as const;

  const currentInfo =
    categoryInfo[(selectedCategory as keyof typeof categoryInfo)] ?? categoryInfo.all;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-khaista-cream py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-khaista-charcoal mb-4">
            {currentInfo.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{currentInfo.description}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-serif">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category.value}
                    variant="ghost"
                    className={`w-full justify-start rounded-lg transition-all ${
                      selectedCategory === category.value
                        ? "bg-khaista-light-pink text-khaista-pink font-semibold"
                        : "text-khaista-charcoal hover:bg-khaista-pink hover:text-white"
                    }`}
                    onClick={() => setSelectedCategory(category.value)}
                  >
                    {category.label}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Count */}
            <Card className="mt-4">
              <CardContent className="pt-6 text-center">
                <div className="text-2xl font-bold text-khaista-turquoise">{products.length}</div>
                <div className="text-sm text-gray-600">Products Found</div>
              </CardContent>
            </Card>
          </aside>

          {/* Grid */}
          <main className="flex-1">
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <Badge
                  key={category.value}
                  variant="secondary"
                  className={`cursor-pointer rounded-lg transition-all ${
                    selectedCategory === category.value
                      ? "bg-khaista-light-pink text-khaista-pink font-semibold"
                      : "text-khaista-charcoal hover:bg-khaista-pink hover:text-white"
                  }`}
                  onClick={() => setSelectedCategory(category.value)}
                >
                  {category.label}
                </Badge>
              ))}
            </div>

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
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 text-lg">No products found.</div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
