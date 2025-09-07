import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { useMemo, useState } from "react";
import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@shared/schema";

const BASE = import.meta.env.BASE_URL; // e.g. "/Khaista-Boutique/"
const withBase = (p?: string) =>
  !p ? p : /^https?:\/\//i.test(p) || p.startsWith("/") ? p : BASE + p.replace(/^\/+/, "");

async function fetchAllProducts(): Promise<Product[]> {
  // ✅ static file under client/public/api/products.json
  const res = await fetch(BASE + "api/products.json");
  if (!res.ok) throw new Error(`Failed to load products.json (${res.status})`);
  const data = (await res.json()) as any[];
  // normalize image fields so ProductCard can use either image or imageUrl
  return data.map((p) => {
    const img = withBase(p.image ?? p.imageUrl);
    return { ...p, image: img, imageUrl: img } as Product & { image?: string; imageUrl?: string };
  });
}

export default function Products() {
  const [, params] = useRoute("/products/:category");
  const [selectedCategory, setSelectedCategory] = useState<string>(params?.category || "all");

  const { data: allProducts = [], isLoading } = useQuery<Product[]>({
    queryKey: ["products"],       // one request; filter client-side
    queryFn: fetchAllProducts,
  });

  const products = useMemo(() => {
    if (selectedCategory === "all") return allProducts;
    return allProducts.filter(
      (p: any) => p.category?.toLowerCase() === selectedCategory
    );
  }, [allProducts, selectedCategory]);

  const categories = [
    { value: "all", label: "All Products" },
    { value: "jewelry", label: "Jewelry" },
    { value: "dresses", label: "Dresses" },
    { value: "bags", label: "Bags" },
  ];

  const categoryInfo = {
    all: {
      title: "All Products",
      description: "Discover our complete collection of authentic Afghan handcrafted items"
    },
    jewelry: {
      title: "Traditional Jewelry",
      description: "Exquisite handcrafted jewelry featuring traditional Afghan designs with silver work and natural stones"
    },
    dresses: {
      title: "Traditional Dresses",
      description: "Stunning Kochi and Pashtun dresses with intricate embroidery and authentic patterns"
    },
    bags: {
      title: "Handwoven Bags",
      description: "Colorful traditional bags featuring vintage patterns and vibrant embroidered designs"
    }
  } as const;

  const currentInfo = categoryInfo[(selectedCategory as keyof typeof categoryInfo) || "all"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-khaista-cream py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-khaista-charcoal mb-4">
            {currentInfo.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {currentInfo.description}
          </p>
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
                <div className="text-2xl font-bold text-khaista-turquoise">
                  {products?.length || 0}
                </div>
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
            ) : products && products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 text-lg">
                No products found in this category.
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
