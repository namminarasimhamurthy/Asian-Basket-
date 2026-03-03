// import { useState } from "react";
// import { Link } from "react-router-dom";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import Hero from "@/components/Hero";
// import CategoryTabs from "@/components/CategoryTabs";
// import TrendingSection from "@/components/TrendingSection";
// import CategorySection from "@/components/CategorySection";
// import BottomNav from "@/components/BottomNav";
// import Cart from "@/components/Cart";

// // Mock Data for Grocery Style Transformation
// const riceProducts = [
//   { id: "r1", name: "Premium Basmati Rice - 5kg", price: 18.99, category: "Pantry", image: "https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=400" },
//   { id: "r2", name: "Sona Masoori Rice - 10kg", price: 24.50, category: "Pantry", image: "https://images.pexels.com/photos/7456426/pexels-photo-7456426.jpeg?auto=compress&cs=tinysrgb&w=400" },
//   { id: "r3", name: "Organic Brown Rice - 1kg", price: 6.99, category: "Pantry", image: "https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=400" },
//   { id: "r4", name: "Jasmine Rice - 2kg", price: 8.50, category: "Pantry", image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400" },
//   { id: "r5", name: "Idli Rice - 5kg", price: 14.99, category: "Pantry", image: "https://images.pexels.com/photos/7456426/pexels-photo-7456426.jpeg?auto=compress&cs=tinysrgb&w=400" },
// ];

// const vegProducts = [
//   {
//     id: "v1",
//     name: "Fresh Okra (Bhindi)",
//     price: 4.99,
//     pricePerKg: 9.98,
//     category: "Vegetables",
//     image: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=400",
//     availableWeights: [
//       { weight: "0.25", label: "250g" },
//       { weight: "0.5", label: "500g" },
//       { weight: "1", label: "1kg" }
//     ]
//   },
//   {
//     id: "v2",
//     name: "Fresh Curry Leaves",
//     price: 1.50,
//     pricePerKg: 12.00,
//     category: "Vegetables",
//     image: "https://images.pexels.com/photos/4198018/pexels-photo-4198018.jpeg?auto=compress&cs=tinysrgb&w=400",
//     availableWeights: [
//       { weight: "0.25", label: "250g" },
//       { weight: "0.5", label: "500g" },
//       { weight: "1", label: "1kg" }
//     ]
//   },
//   {
//     id: "v3",
//     name: "Green Chilli",
//     price: 2.20,
//     pricePerKg: 11.00,
//     category: "Vegetables",
//     image: "https://images.pexels.com/photos/7456396/pexels-photo-7456396.jpeg?auto=compress&cs=tinysrgb&w=400",
//     availableWeights: [
//       { weight: "0.25", label: "250g" },
//       { weight: "0.5", label: "500g" },
//       { weight: "1", label: "1kg" }
//     ]
//   },
//   {
//     id: "v4",
//     name: "Red Onion",
//     price: 1.80,
//     pricePerKg: 1.80,
//     category: "Vegetables",
//     image: "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=400",
//     availableWeights: [
//       { weight: "0.5", label: "500g" },
//       { weight: "1", label: "1kg" },
//       { weight: "2", label: "2kg" }
//     ]
//   },
//   {
//     id: "v5",
//     name: "Coriander Bunch",
//     price: 1.20,
//     pricePerKg: 9.60,
//     category: "Vegetables",
//     image: "https://images.pexels.com/photos/4198018/pexels-photo-4198018.jpeg?auto=compress&cs=tinysrgb&w=400",
//     availableWeights: [
//       { weight: "0.25", label: "250g" },
//       { weight: "0.5", label: "500g" },
//       { weight: "1", label: "1kg" }
//     ]
//   },
// ];

// const meatProducts = [
//   { id: "m1", name: "Fresh Chicken Breast - 1kg", price: 9.99, category: "Meat", image: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400" },
//   { id: "m2", name: "Lamb Curry Cut - 1kg", price: 16.50, category: "Meat", image: "https://images.pexels.com/photos/3688/food-dinner-lunch-unhealthy.jpg?auto=compress&cs=tinysrgb&w=400" },
//   { id: "m3", name: "Beef Mince - 500g", price: 5.99, category: "Meat", image: "https://images.pexels.com/photos/3688/food-dinner-lunch-unhealthy.jpg?auto=compress&cs=tinysrgb&w=400" },
//   { id: "m4", name: "Whole Chicken - 1.2kg", price: 8.50, category: "Meat", image: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400" },
// ];

// const Index = () => {
//   const [activeTab, setActiveTab] = useState('all');
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-background pb-16 md:pb-0">
//       <Header />

//       {/* 1. Hero */}
//       <div className="pt-[188px] md:pt-[200px]"> {/* Adjusting for fixed header height */}
//         <Hero />
//       </div>

