import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-muted text-muted-foreground pt-16 pb-8 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & Address */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-primary">Asian <span className="text-foreground">Basket</span></span>
            </div>
            <p className="mb-4">
              Authentic Indian & Asian groceries delivered to your door. Fresh produce, premium spices, and halal meat.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>2 Mary Street, Dublin 1, Ireland, D01 PD88</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+353 899899412</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@asianbasket.ie</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-bold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/category/staples" className="hover:text-primary transition-colors">Pantry Essentials</Link></li>
              <li><Link to="/category/fruits-veg" className="hover:text-primary transition-colors">Vegetables & Fruits</Link></li>
              <li><Link to="/category/meat" className="hover:text-primary transition-colors">Meat & Poultry</Link></li>
              <li><Link to="/category/seafood" className="hover:text-primary transition-colors">Seafood</Link></li>
              <li><Link to="/search?q=Spices" className="hover:text-primary transition-colors">Spices & Herbs</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-foreground font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping-policy" className="hover:text-primary transition-colors">Shipping Policy</Link></li>
              <li><Link to="/refund-policy" className="hover:text-primary transition-colors">Returns & Refunds</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Download App / Social */}
          <div>
            <h3 className="text-foreground font-bold mb-4">Stay Connected</h3>
            <div className="flex gap-4 mb-6">
              <a href="#" className="bg-white p-2 rounded-full shadow-sm hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="https://www.instagram.com/asianbasket_ie/" target="_blank" rel="noopener noreferrer" className="bg-white p-2 rounded-full shadow-sm hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="bg-white p-2 rounded-full shadow-sm hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></a>
            </div>

            <h3 className="text-foreground font-bold mb-4">We Accept</h3>
            <div className="flex gap-2">
              <div className="bg-white p-2 rounded shadow-sm"><CreditCard className="h-6 w-6 text-blue-600" /></div>
              <div className="bg-white p-2 rounded shadow-sm"><CreditCard className="h-6 w-6 text-primary" /></div>
              <div className="bg-white p-2 rounded shadow-sm"><CreditCard className="h-6 w-6 text-orange-500" /></div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm">
          <p>© {new Date().getFullYear()} Asian Basket. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;