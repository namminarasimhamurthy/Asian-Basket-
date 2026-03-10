import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, ShoppingBag, User, LogOut } from "lucide-react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import Cart from "./Cart";
import MegaMenu from "./MegaMenu";
import SearchBar from "./SearchBar";
import asianBasketLogo from "@/assets/asian-basket-logo-light.jpg";

/* ================================
   DEFAULT ANNOUNCEMENTS
================================ */
const DEFAULT_ANNOUNCEMENTS = [
  "🚚 Free Delivery available within Dublin for orders above €39.99",
  "🥦 Fresh Indian & Asian Groceries",
  "🛒 Order Now!",
];

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [announcements, setAnnouncements] = useState<string[]>([]);

  const { cartItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  /* ================================
     FETCH ANNOUNCEMENTS
  ================================ */
  useEffect(() => {
    axios
      .get("https://api.asianbasket.ie/api/auth/announcement/")
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setAnnouncements(res.data.map((a) => a.description));
        } else {
          setAnnouncements(DEFAULT_ANNOUNCEMENTS);
        }
      })
      .catch(() => {
        setAnnouncements(DEFAULT_ANNOUNCEMENTS);
      });
  }, []);

  /* ================================
     REPEAT FOR INFINITE SCROLL
  ================================ */
  const scrollingAnnouncements = [
    ...announcements,
    ...announcements,
    ...announcements,
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
      {/* ANNOUNCEMENT BAR */}
      <div className="bg-primary text-primary-foreground py-2 overflow-hidden">
        <div className="flex w-max animate-marquee">
          {scrollingAnnouncements.map((text, index) => (
            <span
              key={index}
              className="mx-12 text-xs md:text-sm font-semibold whitespace-nowrap"
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* MAIN HEADER */}
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo + Mobile Menu */}
          <div className="flex items-center gap-3">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                    Home
                  </Link>
                  <Link to="/orders" onClick={() => setIsMobileMenuOpen(false)}>
                    My Orders
                  </Link>
                  <Link to="/offers" onClick={() => setIsMobileMenuOpen(false)}>
                    Offers
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>

            <Link to="/">
              <img
                src={asianBasketLogo}
                alt="Asian Basket"
                className="h-20 md:h-24 object-contain"
              />
            </Link>
          </div>

          {/* Search */}
          <div className="hidden md:flex flex-1 justify-center">
            <SearchBar />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">
                    <User className="h-5 w-5 mr-1" />
                    {user?.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-destructive"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost">
                    <User className="h-5 w-5 mr-1" />
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="ghost">
                    <User className="h-5 w-5 mr-1" />
                    Signup
                  </Button>
                </Link>
              </div>
            )}

            {/* Cart */}
            <Button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-primary text-primary-foreground rounded-full px-4"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-xs font-bold px-2 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mt-3 md:hidden">
          <SearchBar />
        </div>
      </div>

      <MegaMenu />
      <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
    </header>
  );
};

export default Header;
