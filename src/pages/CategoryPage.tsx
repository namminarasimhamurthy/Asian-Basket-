// import { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import BottomNav from '@/components/BottomNav';
// import Cart from '@/components/Cart';
// import CategorySection from '@/components/CategorySection';

// // Mock product data - Food Truck Menu Categories
// const allProducts = {
//     'rice-bowls': [
//         { id: "rb1", name: "Korean BBQ Bowl", price: 12.99, category: "Rice Bowls", image: "https://images.pexels.com/photos/2092906/pexels-photo-2092906.jpeg?auto=compress&cs=tinysrgb&w=400" },
//         { id: "rb2", name: "Bulgogi Rice Bowl", price: 13.99, category: "Rice Bowls", image: "https://images.pexels.com/photos/5409020/pexels-photo-5409020.jpeg?auto=compress&cs=tinysrgb&w=400" },
//         { id: "rb3", name: "Spicy Pork Bowl", price: 11.99, category: "Rice Bowls", image: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400" },
//     ],
//     'korean-fried-chicken': [
//         { id: "kfc1", name: "Classic Fried Chicken", price: 10.99, category: "Korean Fried Chicken", image: "https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=400" },
//         { id: "kfc2", name: "Spicy Gochujang Wings", price: 11.99, category: "Korean Fried Chicken", image: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400" },
//         { id: "kfc3", name: "Honey Garlic Chicken", price: 12.99, category: "Korean Fried Chicken", image: "https://images.pexels.com/photos/6210747/pexels-photo-6210747.jpeg?auto=compress&cs=tinysrgb&w=400" },
//     ],
//     'korean-tacos': [
//         { id: "kt1", name: "Bulgogi Tacos (3pcs)", price: 9.99, category: "Korean Tacos", image: "https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?auto=compress&cs=tinysrgb&w=400" },
//         { id: "kt2", name: "Spicy Pork Tacos (3pcs)", price: 9.99, category: "Korean Tacos", image: "https://images.pexels.com/photos/4958641/pexels-photo-4958641.jpeg?auto=compress&cs=tinysrgb&w=400" },
//         { id: "kt3", name: "Chicken Tacos (3pcs)", price: 8.99, category: "Korean Tacos", image: "https://images.pexels.com/photos/7613568/pexels-photo-7613568.jpeg?auto=compress&cs=tinysrgb&w=400" },
//     ],
//     'appetizers-sides': [
//         { id: "as1", name: "Korean Fried Dumplings", price: 6.99, category: "Appetizers/Sides", image: "https://images.pexels.com/photos/955137/pexels-photo-955137.jpeg?auto=compress&cs=tinysrgb&w=400" },
//         { id: "as2", name: "Kimchi Fries", price: 5.99, category: "Appetizers/Sides", image: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=400" },
//         { id: "as3", name: "Korean Corn Dog", price: 4.99, category: "Appetizers/Sides", image: "https://images.pexels.com/photos/4518655/pexels-photo-4518655.jpeg?auto=compress&cs=tinysrgb&w=400" },
//     ],
//     'kids-friendly': [
//         { id: "kf1", name: "Mini Chicken Bites", price: 6.99, category: "Kids Friendly", image: "https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=400" },
//         { id: "kf2", name: "Kids Rice Bowl", price: 7.99, category: "Kids Friendly", image: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400" },
//     ],
//     'desserts': [
//         { id: "ds1", name: "Korean Bingsu", price: 7.99, category: "Desserts", image: "https://images.pexels.com/photos/1352270/pexels-photo-1352270.jpeg?auto=compress&cs=tinysrgb&w=400" },
//         { id: "ds2", name: "Hotteok (Sweet Pancake)", price: 4.99, category: "Desserts", image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=400" },
//     ],
//     'beverages': [
//         { id: "bv1", name: "Korean Iced Tea", price: 3.99, category: "Beverages", image: "https://images.pexels.com/photos/792613/pexels-photo-792613.jpeg?auto=compress&cs=tinysrgb&w=400" },
//         { id: "bv2", name: "Banana Milk", price: 2.99, category: "Beverages", image: "https://images.pexels.com/photos/1435706/pexels-photo-1435706.jpeg?auto=compress&cs=tinysrgb&w=400" },
//         { id: "bv3", name: "Soda", price: 1.99, category: "Beverages", image: "https://images.pexels.com/photos/2983100/pexels-photo-2983100.jpeg?auto=compress&cs=tinysrgb&w=400" },
//     ],
// };

// const categoryNames: Record<string, string> = {
//     'rice-bowls': 'Rice Bowls',
//     'korean-fried-chicken': 'Korean Fried Chicken',
//     'korean-tacos': 'Korean Tacos',
//     'appetizers-sides': 'Appetizers/Sides',
//     'kids-friendly': 'Kids Friendly',
//     'desserts': 'Desserts',
//     'beverages': 'Beverages',
// };

// const CategoryPage = () => {
//     const { id } = useParams<{ id: string }>();
//     const [isCartOpen, setIsCartOpen] = useState(false);
//     const products = id ? allProducts[id as keyof typeof allProducts] || [] : [];
//     const categoryName = id ? categoryNames[id] || 'Products' : 'Products';

//     return (
//         <div className="min-h-screen bg-background pb-16 md:pb-0">
//             <Header />

//             <div className="pt-[188px] md:pt-[200px]">
//                 <div className="container mx-auto px-4 py-8">
//                     <h1 className="text-3xl font-bold mb-2 text-primary">{categoryName}</h1>
//                     <p className="text-muted-foreground mb-8">Browse our selection of {categoryName.toLowerCase()}</p>
//                 </div>

//                 {products.length > 0 ? (
//                     <CategorySection title={categoryName} products={products} categorySlug={id || ''} />
//                 ) : (
//                     <div className="container mx-auto px-4 py-16 text-center">
//                         <p className="text-muted-foreground">No products found in this category.</p>
//                     </div>
//                 )}
//             </div>

