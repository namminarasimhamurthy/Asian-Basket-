// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { Eye, EyeOff, LogIn, Mail, Lock } from 'lucide-react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { useToast } from '@/hooks/use-toast';
// import { useAuth } from '@/contexts/AuthContext';

// const loginSchema = z.object({
//   email: z.string().email('Please enter a valid email'),
//   password: z.string().min(6, 'Password must be at least 6 characters'),
// });

// type LoginForm = z.infer<typeof loginSchema>;

// const Login = () => {
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const { login } = useAuth(); // ✅ IMPORTANT

//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginForm>({
//     resolver: zodResolver(loginSchema),
//   });

//   // ✅ LOGIN USING AUTH CONTEXT
//   const onSubmit = async (data: LoginForm) => {
//     setIsLoading(true);

//     const result = await login(data.email, data.password);

//     setIsLoading(false);

//     if (result.success) {
//       toast({
//         title: 'Welcome back!',
//         description: 'You have been logged in successfully.',
//       });
//       navigate('/');
//     } else {
//       toast({
//         title: 'Login failed',
//         description: result.error,
//         variant: 'destructive',
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
//       <Card className="w-full max-w-md shadow-2xl border-2">
//         <CardHeader className="text-center">
//           <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
//             <LogIn className="h-8 w-8 text-primary-foreground" />
//           </div>
//           <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
//           <CardDescription>Sign in to your account</CardDescription>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

//             {/* EMAIL */}
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="your@email.com"
//                   className="pl-10"
//                   {...register('email')}
//                 />
//               </div>
//               {errors.email && (
//                 <p className="text-sm text-destructive">{errors.email.message}</p>
//               )}
//             </div>

//             {/* PASSWORD */}
//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   id="password"
//                   type={showPassword ? 'text' : 'password'}
//                   placeholder="••••••••"
//                   className="pl-10 pr-10"
//                   {...register('password')}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
//                 >
//                   {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                 </button>
//               </div>
//               {errors.password && (
//                 <p className="text-sm text-destructive">{errors.password.message}</p>
//               )}
//             </div>

//             <Button
//               type="submit"
//               className="w-full h-12 bg-primary hover:bg-primary/90 font-semibold"
//               disabled={isLoading}
//             >
//               {isLoading ? 'Signing in...' : 'Sign In'}
//             </Button>
//           </form>

//           <div className="mt-6 text-center">
//             <p className="text-sm text-muted-foreground">
//               Don&apos;t have an account?{' '}
//               <Link to="/register" className="text-primary font-semibold hover:underline">
//                 Sign up
//               </Link>
//             </p>
//           </div>

//           <div className="mt-4 text-center">
//             <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
//               ← Back to Home
//             </Link>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Login;


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
  price: number;
  mrp: number;
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
     FILTER BY TAB
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

      {/* ✅ TRENDING (AUTO HIDE IF EMPTY) */}
      <TrendingSection />

      <main>
        {filteredCategories.map((category) => {
          const categoryProducts = products
            .filter((p) => p.category === category.name)
            .sort((a, b) => a.priority - b.priority);

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
