// import { useRef } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { cn } from '@/lib/utils';
// import { Link } from 'react-router-dom';

// const tags = [
//     "Bombay Duck", "Basmati Rice", "Haldiram", "Turiya", "Tindoori",
//     "Blue Crab", "Goat Meat", "Mutton", "Atta", "Biscuits",
//     "Dal Chana", "Kantola", "Fresh Prawns", "Beef"
// ];

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


// import { useRef, useEffect, useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom";

// /* ================= DEFAULT TAGS ================= */
// const defaultTags = [
//   {
//     id: 1,
//     name: "Bombay Duck",
//     category_slug: "seafood",
//     subcategory_slug: "bombay-duck",
//   },
//   {
//     id: 2,
//     name: "Basmati Rice",
//     category_slug: "grocery",
//     subcategory_slug: "basmati-rice",
//   },
//   {
//     id: 3,
//     name: "Haldiram",
//     category_slug: "snacks",
//     subcategory_slug: "haldiram",
//   },
//   {
//     id: 4,
//     name: "Turiya",
//     category_slug: "vegetables",
//     subcategory_slug: "turiya",
//   },
//   {
//     id: 5,
//     name: "Tindoori",
//     category_slug: "vegetables",
//     subcategory_slug: "tindoori",
//   },
//   {
//     id: 6,
//     name: "Blue Crab",
//     category_slug: "seafood",
//     subcategory_slug: "blue-crab",
//   },
//   {
//     id: 7,
//     name: "Goat Meat",
//     category_slug: "meat",
//     subcategory_slug: "goat-meat",
//   },
//   {
//     id: 8,
//     name: "Mutton",
//     category_slug: "meat",
//     subcategory_slug: "mutton",
//   },
//   {
//     id: 9,
//     name: "Atta",
//     category_slug: "grocery",
//     subcategory_slug: "atta",
//   },
//   {
//     id: 10,
//     name: "Biscuits",
//     category_slug: "snacks",
//     subcategory_slug: "biscuits",
//   },
//   {
//     id: 11,
//     name: "Dal Chana",
//     category_slug: "pulses",
//     subcategory_slug: "dal-chana",
//   },
//   {
//     id: 12,
//     name: "Kantola",
//     category_slug: "vegetables",
//     subcategory_slug: "kantola",
//   },
//   {
//     id: 13,
//     name: "Fresh Prawns",
//     category_slug: "seafood",
//     subcategory_slug: "prawns",
//   },
//   {
//     id: 14,
//     name: "Beef",
//     category_slug: "meat",
//     subcategory_slug: "beef",
//   },
// ];

// /* ================= TYPES ================= */
// interface TrendingItem {
//   id: number;
//   name: string;
//   category_slug: string;
//   subcategory_slug: string;
// }

// const TrendingSection = () => {
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const [items, setItems] = useState<TrendingItem[]>(defaultTags);

//   /* ================= FETCH API ================= */
//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/auth/trending-products-simple/")
//       .then((res) => res.json())
//       .then((data) => {
//         if (Array.isArray(data) && data.length > 0) {
//           setItems(data);
//         }
//       })
//       .catch((err) => {
//         console.error("Trending API error", err);
//       });
//   }, []);

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


import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

/* ================= DEFAULT TAGS ================= */
const defaultTags = [
  {
    id: 1,
    name: "Bombay Duck",
    category_slug: "seafood",
    subcategory_slug: "bombay-duck",
  },
  {
    id: 2,
    name: "Basmati Rice",
    category_slug: "grocery",
    subcategory_slug: "basmati-rice",
  },
  {
    id: 3,
    name: "Haldiram",
    category_slug: "snacks",
    subcategory_slug: "haldiram",
  },
  {
    id: 4,
    name: "Turiya",
    category_slug: "vegetables",
    subcategory_slug: "turiya",
  },
  {
    id: 5,
    name: "Tindoori",
    category_slug: "vegetables",
    subcategory_slug: "tindoori",
  },
  {
    id: 6,
    name: "Blue Crab",
    category_slug: "seafood",
    subcategory_slug: "blue-crab",
  },
  {
    id: 7,
    name: "Goat Meat",
    category_slug: "meat",
    subcategory_slug: "goat-meat",
  },
  {
    id: 8,
    name: "Mutton",
    category_slug: "meat",
    subcategory_slug: "mutton",
  },
  {
    id: 9,
    name: "Atta",
    category_slug: "grocery",
    subcategory_slug: "atta",
  },
  {
    id: 10,
    name: "Biscuits",
    category_slug: "snacks",
    subcategory_slug: "biscuits",
  },
  {
    id: 11,
    name: "Dal Chana",
    category_slug: "pulses",
    subcategory_slug: "dal-chana",
  },
  {
    id: 12,
    name: "Kantola",
    category_slug: "vegetables",
    subcategory_slug: "kantola",
  },
  {
    id: 13,
    name: "Fresh Prawns",
    category_slug: "seafood",
    subcategory_slug: "prawns",
  },
  {
    id: 14,
    name: "Beef",
    category_slug: "meat",
    subcategory_slug: "beef",
  },
];

/* ================= TYPES ================= */
interface TrendingItem {
  id: number;
  name: string;
  category_slug: string;
  subcategory_slug: string;
}

const TrendingSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<TrendingItem[]>(defaultTags);

  /* ================= FETCH API ================= */
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/auth/trending-products-simple/")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setItems(data);
        }
      })
      .catch((err) => {
        console.error("Trending API error", err);
      });
  }, []);

  const scroll = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-secondary/20 py-6 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4">
          <h3 className="text-sm font-bold uppercase whitespace-nowrap">
            Trending Now
          </h3>

          <div className="relative flex-1 overflow-hidden">
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div
              ref={scrollRef}
              className="flex gap-2 overflow-x-auto px-10 items-center scrollbar-hide"
            >
              {items.map((item) => (
                <Link
                  key={item.id}
                  to={`/category/${item.category_slug}?sub=${item.subcategory_slug}`}
                  className="whitespace-nowrap px-3 py-1 bg-white border rounded-full text-xs hover:border-primary hover:text-primary transition"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingSection;
