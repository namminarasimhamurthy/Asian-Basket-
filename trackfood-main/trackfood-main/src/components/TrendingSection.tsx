// import { useRef } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { cn } from '@/lib/utils';
// import { Link } from 'react-router-dom';

// // const tags = [
// //     "Bombay Duck", "Basmati Rice", "Haldiram", "Turiya", "Tindoori",
// //     "Blue Crab", "Goat Meat", "Mutton", "Atta", "Biscuits",
// //     "Dal Chana", "Kantola", "Fresh Prawns", "Beefs"
// // ];

// const TrendingSection = () => {
//     const scrollRef = useRef<HTMLDivElement>(null);

//     const scroll = (direction: 'left' | 'right') => {
//         if (scrollRef.current) {
//             const { current } = scrollRef.current;
//             const scrollAmount = 300;
//             if (direction === 'left') {
//                 current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
//             } else {
//                 current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//             }
//         }
//     };

//     return (
//         <div className="bg-secondary/20 py-6 border-b border-border">
//             <div className="container mx-auto px-4">
//                 <div className="flex items-center gap-4">
//                     <h3 className="text-sm font-bold uppercase whitespace-nowrap text-muted-foreground">Trending Now:</h3>

//                     <div className="relative flex-1 group overflow-hidden">
//                         <Button
//                             variant="ghost"
//                             size="icon"
//                             className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 shadow-md h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
//                             onClick={() => scroll('left')}
//                         >
//                             <ChevronLeft className="h-3 w-3" />
//                         </Button>

//                         <div
//                             ref={scrollRef}
//                             className="flex gap-2 overflow-x-auto scrollbar-hide px-8 items-center"
//                             style={{ scrollBehavior: 'smooth' }}
//                         >
//                             {tags.map((tag, idx) => (
//                                 <Link
//                                     key={idx}
//                                     to={`/search?q=${tag}`}
//                                     className="whitespace-nowrap px-3 py-1 bg-white border border-border rounded-full text-xs font-medium text-foreground hover:border-primary hover:text-primary transition-colors hover:shadow-sm"
//                                 >
//                                     {tag}
//                                 </Link>
//                             ))}
//                         </div>

//                         <Button
//                             variant="ghost"
//                             size="icon"
//                             className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 shadow-md h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
//                             onClick={() => scroll('right')}
//                         >
//                             <ChevronRight className="h-3 w-3" />
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TrendingSection;


// import { useRef, useEffect, useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom";

// interface TrendingProduct {
//   id: number;
//   name: string;
//   slug: string;
//   category: string;
//   subcategory: string;
// }

// const TrendingSection = () => {
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const [products, setProducts] = useState<TrendingProduct[]>([]);

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/auth/trending-products/")
//       .then(res => res.json())
//       .then(data => setProducts(data))
//       .catch(err => console.error(err));
//   }, []);

//   const scroll = (direction: "left" | "right") => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({
//         left: direction === "left" ? -300 : 300,
//         behavior: "smooth",
//       });
//     }
//   };

//   if (products.length === 0) return null;

//   return (
//     <div className="bg-secondary/20 py-6 border-b border-border">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center gap-4">
//           <h3 className="text-sm font-bold uppercase whitespace-nowrap text-muted-foreground">
//             Trending Now:
//           </h3>

//           <div className="relative flex-1 group overflow-hidden">
//             <Button
//               variant="ghost"
//               size="icon"
//               className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 shadow-md h-6 w-6 rounded-full opacity-0 group-hover:opacity-100"
//               onClick={() => scroll("left")}
//             >
//               <ChevronLeft className="h-3 w-3" />
//             </Button>

//             <div
//               ref={scrollRef}
//               className="flex gap-2 overflow-x-auto scrollbar-hide px-8 items-center"
//             >
//               {products.map(product => (
//                 <Link
//                   key={product.id}
//                   to={`/category/${product.category}/${product.subcategory}`}
//                   className="whitespace-nowrap px-3 py-1 bg-white border border-border rounded-full text-xs font-medium hover:border-primary hover:text-primary transition"
//                 >
//                   {product.name}
//                 </Link>
//               ))}
//             </div>

//             <Button
//               variant="ghost"
//               size="icon"
//               className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 shadow-md h-6 w-6 rounded-full opacity-0 group-hover:opacity-100"
//               onClick={() => scroll("right")}
//             >
//               <ChevronRight className="h-3 w-3" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TrendingSection;


// import { useRef, useEffect, useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom";

