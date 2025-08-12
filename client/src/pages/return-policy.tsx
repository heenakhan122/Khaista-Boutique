import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function ReturnPolicy() {

  return (
    <div className="min-h-screen bg-khaista-cream">
      {/* Hero Section */}
      <section className="bg-khaista-soft-pink py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-khaista-charcoal mb-4">
              Return & Exchange Policy
            </h1>
            <p className="text-xl text-khaista-gray max-w-3xl mx-auto">
              Supporting our Afghan artisans through our exchange and alteration policies.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="border-khaista-pink text-khaista-pink hover:bg-khaista-pink hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Policy Content */}
        <section className="space-y-8">
          <Card className="border-khaista-soft-pink">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold text-khaista-charcoal mb-6">
                All Sales Final - No Returns
              </h2>
              
              <div className="space-y-4 text-khaista-gray">
                <p className="text-lg">
                  Due to the handmade nature of our products and support for our Afghan artisans, we do not accept returns.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-khaista-soft-pink">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold text-khaista-charcoal mb-6">
                Free Exchanges & Alterations
              </h2>
              
              <div className="space-y-4 text-khaista-gray">
                <p className="text-lg mb-4">
                  We offer <strong>free exchanges</strong> and <strong>free alterations</strong> within 30 days of purchase to ensure your complete satisfaction.
                </p>
                
                <ul className="space-y-2 text-lg">
                  <li>• Exchanges available for different sizes or colors (subject to availability)</li>
                  <li>• Free alterations through our Khaista Tailors network</li>
                  <li>• Contact us within 30 days to arrange exchanges or alterations</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="border-khaista-soft-pink bg-khaista-soft-pink">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-serif font-bold text-khaista-charcoal mb-4">
                Need Help?
              </h2>
              <p className="text-khaista-gray mb-6">
                Our customer service team is here to assist you with returns, exchanges, or any questions about your order.
              </p>
              <div className="space-y-2">
                <p className="text-khaista-charcoal font-medium">
                  Email: support@khaistaboutique.com
                </p>
                <p className="text-khaista-charcoal font-medium">
                  Phone: +1 (555) 123-4567
                </p>
                <p className="text-khaista-gray text-sm">
                  Business Hours: Monday - Friday, 9 AM - 6 PM EST
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}