import React from "react";
import { Route, Switch } from "wouter";

import Home from "@/pages/home";
import WhatsNew from "@/pages/whats-new";
import Products from "@/pages/products"; // ← unified products page
// ⛔️ remove these old category pages
// import ProductsJewelry from "@/pages/products-jewelry";
// import ProductsBags from "@/pages/products-bags";
// import ProductsClothing from "@/pages/products-clothing";

import ProductDetail from "@/pages/product-detail";
import Cart from "@/pages/cart";
import Checkout from "@/pages/checkout";
import OrderConfirmation from "@/pages/order-confirmation";
import SearchPage from "@/pages/search";
import Wishlist from "@/pages/wishlist";
import Tailors from "@/pages/tailors";
import About from "@/pages/about";
import ArtisanSpotlight from "@/pages/artisan-spotlight";
import ReturnPolicy from "@/pages/return-policy";
import NotFound from "@/pages/not-found";

import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { queryClient } from "./lib/queryClient";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/whats-new" component={WhatsNew} />

              {/* ✅ One Products component handles base and categories */}
              <Route path="/products" component={Products} />
              <Route path="/products/" component={Products} />
              <Route path="/products/:category" component={Products} />
              <Route path="/products/:category/" component={Products} />

              {/* ✅ Detail accepts both /product/:id and /products/:id, with/without trailing slash */}
              <Route path="/product/:id" component={ProductDetail} />
              <Route path="/product/:id/" component={ProductDetail} />
              <Route path="/products/:id" component={ProductDetail} />
              <Route path="/products/:id/" component={ProductDetail} />

              <Route path="/cart" component={Cart} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/order-confirmation" component={OrderConfirmation} />
              <Route path="/search" component={SearchPage} />
              <Route path="/wishlist" component={Wishlist} />
              <Route path="/tailors" component={Tailors} />
              <Route path="/about" component={About} />
              <Route path="/artisan-spotlight" component={ArtisanSpotlight} />
              <Route path="/return-policy" component={ReturnPolicy} />

              {/* Keep fallback LAST */}
              <Route component={NotFound} />
            </Switch>
          </main>
          <Footer />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