//       {/* 2. Category Tabs */}
//       <CategoryTabs activeTab={activeTab} setActiveTab={setActiveTab} />

//       {/* 3. Trending Tags */}
//       <TrendingSection />

//       <main>
//         {/* 4. Category Sections */}
//         {(activeTab === 'all' || activeTab === 'pantry') && (
//           <CategorySection title="Rice & Staples" products={riceProducts} categorySlug="staples" />
//         )}

//         {(activeTab === 'all' || activeTab === 'vegetables') && (
//           <CategorySection title="Fresh Vegetables" products={vegProducts} bgColor="bg-secondary/20" categorySlug="fruits-veg" />
//         )}

//         {(activeTab === 'all' || activeTab === 'meat') && (
//           <CategorySection title="Meat & Poultry" products={meatProducts} categorySlug="meat" />
//         )}

//         {/* 5. Additional Promo Section */}
//         <section className="py-12 bg-primary/5">
//           <div className="container mx-auto px-4">
//             <div className="grid md:grid-cols-2 gap-8">
//               <Link to="/category/fruits-veg" className="relative rounded-2xl overflow-hidden h-[250px] md:h-[300px] group cursor-pointer block">
//                 <img src="https://images.unsplash.com/photo-1596560548464-f010549b84d7?auto=format&fit=crop&q=80&w=800" alt="Exotic Fruits" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
//                 <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-8 z-10">
//                   <h3 className="text-3xl font-bold text-white mb-2">Exotic Fruits</h3>
//                   <p className="text-white/90 mb-4">Fresh seasonal fruits from around the world.</p>
//                   <span className="w-fit bg-white text-primary px-6 py-2 rounded-full font-bold hover:bg-white/90">Shop Range</span>
//                 </div>
//               </Link>
//               <Link to="/search?q=Frozen" className="relative rounded-2xl overflow-hidden h-[250px] md:h-[300px] group cursor-pointer block">
//                 <img src="https://images.unsplash.com/photo-1564834744159-ff0ea41ba4b9?auto=format&fit=crop&q=80&w=800" alt="Frozen Foods" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
//                 <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-8 z-10">
//                   <h3 className="text-3xl font-bold text-white mb-2">Frozen Essentials</h3>
//                   <p className="text-white/90 mb-4">Stock up your freezer with our premium range.</p>
//                   <span className="w-fit bg-white text-primary px-6 py-2 rounded-full font-bold hover:bg-white/90">View All</span>
//                 </div>
//               </Link>
//             </div>
//           </div>
//         </section>

//         {/* 6. Newsletter / Club */}
//         <section className="py-10 md:py-16 bg-primary text-primary-foreground">
//           <div className="container mx-auto px-4 sm:px-6 text-center">
//             <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4">Join Asian Basket Community Club</h2>
//             <p className="text-sm sm:text-base md:text-lg opacity-90 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
//               Receive latest updates about discount offers, new products, and exclusive recipes directly to your inbox.
//             </p>
//             <div className="flex flex-col gap-3 max-w-sm sm:max-w-md mx-auto">
//               <input
//                 type="email"
//                 placeholder="Enter your email address"
//                 className="w-full h-12 md:h-14 px-4 md:px-5 rounded-full text-foreground border-none focus:ring-2 focus:ring-white shadow-sm text-sm md:text-base"
//               />
//               <button className="w-full h-12 md:h-14 px-6 md:px-8 bg-secondary text-secondary-foreground font-bold rounded-full hover:bg-secondary/90 transition-colors shadow-md text-sm md:text-base">
//                 Subscribe
//               </button>
//             </div>
//           </div>
//         </section>
//       </main>

//       <Footer />
//       <BottomNav setIsCartOpen={setIsCartOpen} />
//       <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
//     </div>
//   );
// };

// export default Index;


// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import Hero from "@/components/Hero";
// import CategoryTabs from "@/components/CategoryTabs";
// import TrendingSection from "@/components/TrendingSection";
// import CategorySection from "@/components/CategorySection";
// import BottomNav from "@/components/BottomNav";
// import Cart from "@/components/Cart";

// /* ================================
//    TYPES
// ================================ */
// interface SubCategory {
//   id: number;
//   name: string;
//   slug: string;
//   image: string;
// }

// interface Category {
//   id: number;
//   name: string;
//   slug: string;
//   subcategories: SubCategory[];
// }

// /* ================================
//    API
// ================================ */
// const API_URL = "http://127.0.0.1:8000/api/auth/categories/";

// const Index = () => {
//   const [activeTab, setActiveTab] = useState("all");
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [categories, setCategories] = useState<Category[]>([]);

//   /* ================================
//      FETCH CATEGORIES FROM BACKEND
//   ================================ */
//   useEffect(() => {
//     axios
//       .get(API_URL)
//       .then((res) => setCategories(res.data))
//       .catch((err) => console.error("Category API error", err));
//   }, []);

