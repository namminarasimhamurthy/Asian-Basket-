// import { useState } from 'react';
// import { ChevronDown, ChevronRight, Apple, Beef, Wheat, Coffee, Fish, Milk } from 'lucide-react';
// import { cn } from '@/lib/utils';
// import { Link } from 'react-router-dom';

// const categories = [
//     {
//         id: 'fruits-veg',
//         name: 'Fruits & Vegetables',
//         icon: Apple,
//         subcategories: [
//             'Fresh Vegetables', 'Fresh Fruits', 'Leafy Vegetables', 'Exotic Fruits', 'Organic Produce'
//         ]
//     },
//     {
//         id: 'meat',
//         name: 'Meat & Poultry',
//         icon: Beef,
//         subcategories: [
//             'Fresh Chicken', 'Lamb & Mutton', 'Fresh Beef', 'Marinated Meat', 'Frozen Meat'
//         ]
//     },
//     {
//         id: 'seafood',
//         name: 'Fresh Seafood',
//         icon: Fish,
//         subcategories: [
//             'Fresh Fish', 'Prawns & Shrimps', 'Crab & Lobster', 'Frozen Seafood', 'Dry Fish'
//         ]
//     },
//     {
//         id: 'staples',
//         name: 'Rice & Flour',
//         icon: Wheat,
//         subcategories: [
//             'Basmati Rice', 'Sona Masoori', 'Atta & Flours', 'Pulses & Dals', 'Cooking Oils'
//         ]
//     },
//     {
//         id: 'dairy',
//         name: 'Dairy & Bakery',
//         icon: Milk,
//         subcategories: [
//             'Milk & Curd', 'Paneer', 'Butter & Ghee', 'Bread & Buns', 'Eggs'
//         ]
//     },
//     {
//         id: 'snacks',
//         name: 'Snacks & Drinks',
//         icon: Coffee,
//         subcategories: [
//             'Biscuits', 'Noodles', 'Tea & Coffee', 'Cold Drinks', 'Indian Sweets'
//         ]
//     }
// ];

// const MegaMenu = () => {
//     const [activeCategory, setActiveCategory] = useState<string | null>(null);

//     return (
//         <div className="hidden md:block bg-secondary/30 border-b border-border">
//             <div className="container mx-auto px-4">
//                 <ul className="flex items-center justify-between gap-1 text-sm font-medium">
//                     {categories.map((category) => (
//                         <li
//                             key={category.id}
//                             className="group relative"
//                             onMouseEnter={() => setActiveCategory(category.id)}
//                             onMouseLeave={() => setActiveCategory(null)}
//                         >
//                             <Link
//                                 to={`/category/${category.id}`}
//                                 className={cn(
//                                     "flex items-center gap-2 py-3 px-4 hover:bg-white hover:text-primary transition-colors rounded-t-md",
//                                     activeCategory === category.id && "bg-white text-primary shadow-sm"
//                                 )}
//                             >
//                                 <category.icon className="w-4 h-4" />
//                                 {category.name}
//                                 <ChevronDown className="w-3 h-3 opacity-50" />
//                             </Link>

//                             {/* Mega Dropdown */}
//                             <div
//                                 className={cn(
//                                     "absolute top-full left-0 w-64 bg-white shadow-xl rounded-b-md border border-border z-50 transform origin-top transition-all duration-200",
//                                     activeCategory === category.id
//                                         ? "opacity-100 scale-100 visible"
//                                         : "opacity-0 scale-95 invisible"
//                                 )}
//                             >
//                                 <ul className="py-2">
//                                     {category.subcategories.map((sub, idx) => (
//                                         <li key={idx}>
//                                             <Link
//                                                 to={`/search?q=${sub}`}
//                                                 className="flex items-center justify-between px-4 py-2 hover:bg-secondary/50 text-foreground/80 hover:text-primary transition-colors"
//                                             >
//                                                 {sub}
//                                                 <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
//                                             </Link>
//                                         </li>
//                                     ))}
//                                     <li className="mt-2 pt-2 border-t border-dashed border-border px-4 pb-2">
//                                         <Link to={`/category/${category.id}`} className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
//                                             View all {category.name} <ChevronRight className="w-3 h-3" />
//                                         </Link>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </li>
//                     ))}
//                     <li>
//                         <Link to="/offers" className="flex items-center gap-2 py-3 px-4 text-accent hover:text-accent/80 font-bold animate-pulse">
//                             Offers
//                         </Link>
//                     </li>
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default MegaMenu;




