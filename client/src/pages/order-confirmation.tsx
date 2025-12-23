import { useEffect } from "react";
import { CheckCircle, Heart, Home, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";

export default function OrderConfirmation() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-khaista-cream">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-serif font-bold text-khaista-charcoal mb-4">
            Order Confirmed!
          </h1>
          <p className="text-xl text-khaista-gray">
            Thank you for supporting Afghan women artisans
          </p>
        </div>

        {/* Order Details */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Your Order Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-khaista-soft-pink p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-6 w-6 text-khaista-pink" />
                <h3 className="text-lg font-semibold text-khaista-charcoal">
                  Making a Difference
                </h3>
              </div>
              <p className="text-khaista-gray leading-relaxed">
                Your purchase directly supports Afghan women artisans and their families. Through our partnership with the Afghanistan Women's Council, you're helping preserve traditional crafts while providing economic empowerment to women in Afghanistan.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-khaista-charcoal mb-2">What's Next?</h4>
                <ul className="space-y-2 text-sm text-khaista-gray">
                  <li>• You'll receive an email confirmation shortly</li>
                  <li>• Your order will be carefully handcrafted</li>
                  <li>• Shipping typically takes 7-14 business days</li>
                  <li>• We'll send tracking information once shipped</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-khaista-charcoal mb-2">Need Help?</h4>
                <div className="space-y-2 text-sm text-khaista-gray">
                  <p>Questions about your order?</p>
                  <p>Email: support@khaistaboutique.com</p>
                  <p className="text-xs">We typically respond within 24 hours</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Artisan Impact */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-serif font-semibold text-khaista-charcoal mb-4">
                Your Impact
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-khaista-turquoise mb-2">100+</div>
                  <div className="text-sm text-khaista-gray">Women Artisans Supported</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-khaista-turquoise mb-2">1</div>
                  <div className="text-sm text-khaista-gray">Family Empowered by Your Order</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-khaista-turquoise mb-2">∞</div>
                  <div className="text-sm text-khaista-gray">Cultural Heritage Preserved</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="bg-khaista-pink hover:bg-khaista-pink/90 font-serif">
              <Home className="h-4 w-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
          <Link href="/artisan-spotlight">
            <Button variant="outline" className="border-khaista-pink text-khaista-pink hover:bg-khaista-pink hover:text-white font-serif">
              Meet Our Artisans
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}