import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, CreditCard, Lock } from 'lucide-react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useCartStore } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const publicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY || "pk_test_51RvPZtBLYWlN2MSl5vv8yjoDHckMpX9LVxaGN3KGSTQEFhEmD6vGulxyYpDEp2OUe29gBYXcyP0f5lWIVtxWHsW000BvgI9oH3";
const stripePromise = loadStripe(publicKey);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { items, clearCart, getTotalPrice } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-confirmation`,
      },
    });

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
      setIsProcessing(false);
    } else {
      // Clear cart on successful payment
      clearCart();
      toast({
        title: "Payment Successful",
        description: "Thank you for supporting Afghan artisans!",
      });
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
        {isProcessing ? "Processing..." : `Complete Purchase - $${getTotalPrice().toFixed(2)}`}
      </Button>
    </form>
  );
};

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const { items, getTotalPrice } = useCartStore();
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Redirect to cart if no items
    if (items.length === 0) {
      setLocation("/cart");
      return;
    }

    // Create PaymentIntent as soon as the page loads
    const totalAmount = getTotalPrice();
    apiRequest("POST", "/api/create-payment-intent", { 
      amount: totalAmount,
      currency: "usd"
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        console.error("Failed to create payment intent:", error);
      });
  }, [items.length, getTotalPrice, setLocation]);

  if (items.length === 0) {
    return null; // Will redirect to cart
  }

  if (!clientSecret) {
    return (
      <div className="min-h-screen bg-khaista-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-khaista-pink border-t-transparent rounded-full mx-auto mb-4" aria-label="Loading"/>
          <p className="text-khaista-gray">Preparing your checkout...</p>
        </div>
      </div>
    );
  }

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
          <h1 className="text-3xl font-serif font-bold text-khaista-charcoal">
            Checkout
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-4">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="h-16 w-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-khaista-charcoal">
                        {item.product.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {item.product.category}
                        </Badge>
                        <span className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-khaista-turquoise">
                        ${(parseFloat(item.product.price.toString()) * item.quantity).toFixed(2)}
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
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
}