// import { useState } from 'react';
// import {
//   ChevronDown,
//   ChevronRight,
//   Apple,
//   Beef,
//   Wheat,
//   Coffee,
//   Fish,
//   Milk
// } from 'lucide-react';
// import { cn } from '@/lib/utils';
// import { Link } from 'react-router-dom';

// const categories = [
//   {
//     id: 'fruits-veg',
//     name: 'Fruits & Vegetables',
//     icon: Apple,
//     subcategories: [
//       { name: 'Fresh Vegetables', slug: 'fresh-vegetables' },
//       { name: 'Fresh Fruits', slug: 'fresh-fruits' },
//       { name: 'Leafy Vegetables', slug: 'leafy-vegetables' },
//       { name: 'Exotic Fruits', slug: 'exotic-fruits' },
//       { name: 'Organic Produce', slug: 'organic-produce' },
//     ],
//   },
//   {
//     id: 'meat',
//     name: 'Meat & Poultry',
//     icon: Beef,
//     subcategories: [
//       { name: 'Fresh Chicken', slug: 'fresh-chicken' },
//       { name: 'Lamb & Mutton', slug: 'lamb-mutton' },
//       { name: 'Fresh Beef', slug: 'fresh-beef' },
//       { name: 'Marinated Meat', slug: 'marinated-meat' },
//       { name: 'Frozen Meat', slug: 'frozen-meat' },
//     ],
//   },
//   {
//     id: 'seafood',
//     name: 'Fresh Seafood',
//     icon: Fish,
//     subcategories: [
//       { name: 'Fresh Fish', slug: 'fresh-fish' },
//       { name: 'Prawns & Shrimps', slug: 'prawns-shrimps' },
//       { name: 'Crab & Lobster', slug: 'crab-lobster' },
//       { name: 'Frozen Seafood', slug: 'frozen-seafood' },
//       { name: 'Dry Fish', slug: 'dry-fish' },
//     ],
//   },
//   {
//     id: 'staples',
//     name: 'Rice & Flour',
//     icon: Wheat,
//     subcategories: [
//       { name: 'Basmati Rice', slug: 'basmati-rice' },
//       { name: 'Sona Masoori', slug: 'sona-masoori' },
//       { name: 'Atta & Flours', slug: 'atta-flours' },
//       { name: 'Pulses & Dals', slug: 'pulses-dals' },
//       { name: 'Cooking Oils', slug: 'cooking-oils' },
//     ],
//   },
//   {
//     id: 'dairy',
//     name: 'Dairy & Bakery',
//     icon: Milk,
//     subcategories: [
//       { name: 'Milk & Curd', slug: 'milk-curd' },
//       { name: 'Paneer', slug: 'paneer' },
//       { name: 'Butter & Ghee', slug: 'butter-ghee' },
//       { name: 'Bread & Buns', slug: 'bread-buns' },
//       { name: 'Eggs', slug: 'eggs' },
//     ],
//   },
//   {
//     id: 'snacks',
//     name: 'Snacks & Drinks',
//     icon: Coffee,
//     subcategories: [
//       { name: 'Biscuits', slug: 'biscuits' },
//       { name: 'Noodles', slug: 'noodles' },
//       { name: 'Tea & Coffee', slug: 'tea-coffee' },
//       { name: 'Cold Drinks', slug: 'cold-drinks' },
//       { name: 'Indian Sweets', slug: 'indian-sweets' },
//     ],
//   },
// ];

// const MegaMenu = () => {
//   const [activeCategory, setActiveCategory] = useState<string | null>(null);

//   return (
//     <div className="hidden md:block bg-secondary/30 border-b border-border">
//       <div className="container mx-auto px-4">
//         <ul className="flex items-center justify-between gap-1 text-sm font-medium">
//           {categories.map((category) => (
//             <li
//               key={category.id}
//               className="group relative"
//               onMouseEnter={() => setActiveCategory(category.id)}
//               onMouseLeave={() => setActiveCategory(null)}
//             >
//               {/* MAIN CATEGORY */}
//               <Link
//                 to={`/category/${category.id}`}
//                 className={cn(
//                   'flex items-center gap-2 py-3 px-4 hover:bg-white hover:text-primary transition-colors rounded-t-md',
//                   activeCategory === category.id &&
//                     'bg-white text-primary shadow-sm'
//                 )}
//               >
//                 <category.icon className="w-4 h-4" />
//                 {category.name}
//                 <ChevronDown className="w-3 h-3 opacity-50" />
//               </Link>

