import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "https://api.asianbasket.ie/api/auth/categories/";

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
                    "bg-white text-primary shadow-sm",
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
                    : "opacity-0 invisible",
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
