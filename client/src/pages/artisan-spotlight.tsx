import { Heart, MapPin, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import NewsletterSignup from "@/components/newsletter-signup";

export default function ArtisanSpotlight() {
  return (
    <div className="min-h-screen bg-khaista-white">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-r from-khaista-pink to-khaista-light-pink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              Artisan Spotlight
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
              Meet the remarkable women behind our handcrafted pieces. Each artisan has a unique story of resilience, skill, and determination.
            </p>
          </div>
        </div>
      </section>

      {/* Artisan Stories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Aziza's Story */}
          <div className="max-w-6xl mx-auto mb-24">
            {/* Header */}
            <div className="text-center mb-12">
              <Badge className="bg-khaista-pink text-white mb-4 px-4 py-2">Featured Artisan</Badge>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-khaista-charcoal mb-4">
                Aziza's Journey of Hope
              </h2>
              <div className="flex items-center justify-center gap-4 text-khaista-gray">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Kart-e-Naw, Kabul</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Mother of 3</span>
                </div>
              </div>
            </div>

            {/* Main Story Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
              <div className="relative overflow-hidden rounded-xl shadow-2xl">
                <img 
                  src="/assets/Aziza_1755027641823.jpg" 
                  alt="Aziza working at her sewing machine, focused on creating traditional Afghan garments" 
                  className="w-full h-96 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <p className="text-white text-sm font-medium">
                    Aziza at work - transforming fabric into beautiful traditional pieces
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <Card className="border-khaista-soft-pink">
                  <CardHeader>
                    <CardTitle className="text-xl font-serif text-khaista-charcoal">
                      From Struggle to Strength
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      "I am a woman who tolerated lots of pain and sorrow in my life," Aziza shares with quiet dignity. 
                      With three children to support and her husband struggling with addiction, she faced desperate financial circumstances, 
                      often borrowing money from relatives just to buy food.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Everything changed when Aziza discovered tailoring. Through skills training, she transformed her needle and thread 
                      into tools of independence. Now working with a group of tailors, she earns 100 Afghanis per garment - 
                      turning her craft into sustainable income that feeds her family and funds her children's education.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-khaista-pink bg-khaista-cream/50">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Heart className="h-6 w-6 text-khaista-pink mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-khaista-charcoal mb-2">Tailoring as Liberation</h3>
                        <p className="text-gray-700 text-sm">
                          Despite resistance from her husband, Aziza joined skills training with one clear goal: 
                          master tailoring to create a steady income. Her dedication to the craft became her pathway 
                          from dependency to financial freedom, proving that skilled hands can change everything.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Transformation Story */}
            <div className="bg-white rounded-xl p-8 mb-16 shadow-sm border border-khaista-soft-pink">
              <h3 className="text-2xl font-serif font-bold text-khaista-charcoal mb-6 text-center">
                The Power of Skills Training
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-khaista-pink">Before Tailoring Skills</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• No reliable source of income</li>
                    <li>• Basic sewing knowledge only</li>
                    <li>• Dependent on borrowed money for food</li>
                    <li>• Unable to afford children's education</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-khaista-pink">After Mastering Tailoring</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Professional tailoring income stream</li>
                    <li>• Earning 100 Afs per completed garment</li>
                    <li>• Partnered with local tailoring group</li>
                    <li>• Fully funding children's school expenses</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Quote Section */}
            <Card className="bg-gradient-to-r from-khaista-cream to-khaista-soft-pink border-0">
              <CardContent className="p-8">
                <blockquote className="text-xl md:text-2xl font-serif text-khaista-charcoal text-center italic leading-relaxed">
                  "Thanks, I have gained professional tailoring skills that transformed my life completely. 
                  Working in partnership with a group of tailors, I earn 100 Afghanis for each garment I create. 
                  My needle and thread have become my tools of independence - I can now provide for my family's needs 
                  and ensure my children receive the education they deserve through my tailoring income."
                </blockquote>
                <div className="text-center mt-6">
                  <div className="w-12 h-12 bg-khaista-pink rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-khaista-gray font-medium">- Aziza, Khaista Artisan</p>
                </div>
              </CardContent>
            </Card>

            {/* Impact Section */}
            <div className="mt-16 bg-khaista-light-pink p-8 rounded-xl">
              <h3 className="text-2xl font-serif font-bold text-khaista-charcoal mb-6 text-center">
                Your Purchase Creates Impact
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-khaista-pink rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">100</span>
                  </div>
                  <h4 className="font-semibold text-khaista-charcoal mb-2">Afghanis per Garment</h4>
                  <p className="text-gray-600 text-sm">Fair payment that enables families to thrive</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-khaista-pink rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">3</span>
                  </div>
                  <h4 className="font-semibold text-khaista-charcoal mb-2">Children Supported</h4>
                  <p className="text-gray-600 text-sm">Education and healthcare made possible</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-khaista-pink rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">∞</span>
                  </div>
                  <h4 className="font-semibold text-khaista-charcoal mb-2">Hope Restored</h4>
                  <p className="text-gray-600 text-sm">Dignity and independence through skills</p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-serif font-bold text-khaista-charcoal mb-4">
                Support More Stories Like Aziza's
              </h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Every purchase directly supports skilled artisans like Aziza, enabling them to provide for their families 
                while preserving traditional Afghan craftsmanship for future generations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/products" 
                  className="bg-khaista-pink text-white px-8 py-3 rounded-lg hover:bg-khaista-pink/90 transition-colors font-medium"
                >
                  Shop Artisan-Made Products
                </a>
                <a 
                  href="/about" 
                  className="border-2 border-khaista-pink text-khaista-pink px-8 py-3 rounded-lg hover:bg-khaista-pink hover:text-white transition-colors font-medium"
                >
                  Learn About Our Impact
                </a>
              </div>
            </div>
          </div>

          {/* Nafas Gul's Story */}
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <Badge className="bg-khaista-pink text-white mb-4 px-4 py-2">Featured Artisan</Badge>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-khaista-charcoal mb-4">
                Nafas Gul's Story of Independence
              </h2>
              <div className="flex items-center justify-center gap-4 text-khaista-gray">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Panjshir Province</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Age 40, Mother of 7</span>
                </div>
              </div>
            </div>

            {/* Main Story Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
              <div className="relative overflow-hidden rounded-xl shadow-2xl">
                <img 
                  src="/assets/image_1755028295130.png" 
                  alt="Beautiful traditional Afghan garments with intricate embroidery and beadwork created by Nafas Gul" 
                  className="w-full h-96 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <p className="text-white text-sm font-medium">
                    Traditional garments with exquisite embroidery and beadwork
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <Card className="border-khaista-soft-pink">
                  <CardHeader>
                    <CardTitle className="text-xl font-serif text-khaista-charcoal">
                      From Oppression to Independence
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      "My life is full of sorrows and pains," Nafas Gul shares courageously. At 40, with seven children to support 
                      and facing domestic violence, she had no reliable income source. When her husband left for Pakistan, 
                      she was left borrowing money just to feed her family.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Tailoring became Nafas Gul's pathway to freedom. Through dedicated training in garment creation, 
                      she developed skills that generate 400-500 Afghanis monthly. Her sewing machine is now her weapon against poverty, 
                      creating beautiful traditional clothing while building financial independence that no one can take away.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-khaista-pink bg-khaista-cream/50">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Heart className="h-6 w-6 text-khaista-pink mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-khaista-charcoal mb-2">Tailoring: The Foundation of Independence</h3>
                        <p className="text-gray-700 text-sm">
                          Through Afghanistan Women's Council, Nafas Gul mastered tailoring alongside bakery, knitting, 
                          and beadwork skills. Her sewing abilities create the intricate garments you see, while her bakery work 
                          provides daily income. Together, these skills generate 400-500 Afghanis monthly in steady income.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Transformation Story */}
            <div className="bg-white rounded-xl p-8 mb-16 shadow-sm border border-khaista-soft-pink">
              <h3 className="text-2xl font-serif font-bold text-khaista-charcoal mb-6 text-center">
                The Power of Financial Independence
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-khaista-pink">Before Tailoring Income</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Trapped by financial dependence and violence</li>
                    <li>• No income source or marketable skills</li>
                    <li>• Seven children unable to attend school</li>
                    <li>• No money for basic household needs</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-khaista-pink">After Mastering Tailoring & Bakery</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Financially independent through skilled work</li>
                    <li>• Earning 400-500 Afs monthly from tailoring & bakery</li>
                    <li>• All seven children attending school on her income</li>
                    <li>• Furnished home and stable food security</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Quote Section */}
            <Card className="bg-gradient-to-r from-khaista-cream to-khaista-soft-pink border-0 mb-16">
              <CardContent className="p-8">
                <blockquote className="text-xl md:text-2xl font-serif text-khaista-charcoal text-center italic leading-relaxed">
                  "When I mastered tailoring and received microfinance support, my life completely transformed. 
                  My skilled hands now create income through beautiful garments and fresh bread for my community. 
                  I can cover all house expenses and my children's school fees through my tailoring and bakery work. 
                  Now I am independent and standing on my own feet - no longer needing anyone's financial support."
                </blockquote>
                <div className="text-center mt-6">
                  <div className="w-12 h-12 bg-khaista-pink rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-khaista-gray font-medium">- Nafas Gul Khwajasayed, Khaista Artisan</p>
                </div>
              </CardContent>
            </Card>

            {/* Skills Showcase */}
            <div className="bg-khaista-light-pink p-8 rounded-xl">
              <h3 className="text-2xl font-serif font-bold text-khaista-charcoal mb-6 text-center">
                Nafas Gul's Diverse Skills
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-khaista-pink rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-sm font-bold">Bakery</span>
                  </div>
                  <h4 className="font-semibold text-khaista-charcoal mb-2">Bread Making</h4>
                  <p className="text-gray-600 text-sm">8 Afs per bread for neighbors</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-khaista-pink rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-sm font-bold">Sewing</span>
                  </div>
                  <h4 className="font-semibold text-khaista-charcoal mb-2">Tailoring</h4>
                  <p className="text-gray-600 text-sm">Creating beautiful garments</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-khaista-pink rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-sm font-bold">Knit</span>
                  </div>
                  <h4 className="font-semibold text-khaista-charcoal mb-2">Knitting</h4>
                  <p className="text-gray-600 text-sm">Handcrafted textiles</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-khaista-pink rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-sm font-bold">Bead</span>
                  </div>
                  <h4 className="font-semibold text-khaista-charcoal mb-2">Beadwork</h4>
                  <p className="text-gray-600 text-sm">Intricate decorative details</p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-serif font-bold text-khaista-charcoal mb-4">
                Support More Stories Like These
              </h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Every purchase directly supports skilled artisans like Aziza and Nafas Gul, enabling them to provide for their families 
                while preserving traditional Afghan craftsmanship for future generations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/products" 
                  className="bg-khaista-pink text-white px-8 py-3 rounded-lg hover:bg-khaista-pink/90 transition-colors font-medium"
                >
                  Shop Artisan-Made Products
                </a>
                <a 
                  href="/about" 
                  className="border-2 border-khaista-pink text-khaista-pink px-8 py-3 rounded-lg hover:bg-khaista-pink hover:text-white transition-colors font-medium"
                >
                  Learn About Our Impact
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <NewsletterSignup />
    </div>
  );
}