// interface TrendingProduct {
//   id: number;
//   name: string;
//   slug: string;
//   category: string;
//   subcategory: string;
// }

// const TrendingSection = () => {
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const [products, setProducts] = useState<TrendingProduct[]>([]);

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/auth/trending-products/")
//       .then(res => res.json())
//       .then(data => setProducts(data))
//       .catch(err => console.error("Trending API error:", err));
//   }, []);

//   const scroll = (direction: "left" | "right") => {
//     scrollRef.current?.scrollBy({
//       left: direction === "left" ? -300 : 300,
//       behavior: "smooth",
//     });
//   };

//   if (products.length === 0) {
//     return (
//       <div className="p-4 text-sm text-muted-foreground">
//         No trending products
//       </div>
//     );
//   }

//   return (
//     <div className="bg-secondary/20 py-6 border-b border-border">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center gap-4">
//           <h3 className="text-sm font-bold uppercase whitespace-nowrap">
//             Trending Now:
//           </h3>

//           <div className="relative flex-1 group overflow-hidden">
//             <Button
//               variant="ghost"
//               size="icon"
//               className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
//               onClick={() => scroll("left")}
//             >
//               <ChevronLeft className="h-4 w-4" />
//             </Button>

//             <div
//               ref={scrollRef}
//               className="flex gap-2 overflow-x-auto px-10 items-center"
//             >
//               {products.map(product => (
//                 <Link
//                   key={product.id}
//                   to={`/category/${product.category}/${product.subcategory}`}
//                   className="whitespace-nowrap px-3 py-1 bg-white border rounded-full text-xs hover:border-primary hover:text-primary"
//                 >
//                   {product.name}
//                 </Link>
//               ))}
//             </div>

//             <Button
//               variant="ghost"
//               size="icon"
//               className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
//               onClick={() => scroll("right")}
//             >
//               <ChevronRight className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TrendingSection;


// import { useRef, useEffect, useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom";

// interface TrendingProduct {
//   id: number;
//   name: string;
//   slug: string;
//   category: string;
//   subcategory: string;
// }

// const TrendingSection = () => {
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const [products, setProducts] = useState<TrendingProduct[]>([]);

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/auth/trending-products/")
//       .then(res => res.json())
//       .then(data => setProducts(data))
//       .catch(() => setProducts([]));
//   }, []);

//   // 🔥 KEY LINE: if no trending → show NOTHING
//   if (products.length === 0) return null;

//   const scroll = (direction: "left" | "right") => {
//     scrollRef.current?.scrollBy({
//       left: direction === "left" ? -300 : 300,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <div className="bg-secondary/20 py-6 border-b border-border">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center gap-4">
//           <h3 className="text-sm font-bold uppercase whitespace-nowrap">
//             Trending Now
//           </h3>

//           <div className="relative flex-1 overflow-hidden">
//             <Button
//               variant="ghost"
//               size="icon"
//               className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
//               onClick={() => scroll("left")}
//             >
//               <ChevronLeft className="h-4 w-4" />
//             </Button>

//             <div
//               ref={scrollRef}
//               className="flex gap-2 overflow-x-auto px-10 items-center"
//             >
//               {products.map(product => (
//                 <Link
//                   key={product.id}
//                   to={`/category/${product.category}/${product.subcategory}`}
//                   className="whitespace-nowrap px-3 py-1 bg-white border rounded-full text-xs hover:border-primary hover:text-primary"
//                 >
//                   {product.name}
//                 </Link>
//               ))}
//             </div>

//             <Button
//               variant="ghost"
//               size="icon"
//               className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
//               onClick={() => scroll("right")}
//             >
//               <ChevronRight className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TrendingSection;


// import { useRef, useEffect, useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom";

// interface TrendingProduct {
//   id: number;
//   name: string;
//   slug: string;
//   category: string;
//   subcategory: string;
// }

// const TrendingSection = () => {
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const [products, setProducts] = useState<TrendingProduct[]>([]);

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/auth/trending-products/")
//       .then((res) => res.json())
//       .then((data) => {
//         if (Array.isArray(data) && data.length > 0) {
//           setProducts(data);
//         }
//       })
//       .catch(() => {
//         setProducts([]);
//       });
//   }, []);

//   // ✅ IF NO TRENDING → SHOW NOTHING
//   if (products.length === 0) return null;