//               {/* DROPDOWN */}
//               <div
//                 className={cn(
//                   'absolute top-full left-0 w-64 bg-white shadow-xl rounded-b-md border border-border z-50 transition-all duration-200',
//                   activeCategory === category.id
//                     ? 'opacity-100 scale-100 visible'
//                     : 'opacity-0 scale-95 invisible'
//                 )}
//               >
//                 <ul className="py-2">
//                   {category.subcategories.map((sub) => (
//                     <li key={sub.slug}>
//                       <Link
//                         to={`/category/${sub.slug}`}
//                         className="flex items-center justify-between px-4 py-2 hover:bg-secondary/50 text-foreground/80 hover:text-primary"
//                       >
//                         {sub.name}
//                         <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
//                       </Link>
//                     </li>
//                   ))}

//                   <li className="mt-2 pt-2 border-t border-dashed border-border px-4 pb-2">
//                     <Link
//                       to={`/category/${category.id}`}
//                       className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
//                     >
//                       View all {category.name}
//                       <ChevronRight className="w-3 h-3" />
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//             </li>
//           ))}

//           {/* OFFERS */}
//           <li>
//             <Link
//               to="/offers"
//               className="flex items-center gap-2 py-3 px-4 text-accent font-bold animate-pulse"
//             >
//               Offers
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default MegaMenu;



// import { useState, useEffect } from "react";
// import { ChevronDown, ChevronRight } from "lucide-react";
// import * as Icons from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Link } from "react-router-dom";
// import axios from "axios";

// /* ================================
//    API URL
// ================================ */
// const API_URL = "http://127.0.0.1:8000/api/auth/categories/";

// /* ================================
//    Transform API → Old Frontend Shape
// ================================ */
// const transformCategories = (apiData) => {
//   return apiData.map((cat) => ({
//     id: cat.slug,                     // keep old id usage
//     name: cat.name,
//     icon: Icons[cat.icon] || Icons.Folder,
//     subcategories: cat.subcategories.map((sub) => sub.name),
//   }));
// };

// /* ================================
//    MegaMenu Component
// ================================ */
// const MegaMenu = () => {
//   const [activeCategory, setActiveCategory] = useState(null);
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     axios
//       .get(API_URL)
//       .then((res) => {
//         setCategories(transformCategories(res.data));
//       })
//       .catch((err) => {
//         console.error("Category API error:", err);
//       });
//   }, []);

//   return (
//     <div className="hidden md:block bg-secondary/30 border-b border-border">
//       <div className="container mx-auto px-4">
//         <ul className="flex items-center justify-between gap-1 text-sm font-medium">
//           {categories.map((category) => (
//             <li
//               key={category.id}
//               className="group relative"
//               onMouseEnter={() => setActiveCategory(category.id)}
//               onMouseLeave={() => setActiveCategory(null)}
//             >
//               {/* Category */}
//               <Link
//                 to={`/category/${category.id}`}
//                 className={cn(
//                   "flex items-center gap-2 py-3 px-4 hover:bg-white hover:text-primary transition-colors rounded-t-md",
//                   activeCategory === category.id &&
//                     "bg-white text-primary shadow-sm"
//                 )}
//               >
//                 <category.icon className="w-4 h-4" />
//                 {category.name}
//                 <ChevronDown className="w-3 h-3 opacity-50" />
//               </Link>

//               {/* Mega Dropdown */}
//               <div
//                 className={cn(
//                   "absolute top-full left-0 w-64 bg-white shadow-xl rounded-b-md border border-border z-50 transform origin-top transition-all duration-200",
//                   activeCategory === category.id
//                     ? "opacity-100 scale-100 visible"
//                     : "opacity-0 scale-95 invisible"
//                 )}
//               >
//                 <ul className="py-2">
//                   {category.subcategories.map((sub, idx) => (
//                     <li key={idx}>
//                       <Link
//                         to={`/search?q=${sub}`}
//                         className="flex items-center justify-between px-4 py-2 hover:bg-secondary/50 text-foreground/80 hover:text-primary transition-colors"
//                       >
//                         {sub}
//                         <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
//                       </Link>
//                     </li>
//                   ))}

//                   <li className="mt-2 pt-2 border-t border-dashed border-border px-4 pb-2">
//                     <Link
//                       to={`/category/${category.id}`}
//                       className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
//                     >
//                       View all {category.name}
//                       <ChevronRight className="w-3 h-3" />
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//             </li>
//           ))}

//           {/* Offers */}
//           <li>
//             <Link
//               to="/offers"
//               className="flex items-center gap-2 py-3 px-4 text-accent hover:text-accent/80 font-bold animate-pulse"
//             >
//               Offers
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default MegaMenu;


