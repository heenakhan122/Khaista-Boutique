import { Video, Shield, Users, Award, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import NewsletterSignup from "@/components/newsletter-signup";

export default function Tailors() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all fields are filled (trim whitespace)
    if (!formData.name.trim() || !formData.description.trim() || !formData.email.trim()) {
      toast({
        title: "Please complete all fields",
        description: "All fields are required to book your free consultation.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Here you would normally send the data to your backend
      // For now, we'll just show a success message
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast({
        title: "You are all booked!",
        description: "Check your email for confirmation details and next steps.",
      });
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        email: ''
      });
    } catch (error) {
      toast({
        title: "Booking failed",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    {
      title: "Free Video Consultation",
      description: "Connect with our master tailors through secure video calls to discuss your custom design needs.",
      icon: Video
    },
    {
      title: "Custom Tailoring",
      description: "Bespoke traditional Afghan garments made to your exact measurements and preferences.",
      icon: Award
    },
    {
      title: "Secure Process",
      description: "Our female-run operation ensures privacy and security for all our talented designers and customers.",
      icon: Shield
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Free Video Consultation",
      description: "Schedule a secure video call with our master tailors to discuss your vision, measurements, and design preferences.",
      icon: Video
    },
    {
      step: "2", 
      title: "Design Approval",
      description: "Review detailed sketches and fabric selections. Approve your custom design before we begin crafting.",
      icon: CheckCircle
    },
    {
      step: "3",
      title: "Expert Crafting",
      description: "Our skilled female artisans handcraft your piece using traditional techniques passed down through generations.",
      icon: Users
    },
    {
      step: "4",
      title: "Quality & Shipping",
      description: "After final quality checks, we carefully package and ship your custom piece directly to you.",
      icon: Clock
    }
  ];

  return (
    <div className="min-h-screen bg-khaista-white">
      {/* Hero Section */}
      <section className="py-24 bg-khaista-soft-pink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-khaista-charcoal mb-6">
              Khaista Tailors
            </h1>
            <p className="text-xl md:text-2xl text-khaista-gray max-w-4xl mx-auto">
              Entirely female-run custom tailoring service connecting you with master artisans through secure video consultations
            </p>
          </div>
          
          {/* Workshop Image */}
          <div className="max-w-5xl mx-auto mt-12">
            <div className="relative overflow-hidden rounded-xl shadow-2xl">
              <img 
                src="/assets/Khaista Tailors_1755027069016.jpg" 
                alt="Khaista tailors workshop showing women working together on traditional Afghan garments with professional sewing equipment" 
                className="w-full h-64 md:h-96 object-cover object-top"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white text-sm md:text-base font-medium">
                  Our skilled female artisans at work - preserving traditional Afghan tailoring techniques
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-khaista-charcoal mb-4">
              Our Services
            </h2>
            <p className="text-lg text-khaista-gray max-w-2xl mx-auto">
              Experience our secure, privacy-focused approach to custom Afghan tailoring
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center border-0 shadow-sm bg-khaista-cream">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 bg-khaista-pink/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <service.icon className="h-8 w-8 text-khaista-pink" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-khaista-charcoal mb-4">
                    {service.title}
                  </h3>
                  <p className="text-khaista-gray leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 bg-khaista-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-khaista-charcoal mb-4">
              How It Works
            </h2>
            <p className="text-lg text-khaista-gray max-w-2xl mx-auto">
              A simple, secure process from consultation to delivery, all while protecting the privacy of our talented female artisans
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <Card key={index} className="text-center border-0 shadow-sm bg-white">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 bg-khaista-pink rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                    {step.step}
                  </div>
                  <div className="w-12 h-12 bg-khaista-pink/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <step.icon className="h-6 w-6 text-khaista-pink" />
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-khaista-charcoal mb-4">
                    {step.title}
                  </h3>
                  <p className="text-khaista-gray leading-relaxed text-sm">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Past Designs Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-khaista-charcoal mb-4">
              Past Custom Designs
            </h2>
            <p className="text-lg text-khaista-gray max-w-2xl mx-auto">
              Examples of our master tailors' work - each piece uniquely crafted for our clients with traditional Afghan techniques
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="relative overflow-hidden rounded-xl shadow-lg group">
              <img 
                src="/assets/Khaista Tailored dress 1_1755026603721.jpeg" 
                alt="Custom tailored traditional Afghan dress with intricate white embroidery" 
                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-white text-lg font-serif font-semibold mb-2">
                  Custom White Traditional Dress
                </h3>
                <p className="text-white text-sm opacity-90">
                  Handcrafted with intricate embroidery and traditional Afghan styling
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl shadow-lg group">
              <img 
                src="/assets/tailored dress 2_1755026617597.webp" 
                alt="Elegant traditional Afghan dress in white with colorful embroidered bodice and flowing skirt" 
                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-white text-lg font-serif font-semibold mb-2">
                  Traditional Celebration Dress
                </h3>
                <p className="text-white text-sm opacity-90">
                  Flowing white dress with vibrant multicolored embroidered bodice
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl shadow-lg group">
              <img 
                src="/assets/number 3 couple_1755026811786.jpg" 
                alt="Couple wearing matching traditional Afghan outfits - red embroidered dress and men's vest with traditional patterns" 
                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-white text-lg font-serif font-semibold mb-2">
                  Traditional Couple's Set
                </h3>
                <p className="text-white text-sm opacity-90">
                  Coordinated traditional outfits for special occasions and cultural celebrations
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="bg-khaista-cream rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-khaista-charcoal mb-4">
                <strong>Each design is completely unique.</strong> These examples showcase our tailors' expertise in traditional Afghan craftsmanship, but your custom piece will be designed specifically for you.
              </p>
              <p className="text-khaista-gray text-sm">
                Designs vary based on your preferences, measurements, fabric choices, and cultural style preferences discussed during your consultation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-khaista-soft-pink rounded-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-khaista-pink/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Video className="h-8 w-8 text-khaista-pink" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-khaista-charcoal mb-4">
                Start Your Custom Journey
              </h2>
              <p className="text-xl text-khaista-gray mb-8 max-w-2xl mx-auto">
                Book a free, secure video consultation with our master tailors to bring your vision to life
              </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-khaista-charcoal font-medium">
                    Your Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="bg-white border-gray-300 focus:border-khaista-pink"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-khaista-charcoal font-medium">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className="bg-white border-gray-300 focus:border-khaista-pink"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-khaista-charcoal font-medium">
                  Quick Description of Your Request *
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Tell us about the custom piece you'd like us to create - style, occasion, preferences, etc."
                  rows={4}
                  className="bg-white border-gray-300 focus:border-khaista-pink resize-none"
                  required
                />
              </div>

              <div className="text-center pt-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-khaista-pink text-white px-8 py-3 hover:bg-khaista-pink/90 disabled:opacity-50"
                >
                  {isSubmitting ? "Booking..." : "Book Your Free Consultation"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <NewsletterSignup />
    </div>
  );
}