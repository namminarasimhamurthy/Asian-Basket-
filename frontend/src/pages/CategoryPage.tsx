import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import Cart from "@/components/Cart";
import CategorySection from "@/components/CategorySection";

/* ================================
   TYPES
================================ */
interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
  mrp: string;
  category: string;
  subcategory: string;
  final_stock_status: boolean;
  priority: number;

  // ✅ FIX ADDED — WEIGHT FROM BACKEND
  weight: number;
}

/* ================================
   API
================================ */
const PRODUCT_API = "https://api.asianbasket.ie/api/auth/products/";

const CategoryPage = () => {
  const params = useParams();

  const [searchParams] = useSearchParams();

  const category = params.categorySlug || params.id || "";

  const subcategory = searchParams.get("sub") || params.subcategorySlug || "";

  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);

  const [isCartOpen, setIsCartOpen] = useState(false);

  /* ================================
     FETCH PRODUCTS
  ================================ */
  useEffect(() => {
    if (!category) return;

    setLoading(true);

    axios
      .get(PRODUCT_API, {
        params: {
          category,
          ...(subcategory ? { subcategory } : {}),
        },
      })
      .then((res) => {
        const sorted = (res.data || []).sort((a: Product, b: Product) => {
          const pa = a.priority ?? 0;
          const pb = b.priority ?? 0;

          if (pa === 0 && pb === 0) return 0;
          if (pa === 0) return 1;
          if (pb === 0) return -1;

          return pa - pb;
        });

        setProducts(sorted);
      })
      .catch((err) => {
        console.error("Product API error:", err);

        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, [category, subcategory]);

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Header />

      <div className="pt-[188px] md:pt-[200px]">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-primary">
            {(subcategory || category).replace(/-/g, " ").toUpperCase()}
          </h1>

          <p className="text-muted-foreground">
            {subcategory ? "Subcategory products" : "Browse category"}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16">Loading products...</div>
        ) : products.length > 0 ? (
          <CategorySection
            title=""
            categorySlug={category}
            products={products.map((p) => ({
              id: p.id.toString(),

              name: p.name,

              price: Number(p.price),

              mrp: Number(p.mrp),

              image: p.image,

              category: p.category,

              final_stock_status: p.final_stock_status,

              priority: p.priority,

              // ✅ CRITICAL FIX — SEND WEIGHT
              weight: Number(p.weight),
            }))}
          />
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            No products found.
          </div>
        )}
      </div>

      <Footer />

      <BottomNav setIsCartOpen={setIsCartOpen} />

      <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
    </div>
  );
};

export default CategoryPage;
