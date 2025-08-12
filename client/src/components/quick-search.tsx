import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Search, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@shared/schema";

interface QuickSearchProps {
  isVisible: boolean;
  onClose: () => void;
}

export function QuickSearch({ isVisible, onClose }: QuickSearchProps) {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  // Filter products based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    if (!products || products.length === 0) {
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = products
      .filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      )
      .slice(0, 6); // Limit to 6 results for quick preview

    setSearchResults(prev => {
      // Only update if results are actually different
      if (JSON.stringify(prev) !== JSON.stringify(filtered)) {
        return filtered;
      }
      return prev;
    });
  }, [searchQuery, products]);

  const handleProductClick = (productId: string) => {
    setLocation(`/product/${productId}`);
    onClose();
    setSearchQuery("");
  };

  const handleViewAll = () => {
    if (searchQuery.trim()) {
      setLocation(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      onClose();
      setSearchQuery("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "Enter" && searchQuery.trim()) {
      handleViewAll();
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-start justify-center pt-20"
      onClick={onClose}
    >
      <Card 
        className="w-full max-w-2xl mx-4 shadow-xl animate-in fade-in-0 zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <CardContent className="p-0">
          {/* Search Input */}
          <div className="p-6 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for jewelry, clothing, bags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-12 pr-4 py-3 text-lg border-khaista-soft-pink focus:border-khaista-pink text-base"
                autoFocus
              />
            </div>
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {searchQuery.trim() && searchResults.length === 0 && (
              <div className="p-6 text-center text-gray-500">
                <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p>No products found for "{searchQuery}"</p>
              </div>
            )}

            {searchResults.length > 0 && (
              <div className="p-4">
                <div className="grid gap-3">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleProductClick(product.id)}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-khaista-charcoal truncate">
                            {product.name}
                          </h4>
                          <Badge variant="secondary" className="text-xs">
                            {product.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          {product.description}
                        </p>
                        <p className="text-sm font-semibold text-khaista-turquoise mt-1">
                          ${product.price}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    </div>
                  ))}
                </div>

                {searchResults.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button
                      onClick={handleViewAll}
                      className="w-full p-3 text-center text-khaista-pink hover:bg-khaista-light-pink rounded-lg transition-colors font-medium"
                    >
                      View all results for "{searchQuery}" →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="p-4 bg-gray-50 text-xs text-gray-500 text-center border-t">
            Press Enter to search • Press Escape to close
          </div>
        </CardContent>
      </Card>
    </div>
  );
}