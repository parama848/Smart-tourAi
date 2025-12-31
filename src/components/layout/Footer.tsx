import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <span className="text-xl">🛕</span>
              </div>
              <div>
                <h3 className="font-display text-lg font-bold">TN Tourism</h3>
                <p className="text-xs text-primary-foreground/70">Smart Platform</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80">
              AI-powered tourism platform for discovering the beauty, heritage, and culture of Tamil Nadu.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/planner" className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors">
                  AI Trip Planner
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors">
                  Explore Destinations
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors">
                  Book Entry Tickets
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors">
                  Tourism Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <MapPin className="h-4 w-4 text-secondary" />
                <span>Chennai, Tamil Nadu, India</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <Phone className="h-4 w-4 text-secondary" />
                <span>+91 44 2536 1234</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <Mail className="h-4 w-4 text-secondary" />
                <span>info@tntourism.gov.in</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <p className="mt-4 text-sm text-primary-foreground/60">
              Government of Tamil Nadu Initiative
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20 text-center">
          <p className="text-sm text-primary-foreground/60">
            © 2024 Tamil Nadu Tourism. All rights reserved. | A Government of Tamil Nadu Initiative
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