//   /* ================================
//      TAB FILTER LOGIC (NO UI CHANGE)
//   ================================ */
//   const visibleCategories =
//     activeTab === "all"
//       ? categories
//       : categories.filter((cat) =>
//           cat.slug.includes(activeTab)
//         );

//   return (
//     <div className="min-h-screen bg-background pb-16 md:pb-0">
//       <Header />

//       {/* 1. Hero */}
//       <div className="pt-[188px] md:pt-[200px]">
//         <Hero />
//       </div>

//       {/* 2. Category Tabs */}
//       <CategoryTabs activeTab={activeTab} setActiveTab={setActiveTab} />

//       {/* 3. Trending Tags */}
//       <TrendingSection />

//       <main>
//         {/* 4. Category Sections (BACKEND DATA) */}
//         {visibleCategories.map((category) => (
//           <CategorySection
//             key={category.id}
//             title={category.name}
//             categorySlug={category.slug}
//             products={category.subcategories.map((sub) => ({
//               id: sub.id.toString(),
//               name: sub.name,
//               price: 0, // backend price not added yet
//               category: category.name,
//               image: sub.image,
//             }))}
//             bgColor={
//               category.slug.includes("vegetable")
//                 ? "bg-secondary/20"
//                 : undefined
//             }
//           />
//         ))}

//         {/* 5. Additional Promo Section (UNCHANGED) */}
//         <section className="py-12 bg-primary/5">
//           <div className="container mx-auto px-4">
//             <div className="grid md:grid-cols-2 gap-8">
//               <Link
//                 to="/category/fruits-vegetables"
//                 className="relative rounded-2xl overflow-hidden h-[250px] md:h-[300px] group cursor-pointer block"
//               >
//                 <img
//                   src="https://images.unsplash.com/photo-1596560548464-f010549b84d7?auto=format&fit=crop&q=80&w=800"
//                   alt="Exotic Fruits"
//                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                 />
//                 <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-8 z-10">
//                   <h3 className="text-3xl font-bold text-white mb-2">
//                     Exotic Fruits
//                   </h3>
//                   <p className="text-white/90 mb-4">
//                     Fresh seasonal fruits from around the world.
//                   </p>
//                   <span className="w-fit bg-white text-primary px-6 py-2 rounded-full font-bold">
//                     Shop Range
//                   </span>
//                 </div>
//               </Link>
//             </div>
//           </div>
//         </section>

//         {/* 6. Newsletter */}
//         <section className="py-10 md:py-16 bg-primary text-primary-foreground">
//           <div className="container mx-auto px-4 text-center">
//             <h2 className="text-3xl font-bold mb-4">
//               Join Asian Basket Community Club
//             </h2>
//             <p className="opacity-90 mb-8 max-w-2xl mx-auto">
//               Receive latest updates about discount offers and new products.
//             </p>
//             <div className="flex flex-col gap-3 max-w-md mx-auto">
//               <input
//                 type="email"
//                 placeholder="Enter your email address"
//                 className="h-14 px-5 rounded-full text-foreground"
//               />
//               <button className="h-14 bg-secondary text-secondary-foreground font-bold rounded-full">
//                 Subscribe
//               </button>
//             </div>
//           </div>
//         </section>
//       </main>

//       <Footer />
//       <BottomNav setIsCartOpen={setIsCartOpen} />
//       <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
//     </div>
//   );
// };

// export default Index;


// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import Hero from "@/components/Hero";
// import CategoryTabs from "@/components/CategoryTabs";
// import TrendingSection from "@/components/TrendingSection";
// import CategorySection from "@/components/CategorySection";
// import BottomNav from "@/components/BottomNav";
// import Cart from "@/components/Cart";

// /* ================================
//    TYPES
// ================================ */
// interface SubCategory {
//   id: number;
//   name: string;
//   slug: string;
//   image: string;
// }

// interface Category {
//   id: number;
//   name: string;
//   slug: string;
//   subcategories: SubCategory[];
// }

// /* ================================
//    API
// ================================ */
// const API_URL = "http://127.0.0.1:8000/api/auth/categories/";

// /* ================================
//    TAB → SUBCATEGORY KEYWORDS
// ================================ */
// const TAB_CATEGORY_MAP: Record<string, string[]> = {
//   all: [],
//   pantry: ["rice", "flour", "grain", "atta"],
//   vegetables: ["vegetable", "fruit"],
//   meat: ["meat", "chicken"],
//   seafood: ["seafood", "fish"],
//   snacks: ["snack", "drink", "beverage", "juice", "soft-drink"],
// };

// const Index = () => {
//   const [activeTab, setActiveTab] = useState("all");
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [categories, setCategories] = useState<Category[]>([]);

