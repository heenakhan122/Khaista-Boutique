import { Link } from "wouter";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cart-store";
import { useWishlistStore } from "@/lib/wishlist-store";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/shared/schema";

export default function Wishlist() {
  const { items: wishlistItems, removeFromWishlist, clearWishlist } = useWishlistStore();
  const { addItem } = useCartStore();
  const { toast } = useToast();

  const handleAddToCart = (item: Product) => {
    addItem(item, 1);
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const handleRemoveFromWishlist = (itemId: string) => {
    removeFromWishlist(itemId);
    toast({
      title: "Removed from wishlist",
      description: "Item has been removed from your wishlist.",
    });
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-khaista-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Heart className="mx-auto h-24 w-24 text-khaista-soft-pink mb-6" />
            <h1 className="text-4xl font-serif font-bold text-khaista-charcoal mb-4">
              Your Wishlist is Empty
            </h1>
            <p className="text-xl text-khaista-gray mb-8 max-w-2xl mx-auto">
              Start building your collection of beautiful Afghan handmade treasures. 
              Click the heart icon on any product to add it to your wishlist.
            </p>
            <Link href="/products">
              <Button className="bg-khaista-pink hover:bg-khaista-pink/90 text-white font-serif text-lg px-8 py-3">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-khaista-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <Heart className="mx-auto h-16 w-16 text-khaista-pink mb-6" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-khaista-charcoal mb-4">
            Your Wishlist
          </h1>
          <p className="text-xl text-khaista-gray mb-6">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} you love
          </p>
          {wishlistItems.length > 0 && (
            <Button
              onClick={clearWishlist}
              variant="outline"
              className="border-khaista-pink text-khaista-pink hover:bg-khaista-pink hover:text-white"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Wishlist
            </Button>
          )}
        </div>

        {/* Wishlist Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Button
                  onClick={() => handleRemoveFromWishlist(item.id)}
                  className="absolute top-3 right-3 bg-white/90 hover:bg-white text-khaista-pink hover:text-red-500 shadow-sm"
                  size="icon"
                  variant="ghost"
                >
                  <Heart className="h-5 w-5 fill-current" />
                </Button>
              </div>
              
              <div className="p-6">
                <Link href={`/products/${item.id}`}>
                  <h3 className="text-lg font-serif font-semibold text-khaista-charcoal mb-2 hover:text-khaista-pink transition-colors cursor-pointer">
                    {item.name}
                  </h3>
                </Link>
                
                <p className="text-khaista-gray text-sm mb-3 line-clamp-2">
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-khaista-pink">
                    ${item.price}
                  </span>
                  <Button
                    onClick={() => handleAddToCart(item)}
                    className="bg-khaista-pink hover:bg-khaista-pink/90 text-white"
                    size="sm"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Shopping */}
        <div className="text-center mt-16">
          <Link href="/products">
            <Button 
              variant="outline" 
              className="border-khaista-pink text-khaista-pink hover:bg-khaista-pink hover:text-white font-serif text-lg px-8 py-3"
            >
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}