//             <Footer />
//             <BottomNav setIsCartOpen={setIsCartOpen} />
//             <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
//         </div>
//     );
// };

// export default CategoryPage;

// import { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';

// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import BottomNav from '@/components/BottomNav';
// import Cart from '@/components/Cart';

// interface SubCategory {
//   id: number;
//   name: string;
//   slug: string;
//   image: string;
// }

// const CategoryPage = () => {
//   const { id } = useParams<{ id: string }>();
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // ONLY handle Fruits & Vegetables
//     if (id !== 'fruits-vegetables') {
//       setSubCategories([]);
//       setLoading(false);
//       return;
//     }

//     axios
//       .get('http://127.0.0.1:8000/api/categories/')
//       .then((res) => {
//         const fruitsVeg = res.data.find(
//           (cat: any) => cat.slug === 'fruits-vegetables'
//         );

//         setSubCategories(fruitsVeg?.children || []);
//       })
//       .catch((err) => {
//         console.error('Category fetch error', err);
//       })
//       .finally(() => setLoading(false));
//   }, [id]);

//   return (
//     <div className="min-h-screen bg-background pb-16 md:pb-0">
//       <Header />

//       <div className="pt-[188px] md:pt-[200px]">
//         <div className="container mx-auto px-4 py-8">
//           <h1 className="text-3xl font-bold text-primary">
//             Fruits & Vegetables
//           </h1>
//           <p className="text-muted-foreground mt-1">
//             Choose a category
//           </p>
//         </div>