//   /* ================================
//      FETCH BACKEND CATEGORIES
//   ================================ */
//   useEffect(() => {
//     axios
//       .get(API_URL)
//       .then((res) => setCategories(res.data))
//       .catch((err) => console.error("Category API error", err));
//   }, []);

//   /* ================================
//      FILTER BASED ON TAB
//   ================================ */
//   const filteredCategories =
//     activeTab === "all"
//       ? categories
//       : categories
//           .map((category) => ({
//             ...category,
//             subcategories: category.subcategories.filter((sub) =>
//               TAB_CATEGORY_MAP[activeTab].some((key) =>
//                 sub.slug.toLowerCase().includes(key)
//               )
//             ),
//           }))
//           .filter((cat) => cat.subcategories.length > 0);

//   return (
//     <div className="min-h-screen bg-background pb-16 md:pb-0">
//       <Header />

//       {/* HERO */}
//       <div className="pt-[188px] md:pt-[200px]">
//         <Hero />
//       </div>

//       {/* CATEGORY TABS */}
//       <CategoryTabs activeTab={activeTab} setActiveTab={setActiveTab} />

//       {/* TRENDING */}
//       <TrendingSection />

//       <main>
//         {/* CATEGORY SECTIONS FROM BACKEND */}
//         {filteredCategories.map((category) => (
//           <CategorySection
//             key={category.id}
//             title={category.name}
//             categorySlug={category.slug}
//             products={category.subcategories.map((sub) => ({
//               id: sub.id.toString(),
//               name: sub.name,
//               price: 0, // price later from backend
//               category: category.name,
//               image: sub.image,
//             }))}
//             bgColor={
//               activeTab === "vegetables"
//                 ? "bg-secondary/20"
//                 : undefined
//             }
//           />
//         ))}

//         {/* PROMO SECTION (UNCHANGED) */}
//         <section className="py-12 bg-primary/5">
//           <div className="container mx-auto px-4">
//             <div className="grid md:grid-cols-2 gap-8">
//               <Link
//                 to="/category/fruits-vegetables"
//                 className="relative rounded-2xl overflow-hidden h-[300px] group block"
//               >
//                 <img
//                   src="https://images.unsplash.com/photo-1596560548464-f010549b84d7"
//                   alt="Exotic Fruits"
//                   className="w-full h-full object-cover group-hover:scale-105 transition"
//                 />
//                 <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-8">
//                   <h3 className="text-3xl font-bold text-white">
//                     Exotic Fruits
//                   </h3>
//                   <p className="text-white/90 mt-2">
//                     Fresh seasonal fruits from around the world
//                   </p>
//                 </div>
//               </Link>
//             </div>
//           </div>
//         </section>

//         {/* NEWSLETTER */}
//         <section className="py-16 bg-primary text-primary-foreground text-center">
//           <h2 className="text-3xl font-bold mb-4">
//             Join Asian Basket Community Club
//           </h2>
//           <p className="opacity-90 mb-6">
//             Get latest discounts & new arrivals
//           </p>
//           <div className="max-w-md mx-auto flex flex-col gap-3">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="h-14 px-5 rounded-full text-foreground"
//             />
//             <button className="h-14 bg-secondary font-bold rounded-full">
//               Subscribe
//             </button>
//           </div>
//         </section>
//       </main>

//       <Footer />
//       <BottomNav setIsCartOpen={setIsCartOpen} />
//       <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
//     </div>
//   );
// };

// export default Index;


// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import Hero from "@/components/Hero";
// import CategoryTabs from "@/components/CategoryTabs";
// import TrendingSection from "@/components/TrendingSection";
// import CategorySection from "@/components/CategorySection";
// import BottomNav from "@/components/BottomNav";
// import Cart from "@/components/Cart";

// /* ================================
//    TYPES
// ================================ */
// interface SubCategory {
//   id: number;
//   name: string;
//   slug: string;
//   image?: string;
// }

// interface Category {
//   id: number;
//   name: string;
//   slug: string;
//   subcategories: SubCategory[];
// }

// /* ================================
//    API
// ================================ */
// const API_URL = "http://127.0.0.1:8000/api/auth/categories/";

// const Index = () => {
//   const [activeTab, setActiveTab] = useState("all");
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [categories, setCategories] = useState<Category[]>([]);

//   /* ================================
//      FETCH CATEGORIES
//   ================================ */
//   useEffect(() => {
//     axios
//       .get(API_URL)
//       .then((res) => setCategories(res.data))
//       .catch((err) => console.error("Category API error", err));
//   }, []);

//   /* ================================
//      TAB FILTER (NO UI CHANGE)
//   ================================ */
//   const filteredCategories =
//     activeTab === "all"
//       ? categories
//       : categories.filter((cat) =>
//           cat.slug.includes(activeTab)
//         );

//   return (
//     <div className="min-h-screen bg-background pb-16 md:pb-0">
//       <Header />

