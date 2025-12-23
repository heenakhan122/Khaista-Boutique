import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/lib/wishlist-store";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/shared/schema";

interface WishlistButtonProps {
  product: Product;
  className?: string;
}

export function WishlistButton({ product, className = "" }: WishlistButtonProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const { toast } = useToast();
  const inWishlist = isInWishlist(product.id);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist(product);
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };

  return (
    <Button
      onClick={handleToggleWishlist}
      className={`bg-white/90 hover:bg-white text-khaista-pink hover:text-red-500 shadow-sm ${className}`}
      size="icon"
      variant="ghost"
    >
      <Heart className={`h-5 w-5 ${inWishlist ? 'fill-current' : ''}`} />
    </Button>
  );
}