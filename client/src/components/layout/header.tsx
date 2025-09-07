import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCartStore } from "@/lib/cart-store";
import { useWishlistStore } from "@/lib/wishlist-store";
import { QuickSearch } from "@/components/quick-search";
import khaistaBoutiqueLogo from "@assets/Khaista_Boutique_Logo_1754950449795.jpg";

export default function Header() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showQuickSearch, setShowQuickSearch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const totalItems = useCartStore(state => state.getTotalItems());
  const totalWishlistItems = useWishlistStore(state => state.getTotalItems());

  // Handle scroll event to show/hide minimal header
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 100); // Show minimal header after 100px scroll
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const leftNavigation = [
    { name: "What's New", href: "/whats-new" },
  ];

  const shopCategories = [
    { name: "All Products", href: "/products" },
    { name: "Jewelry", href: "/products/jewelry" },
    { name: "Bags", href: "/products/bags" },
    { name: "Clothing", href: "/products/clothing" },
  ];

  const rightNavigation = [
    { name: "Khaista Tailors", href: "/tailors" },
    { name: "Artisan Spotlight", href: "/artisan-spotlight" },
    { name: "Our Impact + Story", href: "/about" },
  ];

  return (
    <>
      {/* Main Header */}
      <header className={`bg-khaista-white shadow-sm sticky top-0 z-50 border-b border-khaista-soft-pink transition-transform duration-300 ${
        isScrolled ? '-translate-y-full' : 'translate-y-0'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24 md:h-28">
            {/* Logo on Left */}
            <div className="flex-shrink-0">
              <Link href="/">
                <img 
                  src={khaistaBoutiqueLogo} 
                  alt="Khaista Boutique" 
                  className="h-20 w-auto md:h-24"
                />
              </Link>
            </div>

          {/* Center Navigation */}
          <nav className="hidden md:flex space-x-8">
            {leftNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-serif font-medium transition-all text-lg px-4 py-2 rounded-lg ${
                  location === item.href
                    ? "text-khaista-pink bg-khaista-light-pink"
                    : "text-khaista-charcoal hover:text-white hover:bg-khaista-pink"
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Shop Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={`font-serif font-medium transition-all px-4 py-2 rounded-lg h-auto text-lg ${
                    location.startsWith('/products')
                      ? "text-khaista-pink bg-khaista-light-pink"
                      : "text-khaista-charcoal hover:text-white hover:bg-khaista-pink"
                  }`}
                >
                  Shop
                  <ChevronDown className="ml-1 h-4 w-4 text-khaista-pink" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-khaista-white border-khaista-soft-pink">
                {shopCategories.map((category) => (
                  <DropdownMenuItem key={category.name} asChild>
                    <Link
                      href={category.href}
                      className={`cursor-pointer font-serif transition-colors data-[highlighted]:bg-transparent data-[highlighted]:text-khaista-pink ${
                        location === category.href
                          ? "text-khaista-pink font-semibold"
                          : "text-khaista-charcoal hover:text-khaista-pink focus:text-khaista-pink"
                      }`}
                    >
                      {category.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {rightNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-serif font-medium transition-all text-lg px-4 py-2 rounded-lg ${
                  location === item.href
                    ? "text-khaista-pink bg-khaista-light-pink"
                    : "text-khaista-charcoal hover:text-white hover:bg-khaista-pink"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setShowQuickSearch(!showQuickSearch)}
            >
              <Search className="h-5 w-5 text-khaista-pink hover:text-khaista-pink/80" />
            </Button>
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5 text-khaista-pink hover:text-khaista-pink/80" />
                {totalWishlistItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-khaista-pink text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalWishlistItems}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5 text-khaista-pink hover:text-khaista-pink/80" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-khaista-pink text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            
            {/* Mobile menu button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5 text-khaista-pink" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-6">
                  {leftNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-serif font-medium transition-colors ${
                        location === item.href
                          ? "text-khaista-pink"
                          : "text-khaista-charcoal hover:text-khaista-pink"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  {/* Shop section in mobile */}
                  <div className="space-y-2">
                    <div className="text-lg font-serif font-medium text-khaista-charcoal">Shop</div>
                    {shopCategories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.href}
                        onClick={() => setIsOpen(false)}
                        className={`block text-base font-serif pl-4 transition-colors ${
                          location === category.href
                            ? "text-khaista-pink"
                            : "text-khaista-gray hover:text-khaista-pink"
                        }`}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                  
                  {rightNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-serif font-medium transition-colors ${
                        location === item.href
                          ? "text-khaista-pink"
                          : "text-khaista-charcoal hover:text-khaista-pink"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      </header>

      {/* Minimal Scrolled Header */}
      <header className={`bg-white/95 backdrop-blur-sm shadow-md fixed top-0 w-full z-50 border-b border-khaista-soft-pink transition-transform duration-300 ${
        isScrolled ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Hamburger Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6 text-khaista-pink" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-serif font-bold text-khaista-charcoal">Menu</h2>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <nav className="flex flex-col space-y-4">
                  {leftNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-serif font-medium text-khaista-charcoal hover:text-khaista-pink transition-colors py-2"
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-lg font-serif font-semibold text-khaista-charcoal mb-3">Shop</h3>
                    {shopCategories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.href}
                        onClick={() => setIsOpen(false)}
                        className="block text-base font-serif text-khaista-charcoal hover:text-khaista-pink transition-colors py-2 pl-4"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    {rightNavigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block text-lg font-serif font-medium text-khaista-charcoal hover:text-khaista-pink transition-colors py-2"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>

            {/* Desktop Hamburger Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <Menu className="h-6 w-6 text-khaista-pink" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-serif font-bold text-khaista-charcoal">Menu</h2>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <nav className="flex flex-col space-y-4">
                  {leftNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-serif font-medium text-khaista-charcoal hover:text-khaista-pink transition-colors py-2"
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-lg font-serif font-semibold text-khaista-charcoal mb-3">Shop</h3>
                    {shopCategories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.href}
                        onClick={() => setIsOpen(false)}
                        className="block text-base font-serif text-khaista-charcoal hover:text-khaista-pink transition-colors py-2 pl-4"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    {rightNavigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block text-lg font-serif font-medium text-khaista-charcoal hover:text-khaista-pink transition-colors py-2"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>

            {/* Centered Brand Name */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link href="/">
                <h1 className="text-xl md:text-2xl font-serif font-bold text-khaista-pink tracking-wide hover:text-khaista-pink/80 transition-colors">
                  Khaista Boutique
                </h1>
              </Link>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowQuickSearch(!showQuickSearch)}
                className="hidden sm:flex"
              >
                <Search className="h-5 w-5 text-khaista-pink hover:text-khaista-pink/80" />
              </Button>
              <Link href="/wishlist">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="h-5 w-5 text-khaista-pink hover:text-khaista-pink/80" />
                  {totalWishlistItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-khaista-pink text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {totalWishlistItems}
                    </span>
                  )}
                </Button>
              </Link>
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingBag className="h-5 w-5 text-khaista-pink hover:text-khaista-pink/80" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-khaista-pink text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      {/* Quick Search Overlay */}
      <QuickSearch 
        isVisible={showQuickSearch} 
        onClose={() => setShowQuickSearch(false)}
      />
    </>
  );
}