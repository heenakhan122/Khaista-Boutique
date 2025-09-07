import { Link } from "wouter";
import { Mail, MapPin } from "lucide-react";
import { SiInstagram, SiFacebook } from "react-icons/si";
import khaistaBoutiqueLogo from "@/assets/Khaista_Boutique_Logo_1754949895064.jpg";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <img 
              src={khaistaBoutiqueLogo} 
              alt="Khaista Boutique" 
              className="h-8 w-auto mb-4" 
            />
            <p className="text-gray-600 text-sm mb-4">
              Preserving Afghan cultural heritage through authentic handmade craftsmanship, supporting women artisans worldwide.
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://www.facebook.com/profile.php?id=61551995945364&mibextid=LQQJ4d" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-khaista-pink transition-colors"
                aria-label="Visit our Facebook page"
              >
                <SiFacebook className="h-5 w-5" />
              </a>
              <a 
                href="https://www.instagram.com/khaista.boutique/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-khaista-pink transition-colors"
                aria-label="Visit our Instagram page"
              >
                <SiInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-khaista-charcoal mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-gray-600 hover:text-khaista-turquoise transition-colors">About Us</Link></li>
              <li><Link href="/tailors" className="text-gray-600 hover:text-khaista-turquoise transition-colors">Tailors</Link></li>
              <li><Link href="/return-policy" className="text-gray-600 hover:text-khaista-turquoise transition-colors">Return & Exchange Policy</Link></li>
              <li><a href="http://www.afghanistanwomencouncil.org/index.html" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-khaista-turquoise transition-colors">Afghan Women Council</a></li>
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold text-khaista-charcoal mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-gray-600 hover:text-khaista-turquoise transition-colors">Featured</Link></li>
              <li><Link href="/products/clothing" className="text-gray-600 hover:text-khaista-turquoise transition-colors">Clothing</Link></li>
              <li><Link href="/products/jewelry" className="text-gray-600 hover:text-khaista-turquoise transition-colors">Jewelry</Link></li>
              <li><Link href="/products/bags" className="text-gray-600 hover:text-khaista-turquoise transition-colors">Bags</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-khaista-charcoal mb-4">Contact Info</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-khaista-turquoise" />
                <span>support@khaistaboutique.com</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 text-khaista-turquoise mt-1" />
                <span>Supporting artisans globally<br />Based in Afghanistan</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">© 2021 Khaista Boutique. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-600 hover:text-khaista-turquoise transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-600 hover:text-khaista-turquoise transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