//       {/* 1. Hero */}
//       <div className="pt-[188px] md:pt-[200px]">
//         <Hero />
//       </div>

//       {/* 2. Category Tabs */}
//       <CategoryTabs activeTab={activeTab} setActiveTab={setActiveTab} />

//       {/* 3. Trending Tags */}
//       <TrendingSection />

//       <main>
//         {/* 4. Category Sections (BACKEND DATA) */}
//         {filteredCategories.map((category) => (
//           <CategorySection
//             key={category.id}
//             title={category.name}
//             categorySlug={category.slug}
//             products={category.subcategories.map((sub) => ({
//               id: sub.id.toString(),
//               name: sub.name,
//               price: 0, // product API later
//               category: category.name,
//               image:
//                 sub.image ||
//                 "https://via.placeholder.com/300x300?text=Product",
//             }))}
//             bgColor={
//               category.slug.includes("vegetable")
//                 ? "bg-secondary/20"
//                 : undefined
//             }
//           />
//         ))}

//         {/* 5. Additional Promo Section (UNCHANGED) */}
//         <section className="py-12 bg-primary/5">
//           <div className="container mx-auto px-4">
//             <div className="grid md:grid-cols-2 gap-8">
//               <Link
//                 to="/category/fruits-vegetables"
//                 className="relative rounded-2xl overflow-hidden h-[250px] md:h-[300px] group cursor-pointer block"
//               >
//                 <img
//                   src="https://images.unsplash.com/photo-1596560548464-f010549b84d7?auto=format&fit=crop&q=80&w=800"
//                   alt="Exotic Fruits"
//                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                 />
//                 <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-8 z-10">
//                   <h3 className="text-3xl font-bold text-white mb-2">
//                     Exotic Fruits
//                   </h3>
//                   <p className="text-white/90 mb-4">
//                     Fresh seasonal fruits from around the world.
//                   </p>
//                   <span className="w-fit bg-white text-primary px-6 py-2 rounded-full font-bold">
//                     Shop Range
//                   </span>
//                 </div>
//               </Link>
//             </div>
//           </div>
//         </section>

//         {/* 6. Newsletter */}
//         <section className="py-10 md:py-16 bg-primary text-primary-foreground">
//           <div className="container mx-auto px-4 text-center">
//             <h2 className="text-3xl font-bold mb-4">
//               Join Asian Basket Community Club
//             </h2>
//             <p className="opacity-90 mb-8 max-w-2xl mx-auto">
//               Receive latest updates about discount offers and new products.
//             </p>
//             <div className="flex flex-col gap-3 max-w-md mx-auto">
//               <input
//                 type="email"
//                 placeholder="Enter your email address"
//                 className="h-14 px-5 rounded-full text-foreground"
//               />
//               <button className="h-14 bg-secondary text-secondary-foreground font-bold rounded-full">
//                 Subscribe
//               </button>
//             </div>
//           </div>
//         </section>
//       </main>

//       <Footer />
//       <BottomNav setIsCartOpen={setIsCartOpen} />
//       <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
//     </div>
//   );
// };

// export default Index;

// import { useEffect, useState } from "react";
// import axios from "axios";

// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import Hero from "@/components/Hero";
// import CategoryTabs from "@/components/CategoryTabs";
// import TrendingSection from "@/components/TrendingSection";
// import CategorySection from "@/components/CategorySection";
// import BottomNav from "@/components/BottomNav";
// import Cart from "@/components/Cart";

// /* ================================
//    TYPES
// ================================ */
// interface Category {
//   id: number;
//   name: string;
//   slug: string;
// }

// interface Product {
//   id: number;
//   name: string;
//   image: string;
//   price: number;
//   category: string;

// }

// /* ================================
//    API URLS
// ================================ */
// const CATEGORY_API = "http://127.0.0.1:8000/api/auth/categories/";
// const PRODUCT_API = "http://127.0.0.1:8000/api/auth/products/";

// const Index = () => {
//   const [activeTab, setActiveTab] = useState("all");
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [products, setProducts] = useState<Product[]>([]);

//   /* ================================
//      FETCH DATA
//   ================================ */
//   useEffect(() => {
//     axios.get(CATEGORY_API).then((res) => setCategories(res.data));
//     axios.get(PRODUCT_API).then((res) => setProducts(res.data));
//   }, []);

//   /* ================================
//      FILTER BY TAB
//   ================================ */
//   const filteredCategories =
//     activeTab === "all"
//       ? categories
//       : categories.filter((cat) => cat.slug.includes(activeTab));

//   return (
//     <div className="min-h-screen bg-background pb-16 md:pb-0">
//       <Header />

//       <div className="pt-[188px] md:pt-[200px]">
//         <Hero />
//       </div>

//       <CategoryTabs activeTab={activeTab} setActiveTab={setActiveTab} />
//       <TrendingSection />

