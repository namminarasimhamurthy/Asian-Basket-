import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

/* ================================
   TYPES
================================ */
interface Banner {
  id: number;
  tag: string;
  heading: string;
  description: string;
  image: string;
  link: string;
}

/* ================================
   DEFAULT FALLBACK BANNERS
================================ */
const DEFAULT_BANNERS: Banner[] = [
  {
    id: 1,
    tag: "Fresh Picks",
    heading: "Fresh Indian & Asian Groceries",
    description:
      "Shop the best quality spices, rice, fresh vegetables, and halal meat.",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200",
    link: "/category/fruits-vegetables",
  },
  {
    id: 2,
    tag: "Premium Quality",
    heading: "Premium Basmati Rice",
    description: "Get the finest long-grain rice for your biryani and pulao.",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=1200",
    link: "/category/rice-flour",
  },
  {
    id: 3,
    tag: "Halal Fresh",
    heading: "Fresh Halal Meat",
    description: "Fresh chicken, lamb, and beef sourced from trusted farms.",
    image:
      "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=1200",
    link: "/category/meat-poultry",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================================
     FETCH BANNERS FROM BACKEND
  ================================ */
  useEffect(() => {
    axios
      .get("https://api.asianbasket.ie/api/auth/banners/")
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setBanners(res.data);
        } else {
          setBanners(DEFAULT_BANNERS);
        }
      })
      .catch(() => {
        setBanners(DEFAULT_BANNERS);
      })
      .finally(() => setLoading(false));
  }, []);

  /* ================================
     AUTO SLIDE
  ================================ */
  useEffect(() => {
    if (banners.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [banners]);

  if (loading) return null;

  return (
    <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden bg-muted">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner) => (
          <div key={banner.id} className="min-w-full h-full relative">
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img
              src={banner.image}
              alt={banner.heading}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center text-white px-4">
              <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs md:text-sm font-bold rounded-full mb-4">
                {banner.tag}
              </span>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 max-w-4xl">
                {banner.heading}
              </h1>

              <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
                {banner.description}
              </p>

              <Link to={banner.link}>
                <Button
                  size="lg"
                  className="rounded-full text-base md:text-lg px-8 py-6 bg-primary hover:bg-primary/90 border-2 border-primary"
                >
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 text-white hover:bg-white/20 rounded-full h-12 w-12 hidden md:flex"
        onClick={() =>
          setCurrentSlide((prev) =>
            prev === 0 ? banners.length - 1 : prev - 1,
          )
        }
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 text-white hover:bg-white/20 rounded-full h-12 w-12 hidden md:flex"
        onClick={() => setCurrentSlide((prev) => (prev + 1) % banners.length)}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === currentSlide
                ? "bg-primary w-8"
                : "bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
