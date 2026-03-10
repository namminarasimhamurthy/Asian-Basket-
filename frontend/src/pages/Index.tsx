import { useEffect, useState } from "react";
import axios from "axios";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import CategoryTabs from "@/components/CategoryTabs";
import TrendingSection from "@/components/TrendingSection";
import CategorySection from "@/components/CategorySection";
import BottomNav from "@/components/BottomNav";
import Cart from "@/components/Cart";

/* ================================
   TYPES
================================ */
interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
  mrp: string;
  category: string;
  final_stock_status: boolean;
  priority: number;

  // ✅ FIX ADDED — WEIGHT FROM BACKEND
  weight: number;
}

/* ================================
   API
================================ */
const BASE_URL = "https://api.asianbasket.ie"; // ✅ IMPORTANT: CHANGE THIS TO YOUR BACKEND URL
const CATEGORY_API = `${BASE_URL}/api/auth/categories/`;
const PRODUCT_API = `${BASE_URL}/api/auth/products/`;

const Index = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  /* ================================
     FETCH DATA
  ================================ */
  useEffect(() => {
    axios.get(CATEGORY_API).then((res) => setCategories(res.data));
    axios.get(PRODUCT_API).then((res) => setProducts(res.data));
  }, []);

  /* ================================
     FILTER CATEGORIES
  ================================ */
  const filteredCategories =
    activeTab === "all"
      ? categories
      : categories.filter((cat) => cat.slug.toLowerCase().includes(activeTab));

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Header />

      <div className="pt-[188px] md:pt-[200px]">
        <Hero />
      </div>

      <CategoryTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <TrendingSection />

      <main>
        {filteredCategories.map((category) => {
          const categoryProducts = products
            .filter((p) => p.category === category.slug)
            .sort((a, b) => {
              const pa = a.priority ?? 0;
              const pb = b.priority ?? 0;

              if (pa === 0 && pb === 0) return 0;
              if (pa === 0) return 1;
              if (pb === 0) return -1;

              return pa - pb;
            });

          if (categoryProducts.length === 0) return null;

          return (
            <CategorySection
              key={category.id}
              title={category.name}
              categorySlug={category.slug}
              products={categoryProducts.map((p) => ({
                id: p.id.toString(),

                name: p.name,

                price: Number(p.price),

                mrp: Number(p.mrp),

                image: p.image?.startsWith("http")
                  ? p.image
                  : `${BASE_URL}${p.image}`,

                category: p.category,

                final_stock_status: p.final_stock_status,

                priority: p.priority,

                // ✅ CRITICAL FIX — SEND WEIGHT TO CART
                weight: Number(p.weight),
              }))}
            />
          );
        })}
      </main>

      <Footer />

      <BottomNav setIsCartOpen={setIsCartOpen} />

      <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
    </div>
  );
};

export default Index;