//       <main>
//         {/* ================================
//             CATEGORY SECTIONS WITH PRODUCT IMAGES
//         ================================ */}
//         {filteredCategories.map((category) => {
//           const categoryProducts = products.filter(
//             (p) => p.category === category.name
//           );

//           if (categoryProducts.length === 0) return null;

//           return (
//             <CategorySection
//               key={category.id}
//               title={category.name}
//               categorySlug={category.slug}
//               products={categoryProducts.map((p) => ({
//                 id: p.id.toString(),
//                 name: p.name,
//                 price: Number(p.price),
//                 category: p.category,
//                 image: p.image, // ✅ PRODUCT IMAGE USED
//               }))}
//             />
//           );
//         })}
//       </main>

//       <Footer />
//       <BottomNav setIsCartOpen={setIsCartOpen} />
//       <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
//     </div>
//   );
// };

// export default Index;


// import { useEffect, useState } from "react";
// import axios from "axios";

// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import Hero from "@/components/Hero";
// import CategoryTabs from "@/components/CategoryTabs";
// import TrendingSection from "@/components/TrendingSection";
// import CategorySection from "@/components/CategorySection";
// import BottomNav from "@/components/BottomNav";
// import Cart from "@/components/Cart";

// /* ================================
//    TYPES
// ================================ */
// interface Category {
//   id: number;
//   name: string;
//   slug: string;
// }

// interface Product {
//   id: number;
//   name: string;
//   image: string;
//   price: number;
//   category: string;
//   in_stock: boolean;
//   priority: number;
// }

// /* ================================
//    API URLS
// ================================ */
// const CATEGORY_API = "http://127.0.0.1:8000/api/auth/categories/";
// const PRODUCT_API = "http://127.0.0.1:8000/api/auth/products/";

// const Index = () => {
//   const [activeTab, setActiveTab] = useState("all");
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [products, setProducts] = useState<Product[]>([]);

//   /* ================================
//      FETCH DATA
//   ================================ */
//   useEffect(() => {
//     axios.get(CATEGORY_API).then((res) => setCategories(res.data));
//     axios.get(PRODUCT_API).then((res) => setProducts(res.data));
//   }, []);

//   /* ================================
//      FILTER CATEGORIES BY TAB
//   ================================ */
//   const filteredCategories =
//     activeTab === "all"
//       ? categories
//       : categories.filter((cat) =>
//           cat.slug.toLowerCase().includes(activeTab)
//         );

//   return (
//     <div className="min-h-screen bg-background pb-16 md:pb-0">
//       <Header />

//       <div className="pt-[188px] md:pt-[200px]">
//         <Hero />
//       </div>

//       <CategoryTabs activeTab={activeTab} setActiveTab={setActiveTab} />
//       <TrendingSection />

//       <main>
//         {/* ================================
//             CATEGORY SECTIONS WITH PRODUCTS
//         ================================ */}
//         {filteredCategories.map((category) => {
//           const categoryProducts = products
//             .filter((p) => p.category === category.name)
//             .sort((a, b) => b.priority - a.priority); // 🔥 High priority first

//           if (categoryProducts.length === 0) return null;

//           return (
//             <CategorySection
//               key={category.id}
//               title={category.name}
//               categorySlug={category.slug}
//               products={categoryProducts.map((p) => ({
//                 id: p.id.toString(),
//                 name: p.name,
//                 price: Number(p.price),
//                 category: p.category,
//                 image: p.image,
//                 in_stock: p.in_stock,
//               }))}
//             />
//           );
//         })}
//       </main>

//       <Footer />
//       <BottomNav setIsCartOpen={setIsCartOpen} />
//       <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
//     </div>
//   );
// };

// export default Index;

// import { useEffect, useState } from "react";
// import axios from "axios";

// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import Hero from "@/components/Hero";
// import CategoryTabs from "@/components/CategoryTabs";
// import TrendingSection from "@/components/TrendingSection";
// import CategorySection from "@/components/CategorySection";
// import BottomNav from "@/components/BottomNav";
// import Cart from "@/components/Cart";

// /* ================================
//    TYPES
// ================================ */
// interface Category {
//   id: number;
//   name: string;
//   slug: string;
// }

// interface Product {
//   id: number;
//   name: string;
//   image: string;
//   price: number;
//   category: string;
//   in_stock: boolean;
//   priority: number;
// }

// /* ================================
//    API URLS
// ================================ */
// const CATEGORY_API = "http://127.0.0.1:8000/api/auth/categories/";
// const PRODUCT_API = "http://127.0.0.1:8000/api/auth/products/";

// const Index = () => {
//   const [activeTab, setActiveTab] = useState("all");
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [products, setProducts] = useState<Product[]>([]);

//   /* ================================
//      FETCH DATA
//   ================================ */
//   useEffect(() => {
//     axios.get(CATEGORY_API).then((res) => setCategories(res.data));
//     axios.get(PRODUCT_API).then((res) => setProducts(res.data));
//   }, []);