//   const scroll = (direction: "left" | "right") => {
//     scrollRef.current?.scrollBy({
//       left: direction === "left" ? -300 : 300,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <div className="bg-secondary/20 py-6 border-b border-border">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center gap-4">
//           <h3 className="text-sm font-bold uppercase whitespace-nowrap">
//             Trending Now
//           </h3>

//           <div className="relative flex-1 overflow-hidden">
//             <Button
//               variant="ghost"
//               size="icon"
//               className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
//               onClick={() => scroll("left")}
//             >
//               <ChevronLeft className="h-4 w-4" />
//             </Button>

//             <div
//               ref={scrollRef}
//               className="flex gap-2 overflow-x-auto px-10 items-center"
//             >
//               {products.map((product) => (
//                 <Link
//                   key={product.id}
//                   to={`/category/${product.category}/${product.subcategory}`}
//                   className="whitespace-nowrap px-3 py-1 bg-white border rounded-full text-xs hover:border-primary hover:text-primary transition"
//                 >
//                   {product.name}
//                 </Link>
//               ))}
//             </div>

//             <Button
//               variant="ghost"
//               size="icon"
//               className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
//               onClick={() => scroll("right")}
//             >
//               <ChevronRight className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TrendingSection;

// import { useRef, useEffect, useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom";

// /* =========================
//    TYPES (MATCH BACKEND)
// ========================= */
// interface TrendingProduct {
//   id: number;
//   name: string;
//   slug: string;
//   image: string | null;
//   mrp: number;
//   price: number;
//   category: string;
//   subcategory: string;
//   in_stock: boolean;
// }

// /* =========================
//    COMPONENT
// ========================= */
// const TrendingSection = () => {
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const [products, setProducts] = useState<TrendingProduct[]>([]);
//   const [loading, setLoading] = useState(true);

//   /* =========================
//      FETCH TRENDING PRODUCTS
//   ========================= */
//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/auth/trending-products/")
//       .then((res) => res.json())
//       .then((data) => {
//         setProducts(data);
//         setLoading(false);
//       })
//       .catch(() => {
//         setProducts([]);
//         setLoading(false);
//       });
//   }, []);

//   /* =========================
//      HIDE SECTION IF EMPTY
//   ========================= */
//   if (loading || products.length === 0) return null;

//   /* =========================
//      SCROLL HANDLER
//   ========================= */
//   const scroll = (direction: "left" | "right") => {
//     scrollRef.current?.scrollBy({
//       left: direction === "left" ? -300 : 300,
//       behavior: "smooth",
//     });
//   };

//   /* =========================
//      UI
//   ========================= */
//   return (
//     <div className="bg-secondary/20 py-6 border-b border-border">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center gap-4">

//           {/* TITLE */}
//           <h3 className="text-sm font-bold uppercase whitespace-nowrap">
//             Trending Now 🔥
//           </h3>

//           {/* SLIDER */}
//           <div className="relative flex-1 overflow-hidden">

//             {/* LEFT BUTTON */}
//             <Button
//               variant="ghost"
//               size="icon"
//               className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
//               onClick={() => scroll("left")}
//             >
//               <ChevronLeft className="h-4 w-4" />
//             </Button>

//             {/* ITEMS */}
//             <div
//               ref={scrollRef}
//               className="flex gap-2 overflow-x-auto px-10 items-center scrollbar-hide"
//             >
//               {products.map((product) => (
//                 <Link
//                   key={product.id}
//                   to={`/category/${product.category}/${product.subcategory}`}
//                   className="flex items-center gap-2 whitespace-nowrap px-3 py-1 bg-white border rounded-full text-xs hover:border-primary hover:text-primary transition"
//                 >
//                   {product.image && (
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       className="h-5 w-5 rounded-full object-cover"
//                     />
//                   )}
//                   <span>{product.name}</span>
//                 </Link>
//               ))}
//             </div>

//             {/* RIGHT BUTTON */}
//             <Button
//               variant="ghost"
//               size="icon"
//               className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
//               onClick={() => scroll("right")}
//             >
//               <ChevronRight className="h-4 w-4" />
//             </Button>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TrendingSection;


// import { useRef, useEffect, useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom";

// /* =========================
//    TYPES (MATCH BACKEND)
// ========================= */
// interface TrendingProduct {
//   id: number;
//   name: string;
//   slug: string;
//   image: string | null;
//   mrp: string;
//   price: string;
//   category: string;     // category slug
//   subcategory: string;  // subcategory slug
//   in_stock: boolean;
//   priority: number;
//   is_trending: boolean;
// }

