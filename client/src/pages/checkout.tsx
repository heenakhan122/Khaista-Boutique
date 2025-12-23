import { useStripe, Elements, PaymentElement, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { ArrowLeft, CreditCard, Lock, Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useCartStore } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const publicKey =
  import.meta.env.VITE_STRIPE_PUBLIC_KEY ||
  "pk_test_51RvPZtBLYWlN2MSl5vv8yjoDHckMpX9LVxaGN3KGSTQEFhEmD6vGulxyYpDEp2OUe29gBYXcyP0f5lWIVtxWHsW000BvgI9oH3";
const stripePromise = loadStripe(publicKey);

// Detect static hosting (GitHub Pages) where no backend exists
const isStaticHost =
  typeof window !== "undefined" &&
  (location.hostname.endsWith("github.io") || location.protocol === "file:");

/* ----------------------- Stripe checkout form ----------------------- */
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { clearCart, getTotalPrice } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}${import.meta.env.BASE_URL}order-confirmation` },
    });

    if (error) {
      toast({ title: "Payment Failed", description: error.message, variant: "destructive" });
      setIsProcessing(false);
    } else {
      clearCart();
      toast({ title: "Payment Successful", description: "Thank you for supporting Afghan artisans!" });
      setLocation("/order-confirmation");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PaymentElement />
        </CardContent>
      </Card>

      <div className="flex items-center justify-center text-sm text-gray-600 mb-4">
        <Lock className="h-4 w-4 mr-2" />
        Your payment information is secure and encrypted
      </div>

      <Button
        type="submit"
        className="w-full bg-khaista-pink hover:bg-khaista-pink/90 font-serif text-lg py-6"
        disabled={!stripe || isProcessing}
      >
        {isProcessing ? "Processing..." : `Complete Purchase`}
      </Button>
    </form>
  );
};

/* ----------------------- Page wrapper with fallback ----------------------- */
export default function Checkout() {
  const [clientSecret, setClientSecret] = useState<string>("");
  const [status, setStatus] = useState<"loading" | "demo" | "stripe">("loading");
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // simulate checkout for static hosting or failed backend
  const runDemoCheckout = async () => {
    setStatus("demo");
    // Save lightweight order for confirmation page (optional)
    try {
      const payload = {
        id: `demo-${Date.now()}`,
        subtotal: getTotalPrice(),
        items: items.map((i: any) => ({
          id: String(i.product.id),
          name: i.product.name,
          qty: i.quantity,
          price: i.product.price,
        })),
      };
      sessionStorage.setItem("lastOrder", JSON.stringify(payload));
    } catch {}
    await new Promise((r) => setTimeout(r, 700));
    clearCart();
    toast({ title: "Checkout complete (demo)" });
    setLocation("/order-confirmation");
  };

  useEffect(() => {
    // If cart is empty, bounce to cart
    if (!items || items.length === 0) {
      setLocation("/cart");
      return;
    }

    const createPI = async () => {
      if (isStaticHost) {
        // No backend on GitHub Pages -> use demo flow
        return runDemoCheckout();
      }

      try {
        const totalAmount = getTotalPrice();
        const res = await apiRequest("POST", "/api/create-payment-intent", {
          amount: totalAmount,
          currency: "usd",
        });
        const data = await res.json();
        if (!data?.clientSecret) throw new Error("Missing clientSecret");
        setClientSecret(data.clientSecret);
        setStatus("stripe");
      } catch (err) {
        // Backend unavailable or error -> demo fallback
        runDemoCheckout();
      }
    };

    createPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items?.length]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-khaista-cream flex items-center justify-center">
        <div className="text-center text-khaista-gray">
          <Loader2 className="h-8 w-8 animate-spin text-khaista-pink mx-auto mb-3" />
          Preparing your checkout...
        </div>
      </div>
    );
  }

  // If demo mode, we immediately navigate to order-confirmation after short delay above
  if (status === "demo") {
    return (
      <div className="min-h-screen bg-khaista-cream flex items-center justify-center">
        <div className="text-center text-khaista-gray">
          <Loader2 className="h-8 w-8 animate-spin text-khaista-pink mx-auto mb-3" />
          Backend unavailable — completing demo checkout…
        </div>
      </div>
    );
  }

  // Stripe mode
  return (
    <div className="min-h-screen bg-khaista-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/cart">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Cart
            </Button>
          </Link>
          <h1 className="text-3xl font-serif font-bold text-khaista-charcoal">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item: any) => (
                  <div key={item.product.id} className="flex items-center space-x-4">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="h-16 w-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-khaista-charcoal">{item.product.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {item.product.category}
                        </Badge>
                        <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-khaista-turquoise">
                        ${(Number(item.product.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-khaista-turquoise">${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-khaista-soft-pink p-4 rounded-lg">
                  <p className="text-sm text-khaista-charcoal">
                    <strong>Supporting Afghan Artisans:</strong> Your purchase directly supports Afghan women artisans and their families through our partnership with the Afghanistan Women's Council.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Form */}
          <div>
            {clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