//         {/* CONTENT */}
//         <div className="container mx-auto px-4 pb-16">
//           {loading ? (
//             <p className="text-center text-muted-foreground">Loading...</p>
//           ) : subCategories.length > 0 ? (
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {subCategories.map((cat) => (
//                 <Link
//                   key={cat.id}
//                   to={`/search?q=${cat.slug}`}
//                   className="group border rounded-xl overflow-hidden hover:shadow-lg transition"
//                 >
//                   <img
//                     src={cat.image}
//                     alt={cat.name}
//                     className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
//                   />
//                   <div className="p-3 text-center font-semibold">
//                     {cat.name}
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           ) : (
//             <p className="text-center text-muted-foreground">
//               No categories found.
//             </p>
//           )}
//         </div>
//       </div>

//       <Footer />
//       <BottomNav setIsCartOpen={setIsCartOpen} />
//       <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
//     </div>
//   );
// };

// export default CategoryPage;


// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";

// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
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

// /* ================================
//    API URL
// ================================ */
// const API_URL = "http://127.0.0.1:8000/api/auth/categories/";

// const CategoryPage = () => {
//   const { id } = useParams<{ id: string }>(); // category slug
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
//   const [categoryName, setCategoryName] = useState("");
//   const [loading, setLoading] = useState(true);

//   /* ================================
//      FETCH CATEGORY & SUBCATEGORIES
//   ================================ */
//   useEffect(() => {
//     if (!id) return;

//     setLoading(true);

//     axios
//       .get(API_URL)
//       .then((res) => {
//         const category = res.data.find(
//           (cat: any) => cat.slug === id
//         );

//         if (category) {
//           setCategoryName(category.name);
//           setSubCategories(category.subcategories || []);
//         } else {
//           setSubCategories([]);
//         }
//       })
//       .catch((err) => {
//         console.error("Category fetch error:", err);
//         setSubCategories([]);
//       })
//       .finally(() => setLoading(false));
//   }, [id]);

//   /* ================================
//      UI
//   ================================ */
//   return (
//     <div className="min-h-screen bg-background pb-16 md:pb-0">
//       <Header />

//       <div className="pt-[188px] md:pt-[200px]">
//         <div className="container mx-auto px-4 py-8">
//           <h1 className="text-3xl font-bold text-primary">
//             {categoryName || "Category"}
//           </h1>
//           <p className="text-muted-foreground mt-1">
//             Choose a category
//           </p>
//         </div>

//         {/* CONTENT */}
//         <div className="container mx-auto px-4 pb-16">
//           {loading ? (
//             <p className="text-center text-muted-foreground">
//               Loading...
//             </p>
//           ) : subCategories.length > 0 ? (
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {subCategories.map((sub) => (
//                 <Link
//                   key={sub.id}
//                   to={`/search?q=${sub.slug}`}
//                   className="group border rounded-xl overflow-hidden hover:shadow-lg transition"
//                 >
//                   <img
//                     src={sub.image}
//                     alt={sub.name}
//                     className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
//                   />
//                   <div className="p-3 text-center font-semibold">
//                     {sub.name}
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           ) : (
//             <p className="text-center text-muted-foreground">
//               No categories found.
//             </p>
//           )}
//         </div>
//       </div>

//       <Footer />
//       <BottomNav setIsCartOpen={setIsCartOpen} />
//       <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
//     </div>
//   );
// };

// export default CategoryPage;


// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";

// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
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

// /* ================================
//    API URL
// ================================ */
// const API_URL = "http://127.0.0.1:8000/api/auth/categories/";

// const CategoryPage = () => {
//   const { id } = useParams<{ id: string }>(); // "all" or category slug
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
//   const [categoryName, setCategoryName] = useState("Category");
//   const [loading, setLoading] = useState(true);

//   /* ================================
//      FETCH DATA (FIXED)
//   ================================ */
//   useEffect(() => {
//     setLoading(true);

//     axios
//       .get(API_URL)
//       .then((res) => {
//         const data: SubCategory[] = res.data;

//         // ✅ BACKEND RETURNS SUBCATEGORIES DIRECTLY
//         setSubCategories(data);

//         // Title logic
//         if (id === "all") {
//           setCategoryName("All Categories");
//         } else {
//           const title =
//             data.find((item) => item.slug === id)?.name ||
//             "Category";
//           setCategoryName(title);
//         }
//       })
//       .catch((err) => {
//         console.error("API error:", err);
//         setSubCategories([]);
//       })
//       .finally(() => setLoading(false));
//   }, [id]);

//   /* ================================
//      UI
//   ================================ */
//   return (
//     <div className="min-h-screen bg-background pb-16 md:pb-0">
//       <Header />

//       <div className="pt-[188px] md:pt-[200px]">
//         <div className="container mx-auto px-4 py-8">
//           <h1 className="text-3xl font-bold text-primary">
//             {categoryName}
//           </h1>
//           <p className="text-muted-foreground mt-1">
//             Choose a category
//           </p>
//         </div>

//         {/* CONTENT */}
//         <div className="container mx-auto px-4 pb-16">
//           {loading ? (
//             <p className="text-center text-muted-foreground">
//               Loading...
//             </p>
//           ) : subCategories.length > 0 ? (
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {subCategories.map((sub) => (
//                 <Link
//                   key={sub.id}
//                   to={`/search?q=${sub.slug}`}
//                   className="group border rounded-xl overflow-hidden hover:shadow-lg transition"
//                 >
//                   <img
//                     src={sub.image}
//                     alt={sub.name}
//                     className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
//                   />
//                   <div className="p-3 text-center font-semibold">
//                     {sub.name}
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           ) : (
//             <p className="text-center text-muted-foreground">
//               No categories found.
//             </p>
//           )}
//         </div>
//       </div>

//       <Footer />
//       <BottomNav setIsCartOpen={setIsCartOpen} />
//       <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
//     </div>
//   );
// };

// export default CategoryPage;

// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
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
//    API URL
// ================================ */
// const API_URL = "http://127.0.0.1:8000/api/auth/categories/";

// const CategoryPage = () => {
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
//   const [loading, setLoading] = useState(true);

//   /* ================================
//      FETCH ALL SUBCATEGORIES
//   ================================ */
//   useEffect(() => {
//     setLoading(true);

//     axios
//       .get(API_URL)
//       .then((res) => {
//         const categories: Category[] = res.data;

//         // ✅ FLATTEN ALL SUBCATEGORIES
//         const allSubCategories = categories.flatMap(
//           (cat) => cat.subcategories || []
//         );

//         setSubCategories(allSubCategories);
//       })
//       .catch((err) => {
//         console.error("API error:", err);
//         setSubCategories([]);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   /* ================================
//      UI
//   ================================ */
//   return (
//     <div className="min-h-screen bg-background pb-16 md:pb-0">
//       <Header />

//       <div className="pt-[188px] md:pt-[200px]">
//         <div className="container mx-auto px-4 py-8">
//           <h1 className="text-3xl font-bold text-primary">
//             All Categories
//           </h1>
//           <p className="text-muted-foreground mt-1">
//             Choose a category
//           </p>
//         </div>

//         {/* CONTENT */}
//         <div className="container mx-auto px-4 pb-16">
//           {loading ? (
//             <p className="text-center text-muted-foreground">
//               Loading...
//             </p>
//           ) : subCategories.length > 0 ? (
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {subCategories.map((sub) => (
//                 <Link
//                   key={sub.id}
//                   to={`/search?q=${sub.slug}`}
//                   className="group border rounded-xl overflow-hidden hover:shadow-lg transition"
//                 >
//                   <img
//                     src={sub.image}
//                     alt={sub.name}
//                     className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
//                   />
//                   <div className="p-3 text-center font-semibold">
//                     {sub.name}
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           ) : (
//             <p className="text-center text-muted-foreground">
//               No categories found.
//             </p>
//           )}
//         </div>
//       </div>

//       <Footer />
//       <BottomNav setIsCartOpen={setIsCartOpen} />
//       <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
//     </div>
//   );
// };

// export default CategoryPage;


// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { Plus } from "lucide-react";

// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import BottomNav from "@/components/BottomNav";
// import Cart from "@/components/Cart";
// import { Button } from "@/components/ui/button";

// /* ================================
//    TYPES
// ================================ */
// interface SubCategory {
//   id: number;
//   name: string;
//   slug: string;
//   image: string;
//   price?: number;
// }

// interface Category {
//   id: number;
//   name: string;
//   slug: string;
//   subcategories: SubCategory[];
// }

// /* ================================
//    API URL
// ================================ */
// const API_URL = "http://127.0.0.1:8000/api/auth/categories/";

// const CategoryPage = () => {
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
//   const [loading, setLoading] = useState(true);

//   /* ================================
//      FETCH ALL SUBCATEGORIES
//   ================================ */
//   useEffect(() => {
//     setLoading(true);

//     axios
//       .get(API_URL)
//       .then((res) => {
//         const categories: Category[] = res.data;

//         const allSubCategories = categories.flatMap((cat) =>
//           (cat.subcategories || []).map((sub) => ({
//             ...sub,
//             price: 4, // ✅ TEMP PRICE (replace later with backend)
//           }))
//         );

//         setSubCategories(allSubCategories);
//       })
//       .catch((err) => {
//         console.error("API error:", err);
//         setSubCategories([]);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   /* ================================
//      ADD TO CART
//   ================================ */
//   const addToCart = (item: SubCategory) => {
//     const cartItem = {
//       id: item.id.toString(),
//       name: item.name,
//       price: item.price || 0,
//       image: item.image,
//       quantity: 1,
//     };

//     const existing = JSON.parse(localStorage.getItem("cart") || "[]");
//     const index = existing.findIndex((p: any) => p.id === cartItem.id);

//     if (index >= 0) {
//       existing[index].quantity += 1;
//     } else {
//       existing.push(cartItem);
//     }

//     localStorage.setItem("cart", JSON.stringify(existing));
//     setIsCartOpen(true);
//   };

//   /* ================================
//      UI
//   ================================ */
//   return (
//     <div className="min-h-screen bg-background pb-16 md:pb-0">
//       <Header />

//       <div className="pt-[188px] md:pt-[200px]">
//         <div className="container mx-auto px-4 py-8">
//           <h1 className="text-3xl font-bold text-primary">
//             All Categories
//           </h1>
//           <p className="text-muted-foreground mt-1">
//             Choose a category
//           </p>
//         </div>

//         <div className="container mx-auto px-4 pb-16">
//           {loading ? (
//             <p className="text-center text-muted-foreground">
//               Loading...
//             </p>
//           ) : subCategories.length > 0 ? (
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {subCategories.map((sub) => (
//                 <div
//                   key={sub.id}
//                   className="group border rounded-xl overflow-hidden hover:shadow-lg transition relative"
//                 >
//                   <Link to={`/search?q=${sub.slug}`}>
//                     <img
//                       src={sub.image}
//                       alt={sub.name}
//                       className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
//                     />
//                   </Link>

//                   <div className="p-3">
//                     <h3 className="font-semibold text-sm mb-1">
//                       {sub.name}
//                     </h3>

//                     <div className="flex items-center justify-between">
//                       <span className="font-bold text-primary">
//                         €{sub.price?.toFixed(2)}
//                       </span>

//                       <Button
//                         size="icon"
//                         className="rounded-full"
//                         onClick={() => addToCart(sub)}
//                       >
//                         <Plus className="w-4 h-4" />
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-center text-muted-foreground">
//               No categories found.
//             </p>
//           )}
//         </div>
//       </div>

//       <Footer />
//       <BottomNav setIsCartOpen={setIsCartOpen} />
//       <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
//     </div>
//   );
// };

// export default CategoryPage;


// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import BottomNav from "@/components/BottomNav";
// import Cart from "@/components/Cart";
// import CategorySection from "@/components/CategorySection";

// /* ================================
//    TYPES
// ================================ */
// interface Product {
//   id: number;
//   name: string;
//   slug: string;
//   image: string;
//   price: string; // backend sends string
//   mrp: string;
//   category: string;
//   subcategory: string;
//   in_stock: boolean;
//   priority: number;
// }

// /* ================================
//    API URL
// ================================ */
// const PRODUCT_API = "http://127.0.0.1:8000/api/auth/products/";

// const CategoryPage = () => {
//   const { id } = useParams<{ id: string }>(); // category slug
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   /* ================================
//      FETCH PRODUCTS BY CATEGORY
//   ================================ */
//   useEffect(() => {
//     if (!id) return;

//     setLoading(true);

//     axios
//       .get(PRODUCT_API, {
//         params: { category: id },
//       })
//       .then((res) => {
//         const sorted = (res.data || []).sort(
//           (a: Product, b: Product) => b.priority - a.priority
//         );
//         setProducts(sorted);
//       })
//       .catch((err) => {
//         console.error("Product API error:", err);
//         setProducts([]);
//       })
//       .finally(() => setLoading(false));
//   }, [id]);

//   return (
//     <div className="min-h-screen bg-background pb-16 md:pb-0">
//       <Header />

//       <div className="pt-[188px] md:pt-[200px]">
//         <div className="container mx-auto px-4 py-8">
//           <h1 className="text-3xl font-bold mb-2 text-primary">
//             {id?.replace(/-/g, " ").toUpperCase()}
//           </h1>
//           <p className="text-muted-foreground mb-8">
//             Browse our selection
//           </p>
//         </div>

//         {/* ================================
//             CONTENT
//         ================================ */}
//         {loading ? (
//           <div className="container mx-auto px-4 py-16 text-center">
//             <p className="text-muted-foreground">Loading products...</p>
//           </div>
//         ) : products.length > 0 ? (
//           <CategorySection
//             title=""
//             categorySlug={id || ""}
//             products={products.map((p) => ({
//               id: p.id.toString(),
//               name: p.name,
//               price: Number(p.price),
//               category: p.category,
//               image: p.image,
//               in_stock: p.in_stock,
//             }))}
//           />
//         ) : (
//           <div className="container mx-auto px-4 py-16 text-center">
//             <p className="text-muted-foreground">
//               No products found in this category.
//             </p>
//           </div>
//         )}
//       </div>

//       <Footer />
//       <BottomNav setIsCartOpen={setIsCartOpen} />
//       <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
//     </div>
//   );
// };

// export default CategoryPage;

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import BottomNav from "@/components/BottomNav";
// import Cart from "@/components/Cart";
// import CategorySection from "@/components/CategorySection";

// /* ================================
//    TYPES
// ================================ */
// interface Product {
//   id: number;
//   name: string;
//   slug: string;
//   image: string;
//   price: string; // backend sends string
//   mrp: string;
//   category: string;
//   subcategory: string;
//   in_stock: boolean;
//   priority: number;
// }

// /* ================================
//    API URL
// ================================ */
// const PRODUCT_API = "http://127.0.0.1:8000/api/auth/products/";

// const CategoryPage = () => {
//   const { id } = useParams<{ id: string }>(); // category slug
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   /* ================================
//      FETCH PRODUCTS BY CATEGORY
//   ================================ */
//   useEffect(() => {
//     if (!id) return;

//     setLoading(true);

//     axios
//       .get(PRODUCT_API, { params: { category: id } })
//       .then((res) => {
//         const sorted = (res.data || []).sort(
//           (a: Product, b: Product) => b.priority - a.priority
//         );
//         setProducts(sorted);
//       })
//       .catch((err) => {
//         console.error("Product API error:", err);
//         setProducts([]);
//       })
//       .finally(() => setLoading(false));
//   }, [id]);

//   return (
//     <div className="min-h-screen bg-background pb-16 md:pb-0">
//       <Header />

//       <div className="pt-[188px] md:pt-[200px]">
//         <div className="container mx-auto px-4 py-8">
//           <h1 className="text-3xl font-bold mb-2 text-primary">
//             {id?.replace(/-/g, " ").toUpperCase()}
//           </h1>
//           <p className="text-muted-foreground mb-8">
//             Browse our selection
//           </p>
//         </div>

//         {/* ================================
//             CONTENT
//         ================================ */}
//         {loading ? (
//           <div className="container mx-auto px-4 py-16 text-center">
//             <p className="text-muted-foreground">Loading products...</p>
//           </div>
//         ) : products.length > 0 ? (
//           <CategorySection
//             title=""
//             categorySlug={id || ""}
//             products={products.map((p) => ({
//               id: p.id.toString(),
//               name: p.name,
//               price: Number(p.price),
//               category: p.category,
//               image: p.image,
//               in_stock: p.in_stock,
//             }))}
//           />
//         ) : (
//           <div className="container mx-auto px-4 py-16 text-center">
//             <p className="text-muted-foreground">
//               No products found in this category.
//             </p>
//           </div>
//         )}
//       </div>

//       <Footer />
//       <BottomNav setIsCartOpen={setIsCartOpen} />
//       <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
//     </div>
//   );
// };

// export default CategoryPage;


// import { useEffect, useState } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import axios from "axios";

// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import BottomNav from "@/components/BottomNav";
// import Cart from "@/components/Cart";
// import CategorySection from "@/components/CategorySection";

// /* ================================
//    TYPES
// ================================ */
// interface Product {
//   id: number;
//   name: string;
//   image: string;
//   price: string;
//   category: string;       // category slug
//   subcategory: string;    // subcategory slug
//   in_stock: boolean;
//   priority: number;
// }

// /* ================================
//    API
// ================================ */
// const PRODUCT_API = "http://127.0.0.1:8000/api/auth/products/";

// const CategoryPage = () => {
//   const { id } = useParams<{ id: string }>(); // category slug
//   const [searchParams] = useSearchParams();
//   const sub = searchParams.get("sub");        // subcategory slug

//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   useEffect(() => {
//     if (!id) return;

//     setLoading(true);

//     axios
//       .get(PRODUCT_API, { params: { category: id } })
//       .then((res) => setProducts(res.data || []))
//       .catch(() => setProducts([]))
//       .finally(() => setLoading(false));
//   }, [id]);

//   /* ================================
//      ✅ FILTER BY SUBCATEGORY
//   ================================ */
//   const filteredProducts = sub
//     ? products.filter((p) => p.subcategory === sub)
//     : products;

//   /* ================================
//      ✅ PRIORITY SORT (1 → first, 0 → last)
//   ================================ */
//   const sortedProducts = [...filteredProducts].sort((a, b) => {
//     const pa = a.priority ?? 0;
//     const pb = b.priority ?? 0;

//     if (pa === 0 && pb === 0) return 0;
//     if (pa === 0) return 1;
//     if (pb === 0) return -1;

//     return pa - pb;
//   });

//   return (
//     <div className="min-h-screen bg-background pb-16 md:pb-0">
//       <Header />

//       <div className="pt-[188px] md:pt-[200px]">
//         {loading ? (
//           <div className="text-center py-20">Loading...</div>
//         ) : sortedProducts.length > 0 ? (
//           <CategorySection
//             title=""
//             categorySlug={id || ""}
//             products={sortedProducts.map((p) => ({
//               id: p.id.toString(),
//               name: p.name,
//               image: p.image,
//               price: Number(p.price),
//               category: p.category,
//               in_stock: p.in_stock,
//               priority: p.priority,
//             }))}
//           />
//         ) : (
//           <div className="text-center py-20 text-muted-foreground">
//             No products found
//           </div>
//         )}
//       </div>

//       <Footer />
//       <BottomNav setIsCartOpen={setIsCartOpen} />
//       <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
//     </div>
//   );
// };

// export default CategoryPage;


// import { useEffect, useState } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import axios from "axios";

// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import BottomNav from "@/components/BottomNav";
// import Cart from "@/components/Cart";
// import CategorySection from "@/components/CategorySection";

// /* ================================
//    TYPES
// ================================ */
// interface Product {
//   id: number;
//   name: string;
//   image: string;
//   price: string;
//   category: string;
//   subcategory: string;
//   in_stock: boolean;
//   priority: number;
// }

// /* ================================
//    API URL
// ================================ */
// const PRODUCT_API = "http://127.0.0.1:8000/api/auth/products/";

// const CategoryPage = () => {
//   const { id } = useParams<{ id: string }>(); // category slug
//   const [searchParams] = useSearchParams();
//   const sub = searchParams.get("sub"); // ✅ subcategory slug

//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   /* ================================
//      FETCH PRODUCTS
//   ================================ */
//   useEffect(() => {
//     if (!id) return;

//     setLoading(true);

//     axios
//       .get(PRODUCT_API, {
//         params: {
//           category: id,
//           ...(sub ? { subcategory: sub } : {}), // ✅ KEY FIX
//         },
//       })
//       .then((res) => {
//         const sorted = (res.data || []).sort(
//           (a: Product, b: Product) => a.priority - b.priority
//         );
//         setProducts(sorted);
//       })
//       .catch((err) => {
//         console.error("Product API error:", err);
//         setProducts([]);
//       })
//       .finally(() => setLoading(false));
//   }, [id, sub]);

//   return (
//     <div className="min-h-screen bg-background pb-16 md:pb-0">
//       <Header />

//       <div className="pt-[188px] md:pt-[200px]">
//         <div className="container mx-auto px-4 py-8">
//           <h1 className="text-3xl font-bold text-primary">
//             {sub
//               ? sub.replace(/-/g, " ").toUpperCase()
//               : id?.replace(/-/g, " ").toUpperCase()}
//           </h1>
//           <p className="text-muted-foreground">
//             {sub ? "Subcategory products" : "Browse category"}
//           </p>
//         </div>

//         {loading ? (
//           <div className="text-center py-16">Loading products...</div>
//         ) : products.length > 0 ? (
//           <CategorySection
//             title=""
//             categorySlug={id || ""}
//             products={products.map((p) => ({
//               id: p.id.toString(),
//               name: p.name,
//               price: Number(p.price),
//               image: p.image,
//               category: p.category,
//               in_stock: p.in_stock,
//               priority: p.priority,
//             }))}
//           />
//         ) : (
//           <div className="text-center py-16 text-muted-foreground">
//             No products found.
//           </div>
//         )}
//       </div>

//       <Footer />
//       <BottomNav setIsCartOpen={setIsCartOpen} />
//       <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
//     </div>
//   );
// };

// export default CategoryPage;


// import { useEffect, useState } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import axios from "axios";

// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import BottomNav from "@/components/BottomNav";
// import Cart from "@/components/Cart";
// import CategorySection from "@/components/CategorySection";

// /* ================================
//    TYPES
// ================================ */
// interface Product {
//   id: number;
//   name: string;
//   image: string;
//   price: string;   // discounted price
//   mrp: string;     // original price
//   category: string;
//   subcategory: string;
//   in_stock: boolean;
//   priority: number;
// }

// /* ================================
//    API
// ================================ */
// const PRODUCT_API = "http://127.0.0.1:8000/api/auth/products/";

// const CategoryPage = () => {
//   const { id } = useParams<{ id: string }>(); // category slug
//   const [searchParams] = useSearchParams();
//   const sub = searchParams.get("sub"); // subcategory slug

//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   /* ================================
//      FETCH PRODUCTS
//   ================================ */
//   useEffect(() => {
//     if (!id) return;

//     setLoading(true);

//     axios
//       .get(PRODUCT_API, {
//         params: {
//           category: id,
//           ...(sub ? { subcategory: sub } : {}),
//         },
//       })
//       .then((res) => {
//         const sorted = (res.data || []).sort((a: Product, b: Product) => {
//           const pa = a.priority ?? 0;
//           const pb = b.priority ?? 0;

//           if (pa === 0 && pb === 0) return 0;
//           if (pa === 0) return 1;
//           if (pb === 0) return -1;

//           return pa - pb; // ✅ ASCENDING
//         });

//         setProducts(sorted);
//       })
//       .catch((err) => {
//         console.error("Product API error:", err);
//         setProducts([]);
//       })
//       .finally(() => setLoading(false));
//   }, [id, sub]);

//   return (
//     <div className="min-h-screen bg-background pb-16 md:pb-0">
//       <Header />

//       <div className="pt-[188px] md:pt-[200px]">
//         <div className="container mx-auto px-4 py-8">
//           <h1 className="text-3xl font-bold text-primary">
//             {sub
//               ? sub.replace(/-/g, " ").toUpperCase()
//               : id?.replace(/-/g, " ").toUpperCase()}
//           </h1>
//           <p className="text-muted-foreground">
//             {sub ? "Subcategory products" : "Browse category"}
//           </p>
//         </div>

//         {loading ? (
//           <div className="text-center py-16">Loading products...</div>
//         ) : products.length > 0 ? (
//           <CategorySection
//             title=""
//             categorySlug={id || ""}
//             products={products.map((p) => ({
//               id: p.id.toString(),
//               name: p.name,
//               price: Number(p.price),
//               mrp: Number(p.mrp),
//               image: p.image,
//               category: p.category,
//               in_stock: p.in_stock,
//               priority: p.priority,
//             }))}
//           />
//         ) : (
//           <div className="text-center py-16 text-muted-foreground">
//             No products found.
//           </div>
//         )}
//       </div>

//       <Footer />
//       <BottomNav setIsCartOpen={setIsCartOpen} />
//       <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
//     </div>
//   );
// };

// export default CategoryPage;


// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import BottomNav from "@/components/BottomNav";
// import Cart from "@/components/Cart";
// import CategorySection from "@/components/CategorySection";

// /* ================================
//    TYPES
// ================================ */
// interface Product {
//   id: number;
//   name: string;
//   image: string;
//   price: string;
//   mrp: string;
//   category: string;
//   subcategory: string;
//   in_stock: boolean;
//   priority: number;
// }

// /* ================================
//    API
// ================================ */
// const PRODUCT_API = "http://127.0.0.1:8000/api/auth/products/";

// const CategoryPage = () => {
//   const { id, categorySlug, subcategorySlug } = useParams<{
//     id?: string;
//     categorySlug?: string;
//     subcategorySlug?: string;
//   }>();

//   // Decide final slugs
//   const category = categorySlug || id;
//   const subcategory = subcategorySlug || null;

//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   /* ================================
//      FETCH PRODUCTS
//   ================================ */
//   useEffect(() => {
//     if (!category) return;

//     setLoading(true);

//     axios
//       .get(PRODUCT_API, {
//         params: {
//           category: category,
//           ...(subcategory ? { subcategory } : {}),
//         },
//       })
//       .then((res) => {
//         const sorted = (res.data || []).sort((a: Product, b: Product) => {
//           const pa = a.priority ?? 0;
//           const pb = b.priority ?? 0;

//           if (pa === 0 && pb === 0) return 0;
//           if (pa === 0) return 1;
//           if (pb === 0) return -1;

//           return pa - pb;
//         });

//         setProducts(sorted);
//       })
//       .catch((err) => {
//         console.error("Product API error:", err);
//         setProducts([]);
//       })
//       .finally(() => setLoading(false));
//   }, [category, subcategory]);

//   return (
//     <div className="min-h-screen bg-background pb-16 md:pb-0">
//       <Header />

//       <div className="pt-[188px] md:pt-[200px]">
//         <div className="container mx-auto px-4 py-8">
//           <h1 className="text-3xl font-bold text-primary">
//             {(subcategory || category || "")
//               .replace(/-/g, " ")
//               .toUpperCase()}
//           </h1>
//           <p className="text-muted-foreground">
//             {subcategory ? "Subcategory products" : "Browse category"}
//           </p>
//         </div>

//         {loading ? (
//           <div className="text-center py-16">Loading products...</div>
//         ) : products.length > 0 ? (
//           <CategorySection
//             title=""
//             categorySlug={category || ""}
//             products={products.map((p) => ({
//               id: p.id.toString(),
//               name: p.name,
//               price: Number(p.price),
//               mrp: Number(p.mrp),
//               image: p.image,
//               category: p.category,
//               in_stock: p.in_stock,
//               priority: p.priority,
//             }))}
//           />
//         ) : (
//           <div className="text-center py-16 text-muted-foreground">
//             No products found.
//           </div>
//         )}
//       </div>

//       <Footer />
//       <BottomNav setIsCartOpen={setIsCartOpen} />
//       <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
//     </div>
//   );
// };

// export default CategoryPage;



// import { useEffect, useState } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import axios from "axios";

// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import BottomNav from "@/components/BottomNav";
// import Cart from "@/components/Cart";
// import CategorySection from "@/components/CategorySection";

// /* ================================
//    TYPES
// ================================ */
// interface Product {
//   id: number;
//   name: string;
//   image: string;
//   price: string;
//   mrp: string;
//   category: string;
//   subcategory: string;
//   in_stock: boolean;
//   priority: number;
// }

// /* ================================
//    API
// ================================ */
// const PRODUCT_API = "http://127.0.0.1:8000/api/auth/products/";

// const CategoryPage = () => {
//   /* ================================
//      URL PARAMS
//   ================================ */
//   const params = useParams();
//   const [searchParams] = useSearchParams();

//   // category slug
//   const category =
//     params.categorySlug ||
//     params.id ||
//     "";

//   // subcategory slug (from ?sub=)
//   const subcategory =
//     searchParams.get("sub") ||
//     params.subcategorySlug ||
//     "";

//   /* ================================
//      STATE
//   ================================ */
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   /* ================================
//      FETCH PRODUCTS
//   ================================ */
//   useEffect(() => {
//     if (!category) return;

//     setLoading(true);

//     axios
//       .get(PRODUCT_API, {
//         params: {
//           category,
//           ...(subcategory ? { subcategory } : {}),
//         },
//       })
//       .then((res) => {
//         const sorted = (res.data || []).sort(
//           (a: Product, b: Product) => {
//             const pa = a.priority ?? 0;
//             const pb = b.priority ?? 0;

//             if (pa === 0 && pb === 0) return 0;
//             if (pa === 0) return 1;
//             if (pb === 0) return -1;

//             return pa - pb;
//           }
//         );

//         setProducts(sorted);
//       })
//       .catch((err) => {
//         console.error("Product API error:", err);
//         setProducts([]);
//       })
//       .finally(() => setLoading(false));
//   }, [category, subcategory]);

//   /* ================================
//      RENDER
//   ================================ */
//   return (
//     <div className="min-h-screen bg-background pb-16 md:pb-0">
//       <Header />

//       <div className="pt-[188px] md:pt-[200px]">
//         <div className="container mx-auto px-4 py-8">
//           <h1 className="text-3xl font-bold text-primary">
//             {(subcategory || category)
//               .replace(/-/g, " ")
//               .toUpperCase()}
//           </h1>
//           <p className="text-muted-foreground">
//             {subcategory
//               ? "Subcategory products"
//               : "Browse category"}
//           </p>
//         </div>

//         {loading ? (
//           <div className="text-center py-16">
//             Loading products...
//           </div>
//         ) : products.length > 0 ? (
//           <CategorySection
//             title=""
//             categorySlug={category}
//             products={products.map((p) => ({
//               id: p.id.toString(),
//               name: p.name,
//               price: Number(p.price),
//               mrp: Number(p.mrp),
//               image: p.image,
//               category: p.category,
//               in_stock: p.in_stock,
//               priority: p.priority,
//             }))}
//           />
//         ) : (
//           <div className="text-center py-16 text-muted-foreground">
//             No products found.
//           </div>
//         )}
//       </div>

//       <Footer />
//       <BottomNav setIsCartOpen={setIsCartOpen} />
//       <Cart
//         isOpen={isCartOpen}
//         setIsOpen={setIsCartOpen}
//       />
//     </div>
//   );
// };

// export default CategoryPage;


// import { useEffect, useState } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import axios from "axios";

// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import BottomNav from "@/components/BottomNav";
// import Cart from "@/components/Cart";
// import CategorySection from "@/components/CategorySection";

// /* ================================
//    TYPES
// ================================ */

// interface Product {
//   id: number;
//   name: string;
//   image: string;
//   price: number;
//   mrp: number;
//   category: string;        // slug
//   category_name: string;   // name
//   in_stock: boolean;
//   priority: number;
//   weight: number;
// }

// /* ================================
//    API
// ================================ */

// const PRODUCT_API = "http://127.0.0.1:8000/api/auth/products/";

// const CategoryPage = () => {
//   const params = useParams();
//   const [searchParams] = useSearchParams();

//   const category = params.categorySlug || "";
//   const subcategory = searchParams.get("sub") || "";

//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   /* ================================
//      FETCH PRODUCTS
//   ================================ */

//   useEffect(() => {
//     if (!category) return;

//     setLoading(true);

//     axios
//       .get(PRODUCT_API, {
//         params: {
//           category,   // slug
//         },
//       })
//       .then((res) => {
//         const sorted = (res.data || []).sort(
//           (a: Product, b: Product) => {
//             const pa = a.priority ?? 0;
//             const pb = b.priority ?? 0;

//             if (pa === 0 && pb === 0) return 0;
//             if (pa === 0) return 1;
//             if (pb === 0) return -1;

//             return pa - pb;
//           }
//         );

//         setProducts(sorted);
//       })
//       .catch((err) => {
//         console.error("Product API error:", err);
//         setProducts([]);
//       })
//       .finally(() => setLoading(false));
//   }, [category]);

//   /* ================================
//      RENDER
//   ================================ */

//   return (
//     <div className="min-h-screen bg-background pb-16 md:pb-0">
//       <Header />

//       <div className="pt-[188px] md:pt-[200px]">
//         <div className="container mx-auto px-4 py-8">
//           <h1 className="text-3xl font-bold text-primary">
//             {category.replace(/-/g, " ").toUpperCase()}
//           </h1>
//           <p className="text-muted-foreground">
//             Browse products
//           </p>
//         </div>

//         {loading ? (
//           <div className="text-center py-16">
//             Loading products...
//           </div>
//         ) : products.length > 0 ? (
//           <CategorySection
//             title=""
//             categorySlug={category}
//             products={products.map((p) => ({
//               id: p.id.toString(),
//               name: p.name,
//               price: Number(p.price),
//               mrp: Number(p.mrp),
//               image: p.image,
//               category: p.category,
//               in_stock: p.in_stock ?? false,
//               priority: p.priority,
//               weight: p.weight,   // 🔥 IMPORTANT
//             }))}
//           />
//         ) : (
//           <div className="text-center py-16 text-muted-foreground">
//             No products found.
//           </div>
//         )}
//       </div>

//       <Footer />
//       <BottomNav setIsCartOpen={setIsCartOpen} />
//       <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
//     </div>
//   );
// };

// export default CategoryPage;

// working code 
// import { useEffect, useState } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import axios from "axios";

// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import BottomNav from "@/components/BottomNav";
// import Cart from "@/components/Cart";
// import CategorySection from "@/components/CategorySection";

// /* ================================
//    TYPES
// ================================ */
// interface Product {
//   id: number;
//   name: string;
//   image: string;
//   price: string;
//   mrp: string;
//   category: string;
//   subcategory: string;
//   final_stock_status: boolean; // 🔥 UPDATED
//   priority: number;
// }

// /* ================================
//    API
// ================================ */
// const PRODUCT_API = "http://127.0.0.1:8000/api/auth/products/";

// const CategoryPage = () => {
//   /* ================================
//      URL PARAMS
//   ================================ */
//   const params = useParams();
//   const [searchParams] = useSearchParams();

//   const category =
//     params.categorySlug ||
//     params.id ||
//     "";

//   const subcategory =
//     searchParams.get("sub") ||
//     params.subcategorySlug ||
//     "";

//   /* ================================
//      STATE
//   ================================ */
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   /* ================================
//      FETCH PRODUCTS
//   ================================ */
//   useEffect(() => {
//     if (!category) return;

//     setLoading(true);

//     axios
//       .get(PRODUCT_API, {
//         params: {
//           category,
//           ...(subcategory ? { subcategory } : {}),
//         },
//       })
//       .then((res) => {
//         const sorted = (res.data || []).sort(
//           (a: Product, b: Product) => {
//             const pa = a.priority ?? 0;
//             const pb = b.priority ?? 0;

//             if (pa === 0 && pb === 0) return 0;
//             if (pa === 0) return 1;
//             if (pb === 0) return -1;

//             return pa - pb;
//           }
//         );

//         setProducts(sorted);
//       })
//       .catch((err) => {
//         console.error("Product API error:", err);
//         setProducts([]);
//       })
//       .finally(() => setLoading(false));
//   }, [category, subcategory]);

//   /* ================================
//      RENDER
//   ================================ */
//   return (
//     <div className="min-h-screen bg-background pb-16 md:pb-0">
//       <Header />

//       <div className="pt-[188px] md:pt-[200px]">
//         <div className="container mx-auto px-4 py-8">
//           <h1 className="text-3xl font-bold text-primary">
//             {(subcategory || category)
//               .replace(/-/g, " ")
//               .toUpperCase()}
//           </h1>
//           <p className="text-muted-foreground">
//             {subcategory
//               ? "Subcategory products"
//               : "Browse category"}
//           </p>
//         </div>

//         {loading ? (
//           <div className="text-center py-16">
//             Loading products...
//           </div>
//         ) : products.length > 0 ? (
//           <CategorySection
//             title=""
//             categorySlug={category}
//             products={products.map((p) => ({
//               id: p.id.toString(),
//               name: p.name,
//               price: Number(p.price),
//               mrp: Number(p.mrp),
//               image: p.image,
//               category: p.category,
//               final_stock_status: p.final_stock_status, // 🔥 IMPORTANT
//               priority: p.priority,
//             }))}
//           />
//         ) : (
//           <div className="text-center py-16 text-muted-foreground">
//             No products found.
//           </div>
//         )}
//       </div>

//       <Footer />
//       <BottomNav setIsCartOpen={setIsCartOpen} />
//       <Cart
//         isOpen={isCartOpen}
//         setIsOpen={setIsCartOpen}
//       />
//     </div>
//   );
// };

// export default CategoryPage;

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
const PRODUCT_API = "http://127.0.0.1:8000/api/auth/products/";

const CategoryPage = () => {

  const params = useParams();

  const [searchParams] = useSearchParams();

  const category =
    params.categorySlug ||
    params.id ||
    "";

  const subcategory =
    searchParams.get("sub") ||
    params.subcategorySlug ||
    "";

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

        const sorted = (res.data || []).sort(
          (a: Product, b: Product) => {

            const pa = a.priority ?? 0;
            const pb = b.priority ?? 0;

            if (pa === 0 && pb === 0) return 0;
            if (pa === 0) return 1;
            if (pb === 0) return -1;

            return pa - pb;
          }
        );

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

            {(subcategory || category)
              .replace(/-/g, " ")
              .toUpperCase()}

          </h1>

          <p className="text-muted-foreground">

            {subcategory
              ? "Subcategory products"
              : "Browse category"}

          </p>

        </div>

        {loading ? (

          <div className="text-center py-16">
            Loading products...
          </div>

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

      <Cart
        isOpen={isCartOpen}
        setIsOpen={setIsCartOpen}
      />

    </div>
  );
};

export default CategoryPage;