// import { useState, useEffect } from "react";
// import { ChevronDown, ChevronRight } from "lucide-react";
// import * as Icons from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Link } from "react-router-dom";
// import axios from "axios";

// /* ================================
//    API URL
// ================================ */
// const API_URL = "http://127.0.0.1:8000/api/auth/categories/";

// /* ================================
//    Transform API → Frontend Shape
// ================================ */
// const transformCategories = (apiData: any[]) => {
//   return apiData.map((cat) => ({
//     id: cat.slug,
//     name: cat.name,
//     icon: Icons[cat.icon] || Icons.Folder,
//     subcategories: cat.subcategories.map((sub: any) => ({
//       name: sub.name,
//       slug: sub.slug,
//     })),
//   }));
// };

// /* ================================
//    MegaMenu Component
// ================================ */
// const MegaMenu = () => {
//   const [activeCategory, setActiveCategory] = useState<string | null>(null);
//   const [categories, setCategories] = useState<any[]>([]);

//   useEffect(() => {
//     axios
//       .get(API_URL)
//       .then((res) => {
//         setCategories(transformCategories(res.data));
//       })
//       .catch((err) => {
//         console.error("Category API error:", err);
//       });
//   }, []);

//   return (
//     <div className="hidden md:block bg-secondary/30 border-b border-border">
//       <div className="container mx-auto px-4">
//         <ul className="flex items-center justify-between gap-1 text-sm font-medium">
//           {categories.map((category) => (
//             <li
//               key={category.id}
//               className="group relative"
//               onMouseEnter={() => setActiveCategory(category.id)}
//               onMouseLeave={() => setActiveCategory(null)}
//             >
//               {/* MAIN CATEGORY */}
//               <Link
//                 to={`/category/${category.id}`}
//                 className={cn(
//                   "flex items-center gap-2 py-3 px-4 hover:bg-white hover:text-primary transition-colors rounded-t-md",
//                   activeCategory === category.id &&
//                     "bg-white text-primary shadow-sm"
//                 )}
//               >
//                 <category.icon className="w-4 h-4" />
//                 {category.name}
//                 <ChevronDown className="w-3 h-3 opacity-50" />
//               </Link>

//               {/* DROPDOWN */}
//               <div
//                 className={cn(
//                   "absolute top-full left-0 w-64 bg-white shadow-xl rounded-b-md border border-border z-50 transition-all duration-200",
//                   activeCategory === category.id
//                     ? "opacity-100 scale-100 visible"
//                     : "opacity-0 scale-95 invisible"
//                 )}
//               >
//                 <ul className="py-2">
//                   {category.subcategories.map((sub: any) => (
//                     <li key={sub.slug}>
//                       <Link
//                         to={`/search?q=${sub.slug}`}
//                         className="flex items-center justify-between px-4 py-2 hover:bg-secondary/50 text-foreground/80 hover:text-primary transition-colors"
//                       >
//                         {sub.name}
//                         <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
//                       </Link>
//                     </li>
//                   ))}

//                   <li className="mt-2 pt-2 border-t border-dashed border-border px-4 pb-2">
//                     <Link
//                       to={`/category/${category.id}`}
//                       className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
//                     >
//                       View all {category.name}
//                       <ChevronRight className="w-3 h-3" />
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//             </li>
//           ))}

//           {/* OFFERS */}
//           <li>
//             <Link
//               to="/offers"
//               className="flex items-center gap-2 py-3 px-4 text-accent hover:text-accent/80 font-bold animate-pulse"
//             >
//               Offers
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default MegaMenu;


// import { useState, useEffect } from "react";
// import { ChevronDown, ChevronRight } from "lucide-react";
// import * as Icons from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const API_URL = "http://127.0.0.1:8000/api/auth/categories/";

// const transformCategories = (apiData: any[]) => {
//   return apiData.map((cat) => ({
//     id: cat.slug,
//     name: cat.name,
//     icon: Icons[cat.icon] || Icons.Folder,
//     subcategories: cat.subcategories.map((sub: any) => ({
//       name: sub.name,
//       slug: sub.slug,
//     })),
//   }));
// };

// const MegaMenu = () => {
//   const [activeCategory, setActiveCategory] = useState<string | null>(null);
//   const [categories, setCategories] = useState<any[]>([]);

//   useEffect(() => {
//     axios.get(API_URL).then((res) => {
//       setCategories(transformCategories(res.data));
//     });
//   }, []);