//   /* ================================
//      FILTER CATEGORIES BY TAB
//   ================================ */
//   const filteredCategories =
//     activeTab === "all"
//       ? categories
//       : categories.filter((cat) =>
//           cat.slug.toLowerCase().includes(activeTab)
//         );

//   return (
//     <div className="min-h-screen bg-background pb-16 md:pb-0">
//       <Header />

//       <div className="pt-[188px] md:pt-[200px]">
//         <Hero />
//       </div>

//       <CategoryTabs activeTab={activeTab} setActiveTab={setActiveTab} />
//       <TrendingSection />

//       <main>
//         {/* ================================
//             CATEGORY SECTIONS
//         ================================ */}
//         {filteredCategories.map((category) => {
//           const categoryProducts = products
//             .filter((p) => p.category === category.name)
//             .sort((a, b) => b.priority - a.priority); // 🔥 priority first

//           if (categoryProducts.length === 0) return null;

//           return (
//             <CategorySection
//               key={category.id}
//               title={category.name}
//               categorySlug={category.slug}
//               products={categoryProducts.map((p) => ({
//                 id: p.id.toString(),
//                 name: p.name,
//                 price: Number(p.price),
//                 category: p.category,
//                 image: p.image,
//                 in_stock: p.in_stock,
//               }))}
//             />
//           );
//         })}
//       </main>

//       <Footer />
//       <BottomNav setIsCartOpen={setIsCartOpen} />
//       <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
//     </div>
//   );
// };

// export default Index;


// import { useEffect, useState } from "react";
// import axios from "axios";

// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import Hero from "@/components/Hero";
// import CategoryTabs from "@/components/CategoryTabs";
// import TrendingSection from "@/components/TrendingSection";
// import CategorySection from "@/components/CategorySection";
// import BottomNav from "@/components/BottomNav";
// import Cart from "@/components/Cart";

// /* ================================
//    TYPES
// ================================ */
// interface Category {
//   id: number;
//   name: string;
//   slug: string;
// }

// interface Product {
//   id: number;
//   name: string;
//   image: string;
//   price: number; // discounted price
//   mrp: number;   // original price
//   category: string;
//   in_stock: boolean;
//   priority: number;
// }

// /* ================================
//    API URLS
// ================================ */
// const CATEGORY_API = "http://127.0.0.1:8000/api/auth/categories/";
// const PRODUCT_API = "http://127.0.0.1:8000/api/auth/products/";

// const Index = () => {
//   const [activeTab, setActiveTab] = useState("all");
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [products, setProducts] = useState<Product[]>([]);

//   /* ================================
//      FETCH DATA
//   ================================ */
//   useEffect(() => {
//     axios.get(CATEGORY_API).then((res) => setCategories(res.data));
//     axios.get(PRODUCT_API).then((res) => setProducts(res.data));
//   }, []);

//   /* ================================
//      FILTER CATEGORIES BY TAB
//   ================================ */
//   const filteredCategories =
//     activeTab === "all"
//       ? categories
//       : categories.filter((cat) =>
//           cat.slug.toLowerCase().includes(activeTab)
//         );

//   return (
//     <div className="min-h-screen bg-background pb-16 md:pb-0">
//       <Header />

//       <div className="pt-[188px] md:pt-[200px]">
//         <Hero />
//       </div>

//       <CategoryTabs activeTab={activeTab} setActiveTab={setActiveTab} />
//       <TrendingSection />

//       <main>
//         {/* ================================
//             CATEGORY SECTIONS (WITH DISCOUNT)
//         ================================ */}
//         {filteredCategories.map((category) => {
//           const categoryProducts = products
//             .filter((p) => p.category === category.name)
//             .sort((a, b) => a.priority - b.priority); // ✅ priority order

//           if (categoryProducts.length === 0) return null;

//           return (
//             <CategorySection
//               key={category.id}
//               title={category.name}
//               categorySlug={category.slug}
//               products={categoryProducts.map((p) => ({
//                 id: p.id.toString(),
//                 name: p.name,
//                 price: Number(p.price), // discounted price
//                 mrp: Number(p.mrp),     // ✅ original price
//                 category: p.category,
//                 image: p.image,
//                 in_stock: p.in_stock,
//                 priority: p.priority,
//               }))}
//             />
//           );
//         })}
//       </main>

//       <Footer />
//       <BottomNav setIsCartOpen={setIsCartOpen} />
//       <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
//     </div>
//   );
// };

// export default Index;



// import { useEffect, useState } from "react";
// import axios from "axios";

// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import Hero from "@/components/Hero";
// import CategoryTabs from "@/components/CategoryTabs";
// import TrendingSection from "@/components/TrendingSection";
// import BottomNav from "@/components/BottomNav";
// import Cart from "@/components/Cart";
// import CategorySection from "@/components/CategorySection";

// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import { X } from "lucide-react";

// /* ================================
//    TYPES
// ================================ */

// interface Category {
//   id: number;
//   name: string;
//   slug: string;
// }

// interface Product {
//   id: number;
//   name: string;
//   image: string;
//   price: number;
//   mrp: number;
//   category: string;
//   category_name: string;
//   in_stock: boolean;
//   priority: number;
// }

// /* ================================
//    API URLS
// ================================ */

// const CATEGORY_API = "http://127.0.0.1:8000/api/auth/categories/";
// const PRODUCT_API = "http://127.0.0.1:8000/api/auth/products/";

// const Index = () => {
//   const [activeTab, setActiveTab] = useState("all");
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

//   useEffect(() => {
//     axios.get(CATEGORY_API).then((res) => {
//       setCategories(res.data);
//     });

//     axios.get(PRODUCT_API).then((res) => {
//       setProducts(res.data);
//     });
//   }, []);

//   const filteredCategories =
//     activeTab === "all"
//       ? categories
//       : categories.filter((cat) =>
//           cat.slug.toLowerCase().includes(activeTab)
//         );

//   return (
//     <>
//       <div className="min-h-screen bg-background pb-16 md:pb-0">
//         <Header />

//         <div className="pt-[188px] md:pt-[200px]">
//           <Hero />
//         </div>

//         <CategoryTabs activeTab={activeTab} setActiveTab={setActiveTab} />

//         <TrendingSection />

//         <main>
//           {filteredCategories.map((category) => {
//             const categoryProducts = products
//               .filter((p) => p.category === category.slug)
//               .sort((a, b) => a.priority - b.priority);

//             if (categoryProducts.length === 0) return null;

//             return (
//               <CategorySection
//                 key={category.id}
//                 title={category.name}
//                 categorySlug={category.slug}
//                 products={categoryProducts.map((p) => ({
//                   id: p.id.toString(),
//                   name: p.name,
//                   price: Number(p.price),
//                   mrp: Number(p.mrp),
//                   image: p.image,
//                   category: p.category,
//                   in_stock: p.in_stock,
//                   priority: p.priority,
//                 }))}
//               />
//             );
//           })}
//         </main>

//         <Footer />
//         <BottomNav setIsCartOpen={setIsCartOpen} />
//         <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
//       </div>

//       {/* OPTIONAL QUICK VIEW MODAL (if you still want popup globally) */}
//       <Dialog
//         open={!!selectedProduct}
//         onOpenChange={() => setSelectedProduct(null)}
//       >
//         <DialogContent className="max-w-3xl p-0 overflow-hidden">
//           {selectedProduct && (
//             <div className="relative">
//               <button
//                 onClick={() => setSelectedProduct(null)}
//                 className="absolute top-3 right-3 bg-white rounded-full p-2 shadow z-10"
//               >
//                 <X size={18} />
//               </button>

//               <div className="relative aspect-square bg-white">
//                 <img
//                   src={selectedProduct.image}
//                   alt={selectedProduct.name}
//                   className="w-full h-full object-contain"
//                 />

//                 {!selectedProduct.in_stock && (
//                   <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
//                     <span className="bg-red-600 text-white text-sm font-bold px-6 py-3 rounded-full">
//                       OUT OF STOCK
//                     </span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default Index;


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
  price: number; // discounted price
  mrp: number;   // original price
  category: string;
  in_stock: boolean;
  priority: number;
}

/* ================================
   API URLS
================================ */
const CATEGORY_API = "http://127.0.0.1:8000/api/auth/categories/";
const PRODUCT_API = "http://127.0.0.1:8000/api/auth/products/";

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
     FILTER CATEGORIES BY TAB
  ================================ */
  const filteredCategories =
    activeTab === "all"
      ? categories
      : categories.filter((cat) =>
          cat.slug.toLowerCase().includes(activeTab)
        );

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Header />

      <div className="pt-[188px] md:pt-[200px]">
        <Hero />
      </div>

      <CategoryTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <TrendingSection />

      <main>
        {/* ================================
            CATEGORY SECTIONS (WITH DISCOUNT)
        ================================ */}
        {filteredCategories.map((category) => {
          const categoryProducts = products
            .filter((p) => p.category === category.name)
            .sort((a, b) => a.priority - b.priority); // ✅ priority order

          if (categoryProducts.length === 0) return null;

          return (
            <CategorySection
              key={category.id}
              title={category.name}
              categorySlug={category.slug}
              products={categoryProducts.map((p) => ({
                id: p.id.toString(),
                name: p.name,
                price: Number(p.price), // discounted price
                mrp: Number(p.mrp),     // ✅ original price
                category: p.category,
                image: p.image,
                in_stock: p.in_stock,
                priority: p.priority,
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