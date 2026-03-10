import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import Cart from "@/components/Cart";
import CategorySection from "@/components/CategorySection";

/* ================================
   TYPES (MATCH INDEX.TSX LOGIC)
================================ */
interface Product {
  id: number;
  name: string;
  price: string;
  mrp: string;
  category: string;
  image: string;

  // ✅ CRITICAL FIX — use backend final stock logic
  final_stock_status: boolean;

  // optional but recommended
  weight?: number;
  priority?: number;
}

/* ================================
   API URL
================================ */
const API_URL = "https://api.asianbasket.ie/api/auth/products/";

/* ================================
   COMPONENT
================================ */
const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const [isCartOpen, setIsCartOpen] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);

  const query = searchParams.get("q") || "";

  const subcategory = searchParams.get("subcategory");

  /* ================================
     FETCH PRODUCTS
  ================================ */
  useEffect(() => {
    setLoading(true);

    axios
      .get(API_URL, {
        params: {
          search: query || undefined,
          subcategory: subcategory || undefined,
        },
      })
      .then((res) => {
        console.log("Search API:", res.data);

        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Product API error:", err);

        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, [query, subcategory]);

  /* ================================
     UI
  ================================ */
  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Header />

      <div className="pt-[188px] md:pt-[200px]">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2 text-primary">
            Search Results
          </h1>

          <p className="text-muted-foreground mb-8">
            {loading
              ? "Searching products..."
              : products.length > 0
                ? `Found ${products.length} product${products.length !== 1 ? "s" : ""} for "${query}"`
                : `No products found for "${query}"`}
          </p>
        </div>

        {/* ================================
           RESULTS
        ================================ */}

        {loading ? (
          <div className="container mx-auto px-4 py-16 text-center">
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        ) : products.length > 0 ? (
          <CategorySection
            title="Results"
            categorySlug="search"
            products={products.map((p) => ({
              id: p.id.toString(),

              name: p.name,

              price: Number(p.price),

              mrp: Number(p.mrp),

              category: p.category,

              image: p.image?.startsWith("http")
                ? p.image
                : `https://api.asianbasket.ie${p.image}`,

              // ✅ CRITICAL FIX — SAME AS INDEX.TSX
              final_stock_status: p.final_stock_status,

              // optional but recommended
              weight: Number(p.weight) || 0,

              priority: p.priority || 0,
            }))}
          />
        ) : (
          <div className="container mx-auto px-4 py-16 text-center">
            <p className="text-muted-foreground mb-4">
              Try searching for something else
            </p>

            <p className="text-sm text-muted-foreground">
              Popular searches: Rice, Vegetables, Chicken, Fish
            </p>
          </div>
        )}
      </div>

      <Footer />

      <BottomNav setIsCartOpen={setIsCartOpen} />

      <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
    </div>
  );
};

export default SearchPage;