//   return (
//     <div className="hidden md:block bg-secondary/30 border-b border-border">
//       <div className="container mx-auto px-4">
//         <ul className="flex items-center gap-1 text-sm font-medium">
//           {categories.map((category) => (
//             <li
//               key={category.id}
//               className="group relative"
//               onMouseEnter={() => setActiveCategory(category.id)}
//               onMouseLeave={() => setActiveCategory(null)}
//             >
//               {/* CATEGORY */}
//               <Link
//                 to={`/category/${category.id}`}
//                 className={cn(
//                   "flex items-center gap-2 py-3 px-4 hover:bg-white hover:text-primary rounded-t-md",
//                   activeCategory === category.id &&
//                     "bg-white text-primary shadow-sm"
//                 )}
//               >
//                 <category.icon className="w-4 h-4" />
//                 {category.name}
//                 <ChevronDown className="w-3 h-3 opacity-50" />
//               </Link>

//               {/* SUBCATEGORY DROPDOWN */}
//               <div
//                 className={cn(
//                   "absolute top-full left-0 w-64 bg-white shadow-xl rounded-b-md border z-50",
//                   activeCategory === category.id
//                     ? "opacity-100 visible"
//                     : "opacity-0 invisible"
//                 )}
//               >
//                 <ul className="py-2">
//                   {category.subcategories.map((sub: any) => (
//                     <li key={sub.slug}>
//                       <Link
//                         to={`/category/${category.id}?sub=${sub.slug}`}
//                         className="flex items-center justify-between px-4 py-2 hover:bg-secondary/50"
//                       >
//                         {sub.name}
//                         <ChevronRight className="w-3 h-3 opacity-50" />
//                       </Link>
//                     </li>
//                   ))}

//                   <li className="mt-2 pt-2 border-t px-4">
//                     <Link
//                       to={`/category/${category.id}`}
//                       className="text-xs font-bold text-primary"
//                     >
//                       View all {category.name}
//                     </Link>
//                     <li>
//                     <Link
//                       to="/offers"
//                      className="flex items-center gap-2 py-3 px-4 text-accent hover:text-accent/80 font-bold animate-pulse"  >Offers
//                      </Link>
//                      </li>

                    
//                   </li>
//                 </ul>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default MegaMenu;


import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/auth/categories/";

const transformCategories = (apiData: any[]) => {
  return apiData.map((cat) => ({
    id: cat.slug,
    name: cat.name,
    icon: Icons[cat.icon] || Icons.Folder,
    subcategories: cat.subcategories.map((sub: any) => ({
      name: sub.name,
      slug: sub.slug,
    })),
  }));
};

const MegaMenu = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    axios.get(API_URL).then((res) => {
      setCategories(transformCategories(res.data));
    });
  }, []);

  return (
    <div className="hidden md:block bg-secondary/30 border-b border-border">
      <div className="container mx-auto px-4">
        <ul className="flex items-center gap-1 text-sm font-medium">
          {categories.map((category) => (
            <li
              key={category.id}
              className="group relative"
              onMouseEnter={() => setActiveCategory(category.id)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              {/* CATEGORY */}
              <Link
                to={`/category/${category.id}`}
                className={cn(
                  "flex items-center gap-2 py-3 px-4 hover:bg-white hover:text-primary rounded-t-md",
                  activeCategory === category.id &&
                    "bg-white text-primary shadow-sm"
                )}
              >
                <category.icon className="w-4 h-4" />
                {category.name}
                <ChevronDown className="w-3 h-3 opacity-50" />
              </Link>

              {/* SUBCATEGORY DROPDOWN */}
              <div
                className={cn(
                  "absolute top-full left-0 w-64 bg-white shadow-xl rounded-b-md border z-50",
                  activeCategory === category.id
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                )}
              >
                <ul className="py-2">
                  {category.subcategories.map((sub: any) => (
                    <li key={sub.slug}>
                      <Link
                        to={`/category/${category.id}?sub=${sub.slug}`}
                        className="flex items-center justify-between px-4 py-2 hover:bg-secondary/50"
                      >
                        {sub.name}
                        <ChevronRight className="w-3 h-3 opacity-50" />
                      </Link>
                    </li>
                  ))}

                  {/* FIXED SECTION (NO NESTED LI) */}
                  <li className="mt-2 pt-2 border-t px-4 space-y-2">
                    <Link
                      to={`/category/${category.id}`}
                      className="block text-xs font-bold text-primary"
                    >
                      View all {category.name}
                    </Link>

                    <Link
                      to="/offers"
                      className="block text-accent hover:text-accent/80 font-bold animate-pulse text-xs"
                    >
                      Offers
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MegaMenu;