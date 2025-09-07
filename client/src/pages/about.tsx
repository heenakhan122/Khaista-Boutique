import { Heart, Users, Globe, Award, Shield, Handshake, DollarSign, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import NewsletterSignup from "@/components/newsletter-signup";
import tailorsImage from "@assets/Tailors_Khaista_x_AWC_1755026272921.jpg";

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
      title: "Quality & Care",
      description: "High standards maintained through skill-building support and quality control guidance."
    },
    {
      icon: Award,
      title: "Fair Recognition",
      description: "Credit given where due, with transparent pricing and fair compensation for expertise."
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
                  src={tailorsImage} 
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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-khaista-charcoal mb-6">
                Current Situation & Why Income Matters
              </h2>
              <p className="text-xl text-khaista-charcoal leading-relaxed">
                Educational restrictions have severely impacted Afghan women's access to traditional employment. 
                In this challenging environment, <strong>income through artisan work provides crucial financial independence</strong> while preserving cultural heritage.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {impactValues.map((value, index) => (
                <Card key={index} className="bg-gradient-to-b from-khaista-light-pink to-white border-khaista-soft-pink shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-khaista-pink rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-serif font-bold text-lg text-khaista-charcoal mb-3">
                      {value.title}
                    </h3>
                    <p className="text-sm text-khaista-charcoal leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-16 bg-gradient-to-r from-khaista-light-pink to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-khaista-charcoal mb-6">
                How We Work
              </h2>
              <p className="text-xl text-khaista-charcoal leading-relaxed">
                Our approach prioritizes dignity, sustainability, and mutual respect in every partnership.
              </p>
            </div>

            <div className="space-y-6 mb-12">
              {workingMethods.map((method, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-md">
                  <div className="w-8 h-8 bg-khaista-turquoise rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <p className="text-khaista-charcoal leading-relaxed">{method}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitments */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-khaista-charcoal mb-6">
                Our Commitments
              </h2>
              <p className="text-xl text-khaista-charcoal leading-relaxed">
                Every partnership is built on these foundational principles.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {commitments.map((commitment, index) => (
                <Card key={index} className="bg-gradient-to-b from-white to-khaista-light-pink border-khaista-soft-pink shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-khaista-turquoise rounded-full flex items-center justify-center mx-auto mb-4">
                      <commitment.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-serif font-bold text-lg text-khaista-charcoal mb-3">
                      {commitment.title}
                    </h3>
                    <p className="text-sm text-khaista-charcoal leading-relaxed">
                      {commitment.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-khaista-pink to-khaista-light-pink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterSignup />
        </div>
      </section>
    </div>
  );
}