// /* =========================
//    COMPONENT
// ========================= */
// const TrendingSection = () => {
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const [products, setProducts] = useState<TrendingProduct[]>([]);
//   const [loading, setLoading] = useState(true);

//   /* =========================
//      FETCH TRENDING PRODUCTS
//   ========================= */
//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/auth/trending-products/")
//       .then((res) => res.json())
//       .then((data) => {
//         setProducts(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Trending API error:", err);
//         setLoading(false);
//       });
//   }, []);

//   /* =========================
//      HIDE IF NO TRENDING
//   ========================= */
//   if (loading || products.length === 0) return null;

//   /* =========================
//      SCROLL HANDLER
//   ========================= */
//   const scroll = (direction: "left" | "right") => {
//     scrollRef.current?.scrollBy({
//       left: direction === "left" ? -300 : 300,
//       behavior: "smooth",
//     });
//   };

//   /* =========================
//      UI
//   ========================= */
//   return (
//     <div className="bg-secondary/20 py-6 border-b border-border">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center gap-4">

//           {/* TITLE */}
//           <h3 className="text-sm font-bold uppercase whitespace-nowrap">
//             Trending Now 🔥
//           </h3>

//           {/* SLIDER */}
//           <div className="relative flex-1 overflow-hidden">

//             {/* LEFT BUTTON */}
//             <Button
//               variant="ghost"
//               size="icon"
//               className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
//               onClick={() => scroll("left")}
//             >
//               <ChevronLeft className="h-4 w-4" />
//             </Button>

//             {/* ITEMS */}
//             <div
//               ref={scrollRef}
//               className="flex gap-2 overflow-x-auto px-10 items-center scrollbar-hide"
//             >
//               {products.map((product) => (
//                 <Link
//                   key={product.id}
//                   to={`/category/${product.category}/${product.subcategory}`}
//                   className="flex items-center gap-2 whitespace-nowrap px-3 py-1 bg-white border rounded-full text-xs hover:border-primary hover:text-primary transition"
//                 >
//                   {product.image && (
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       className="h-5 w-5 rounded-full object-cover"
//                     />
//                   )}
//                   <span>{product.name}</span>
//                 </Link>
//               ))}
//             </div>

//             {/* RIGHT BUTTON */}
//             <Button
//               variant="ghost"
//               size="icon"
//               className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
//               onClick={() => scroll("right")}
//             >
//               <ChevronRight className="h-4 w-4" />
//             </Button>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TrendingSection;


// import { useRef, useEffect, useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom";

// interface TrendingItem {
//   id: number;
//   name: string;
//   category_slug: string;
//   subcategory_slug: string;
// }

// const TrendingSection = () => {
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const [items, setItems] = useState<TrendingItem[]>([]);

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/auth/trending-products-simple/")
//       .then((res) => res.json())
//       .then((data) => setItems(data))
//       .catch((err) => console.error("Trending API error", err));
//   }, []);

//   if (items.length === 0) return null;

//   const scroll = (direction: "left" | "right") => {
//     scrollRef.current?.scrollBy({
//       left: direction === "left" ? -300 : 300,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <div className="bg-secondary/20 py-6 border-b border-border">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center gap-4">
//           <h3 className="text-sm font-bold uppercase whitespace-nowrap">
//             Trending Now
//           </h3>

//           <div className="relative flex-1 overflow-hidden">
//             <Button
//               variant="ghost"
//               size="icon"
//               className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
//               onClick={() => scroll("left")}
//             >
//               <ChevronLeft className="h-4 w-4" />
//             </Button>

//             <div
//               ref={scrollRef}
//               className="flex gap-2 overflow-x-auto px-10 items-center scrollbar-hide"
//             >
//               {items.map((item) => (
//                 <Link
//                   key={item.id}
//                   to={`/category/${item.category_slug}/${item.subcategory_slug}`}
//                   className="whitespace-nowrap px-3 py-1 bg-white border rounded-full text-xs hover:border-primary hover:text-primary transition"
//                 >
//                   {item.name}
//                 </Link>
//               ))}
//             </div>

//             <Button
//               variant="ghost"
//               size="icon"
//               className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
//               onClick={() => scroll("right")}
//             >
//               <ChevronRight className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TrendingSection;


const TrendingSection = () => {
  return (
    <div style={{ background: "red", color: "white", padding: 20 }}>
      TRENDING SECTION IS RENDERING
    </div>
  );
};

export default TrendingSection;
