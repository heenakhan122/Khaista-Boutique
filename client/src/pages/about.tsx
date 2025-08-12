import { Heart, Users, Globe, Award, Shield, Handshake, DollarSign, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import NewsletterSignup from "@/components/newsletter-signup";

export default function About() {
  const impactValues = [
    {
      icon: DollarSign,
      title: "Income Stability",
      description: "Direct, long-term partnerships that provide predictable income through small, recurring batches over one-off sales."
    },
    {
      icon: Users,
      title: "Agency & Choice",
      description: "Earnings managed by artisans for their priorities—no charity, just partnership and respect."
    },
    {
      icon: Sparkles,
      title: "Heritage Preserved",
      description: "Traditional embroidery, beadwork, metalwork, and weaving kept alive through paid practice."
    },
    {
      icon: Globe,
      title: "Community Impact",
      description: "Resources flowing to families and local needs through dignified work opportunities."
    }
  ];

  const commitments = [
    {
      icon: Shield,
      title: "Dignity & Safety",
      description: "Adult artisans, safe work environments, flexible schedules that respect individual needs."
    },
    {
      icon: Heart,
      title: "Transparency",
      description: "Clear pricing and simple impact reporting as we grow our community partnerships."
    },
    {
      icon: Award,
      title: "Cultural Respect",
      description: "We credit regions and techniques; no appropriation—just authentic appreciation."
    },
    {
      icon: Globe,
      title: "Sustainability",
      description: "Limited runs, durable materials, minimal/recyclable packaging for responsible fashion."
    }
  ];

  const workingMethods = [
    "Direct, long-term partnerships via trusted local networks",
    "Fair, upfront pay for every order (no unpaid samples)",
    "Small, recurring batches for predictable income and quality",
    "Skill-building support (pricing, quality control, fulfillment) alongside craft"
  ];

  return (
    <div className="min-h-screen bg-khaista-white">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-r from-khaista-pink to-khaista-light-pink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              Our Story & Impact
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-8">
              Khaista Boutique partners with Afghan women artisans—through the Afghanistan Women's Council—to create fairly paid, small-batch pieces. In the face of educational restrictions and limited job access, we provide a path to income, agency, and tradition kept alive by the women who craft it.
            </p>
            
            {/* Official Partnership Image */}
            <div className="max-w-4xl mx-auto mt-8">
              <div className="relative overflow-hidden rounded-xl shadow-2xl">
                <img 
                  src="/assets/Tailors Khaista x AWC_1755026272921.jpg" 
                  alt="Official Khaista x Afghanistan Women's Council partnership ceremony with Afghan flag decorations" 
                  className="w-full h-64 md:h-96 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <p className="text-white text-sm md:text-base font-medium">
                    Official Khaista x Afghanistan Women's Council Partnership Launch
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Afghanistan Women's Council Partnership */}
      <section className="py-16 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-khaista-pink rounded-full flex items-center justify-center mx-auto mb-6">
                <Handshake className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-khaista-charcoal mb-4">
                Afghanistan Women's Council Partnership
              </h2>
              <p className="text-xl text-khaista-charcoal leading-relaxed mb-2">
                Khaista Boutique is part of the <strong>Afghanistan Women's Council initiative</strong> to help Afghan women achieve financial independence through traditional craftsmanship.
              </p>
              <p className="text-lg text-khaista-charcoal font-medium">
                <strong>Run by women, for women.</strong>
              </p>
            </div>
            

          </div>
        </div>
      </section>

      {/* Current Situation & Why Income Matters */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-khaista-charcoal mb-8 text-center">
              Why Income Generation Matters Now
            </h2>
            <div className="bg-white border-l-4 border-khaista-pink p-8 mb-8 shadow-sm">
              <p className="text-lg text-khaista-charcoal leading-relaxed mb-6">
                Since 2021, Afghan women face unprecedented restrictions on education and formal employment. Many families have lost primary income sources, making alternative economic opportunities not just beneficial—but essential for survival.
              </p>
              <p className="text-lg text-khaista-charcoal leading-relaxed mb-6">
                Through the Afghanistan Women's Council, we ensure that women are educated, well-trained, and supported every step of the way. Our artisan partners build successful businesses and earn income to support themselves and their families.
              </p>
              <div className="bg-khaista-cream p-6 rounded-lg">
                <h3 className="text-xl font-serif font-bold text-khaista-charcoal mb-4">AWC Impact by the Numbers:</h3>
                <ul className="space-y-2 text-khaista-charcoal">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-khaista-pink rounded-full"></div>
                    <span><strong>5,000 women</strong> provided with skills training and micro-finance support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-khaista-pink rounded-full"></div>
                    <span><strong>1,500 additional women</strong> receiving loans this year to run their businesses</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-khaista-pink rounded-full"></div>
                    <span>Training in <strong>sewing, handicrafts, embroidery, and entrepreneurship</strong></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-khaista-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-khaista-charcoal mb-8 text-center">
              Our Story
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="max-w-none text-khaista-charcoal leading-relaxed">
                <p className="text-xl mb-6">
                  Khaista Boutique was created with a simple belief: when women can earn through their own skills, they gain real control over their lives. We partner with makers connected through the Afghanistan Women's Council to turn traditional craft into steady, fairly paid work.
                </p>
                <p className="text-lg mb-6">
                  Through AWC's comprehensive program—including vocational training, micro-finance loans, and business support—Afghan women artisans are building sustainable income sources while preserving centuries-old cultural traditions.
                </p>
                <p className="text-lg mb-6">
                  Your purchase directly supports this mission: <strong>no charity, just partnership and respect.</strong> Every item sold provides fair compensation and helps fund continued training and micro-finance support for more women to start their own businesses.
                </p>
              </div>
              <div className="relative overflow-hidden rounded-xl shadow-lg">
                <img 
                  src="/assets/Khaista Boutique women working_1755026042753.jpg" 
                  alt="Women collaborating on traditional embroidery and handicrafts" 
                  className="w-full h-96 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-white text-sm font-medium">Traditional embroidery and handicraft training - women supporting women</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AWC Training Programs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-khaista-charcoal mb-12 text-center">
              Afghanistan Women's Council Training Programs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-amber-200">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-khaista-charcoal mb-3">
                    Income Generation Training
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Marketing, management, small business, basic accounting, entrepreneurship, legal and gender issues.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-emerald-200">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                    <Sparkles className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-khaista-charcoal mb-3">
                    Vocational Training
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Sewing, knitting, handicrafts, embroidery, soap making, vegetable gardening, and traditional crafts.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-blue-200">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-khaista-charcoal mb-3">
                    Micro-Finance Support
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Loans, savings programs, and Village Organizations with group support and joint guarantees.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-16 bg-khaista-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-khaista-charcoal mb-8 text-center">
              How We Work Through AWC
            </h2>
            <div className="grid gap-6">
              {workingMethods.map((method, index) => (
                <div key={index} className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm">
                  <div className="w-2 h-2 bg-khaista-pink rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-lg text-khaista-charcoal">{method}</p>
                </div>
              ))}
              <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm border-l-4 border-khaista-pink">
                <div className="w-2 h-2 bg-khaista-pink rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-lg text-khaista-charcoal">
                  <strong>AWC Network Support:</strong> Home visits, small group meetings, and village organization support to ensure sustainable business development
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-khaista-charcoal mb-4">
              Impact (What Your Purchase Enables)
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactValues.map((value, index) => (
              <Card key={index} className="text-center border-khaista-soft-pink">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-khaista-light-pink rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-khaista-pink" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-khaista-charcoal mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Commitments Section */}
      <section className="py-16 bg-khaista-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-khaista-charcoal mb-4">
              Our Commitments
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {commitments.map((commitment, index) => (
              <Card key={index} className="border-khaista-soft-pink">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-khaista-light-pink rounded-full flex items-center justify-center flex-shrink-0">
                      <commitment.icon className="h-6 w-6 text-khaista-pink" />
                    </div>
                    <div>
                      <h3 className="text-xl font-serif font-bold text-khaista-charcoal mb-2">
                        {commitment.title}
                      </h3>
                      <p className="text-gray-600">
                        {commitment.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Safeguarding Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-khaista-charcoal mb-8 text-center">
              Safeguarding & Privacy
            </h2>
            <div className="bg-khaista-light-pink p-8 rounded-lg">
              <p className="text-lg text-khaista-charcoal leading-relaxed text-center">
                We share stories with consent and never disclose sensitive details that could compromise safety. Names or photos may be adjusted on request.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSignup />
    </div>
  );
}