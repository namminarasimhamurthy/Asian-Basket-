// import { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import {
//   ArrowLeft,
//   MapPin,
//   CreditCard,
//   Loader2,
//   Ticket,
//   Plus,
//   Store,
//   Save,
// } from "lucide-react";
// import { useForm, useWatch } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import axios from "axios";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Separator } from "@/components/ui/separator";

// import { useCart } from "@/contexts/CartContext";
// import { useAuth } from "@/contexts/AuthContext";
// import { useOrders } from "@/contexts/OrderContext";
// import { useToast } from "@/hooks/use-toast";

// import { simulatePayment } from "@/lib/razorpay";
// import {
//   calculateDeliveryFee,
//   CartItemWithMeta,
//   DeliveryBreakdown,
// } from "@/lib/deliveryUtils";
// import { decreaseStock } from "@/lib/stockUtils";

// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import api from "@/lib/axios";

// /* ================================
//    API ENDPOINTS
// ================================ */
// const PROMO_API = "http://127.0.0.1:8000/api/auth/promocode/";
// const ADDRESS_API = "http://127.0.0.1:8000/api/auth/addresses/";

// /* ================================
//    TYPES & SCHEMAS
// ================================ */
// type SavedAddress = {
//   id: number;
//   label?: string;
//   full_name: string;
//   phone: string;
//   line1: string;
//   line2?: string;
//   city: string;
//   state: string;
//   zip_code: string;
//   country: string;
//   is_default: boolean;
// };

// const addressSchema = z.object({
//   name: z.string().min(2, "Name is required"),
//   phone: z.string().min(10, "Phone number is required"),
//   street: z.string().min(5, "Street address is required"),
//   city: z.string().min(2, "City is required"),
//   state: z.string().min(2, "State is required"),
//   zipCode: z.string().min(3, "Zip code is required"),
//   notes: z.string().optional(),
//   saveAddress: z.boolean().optional(),
//   addressLabel: z.string().optional(),
// });

// type AddressForm = z.infer<typeof addressSchema>;

// const Checkout = () => {
//   const navigate = useNavigate();
//   const { cartItems, getTotalPrice, clearCart } = useCart();
//   const { user, isAuthenticated, isLoading: authLoading } = useAuth();
//   const { createOrder } = useOrders();
//   const { toast } = useToast();

//   // Address State
//   const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
//   const [loadingAddresses, setLoadingAddresses] = useState(true);
//   const [selectedAddressId, setSelectedAddressId] = useState<string>("manual");

//   // Promo State
//   const [promoCode, setPromoCode] = useState("");
//   const [promoPercent, setPromoPercent] = useState(0);
//   const [promoApplied, setPromoApplied] = useState<string | null>(null);
//   const [promoError, setPromoError] = useState("");

//   // Processing State
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [deliveryBreakdown, setDeliveryBreakdown] =
//     useState<DeliveryBreakdown | null>(null);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     control,
//     formState: { errors },
//   } = useForm<AddressForm>({
//     resolver: zodResolver(addressSchema),
//     defaultValues: {
//       name: "",
//       phone: "",
//       street: "",
//       city: "",
//       state: "",
//       zipCode: "",
//       notes: "",
//       saveAddress: false,
//       addressLabel: "Home",
//     },
//   });

//   // Watch fields
//   const watchedCity = useWatch({ control, name: "city" });
//   const watchedZipCode = useWatch({ control, name: "zipCode" });
//   const watchedSaveAddress = useWatch({ control, name: "saveAddress" });

//   /* ================================
//      FETCH ADDRESSES
//   ================================ */
//   const fetchAddresses = async () => {
//     const token = localStorage.getItem("access");
//     if (!token) return;

//     try {
//       console.log("🚀 Fetching addresses..."); // DEBUG
//       setLoadingAddresses(true);
//       const res = await api.get("auth/addresses/"); // ✅ Uses interceptor automatically
//       console.log("✅ Addresses:", res.data); // DEBUG
//       const addresses: SavedAddress[] = res.data;
//       setSavedAddresses(addresses);

//       if (selectedAddressId === "manual" && addresses.length > 0) {
//         const defaultAddr = addresses.find((a) => a.is_default) || addresses[0];
//         handleSelectAddress(defaultAddr.id.toString(), addresses);
//       }
//     } catch (err) {
//       console.error("Failed to load addresses", err);
//     } finally {
//       setLoadingAddresses(false);
//     }
//   };

//   useEffect(() => {
//     if (isAuthenticated) {
//       fetchAddresses();
//     }
//   }, [isAuthenticated]);

//   // Pre-fill user details if no address selected
//   useEffect(() => {
//     if (user && selectedAddressId === "manual") {
//       setValue("name", user.name || "");
//       setValue("phone", user.phone || "");
//     }
//   }, [user, selectedAddressId, setValue]);

//   /* ================================
//      ADDRESS SELECTION LOGIC
//   ================================ */
//   const handleSelectAddress = (id: string, list = savedAddresses) => {
//     setSelectedAddressId(id);

//     if (id === "manual") {
//       setValue("street", "");
//       setValue("city", "");
//       setValue("state", "");
//       setValue("zipCode", "");
//       setValue("saveAddress", false);
//       if (user) {
//         setValue("name", user.name || "");
//         setValue("phone", user.phone || "");
//       }
//       return;
//     }

//     const addr = list.find((a) => a.id.toString() === id);
//     if (addr) {
//       setValue("name", addr.full_name);
//       setValue("phone", addr.phone);
//       setValue("street", addr.line1 + (addr.line2 ? ", " + addr.line2 : ""));
//       setValue("city", addr.city);
//       setValue("state", addr.state);
//       setValue("zipCode", addr.zip_code);
//     }
//   };

//   /* ================================
//      DELIVERY CALCULATION
//   ================================ */
//   const totalPrice = getTotalPrice();
//   const cartItemsWithMeta: CartItemWithMeta[] = cartItems.map((item) => ({
//     id: item.id,
//     name: item.name,
//     price: item.price,
//     quantity: item.quantity,
//     category: item.category,
//   }));

//   useEffect(() => {
//     if (watchedCity && watchedZipCode) {
//       const breakdown = calculateDeliveryFee(
//         cartItemsWithMeta,
//         watchedCity,
//         watchedZipCode,
//         totalPrice,
//       );
//       setDeliveryBreakdown(breakdown);
//     }
//   }, [watchedCity, watchedZipCode, cartItems, totalPrice]);

//   const deliveryFee = deliveryBreakdown?.total || 0;
//   const promoDiscount =
//     promoPercent > 0 ? (totalPrice * promoPercent) / 100 : 0;
//   const grandTotal = Math.max(0, totalPrice + deliveryFee - promoDiscount);

//   /* ================================
//      APPLY PROMO
//   ================================ */
//   const handleApplyPromo = async () => {
//     setPromoError("");
//     if (!promoCode.trim()) {
//       setPromoError("Please enter promo code");
//       return;
//     }
//     try {
//       const res = await axios.post(PROMO_API, {
//         code: promoCode.trim().toUpperCase(),
//       });
//       setPromoPercent(res.data.discount);
//       setPromoApplied(res.data.code);
//       toast({
//         title: "Promo Applied 🎉",
//         description: `${res.data.discount}% discount applied`,
//       });
//       setPromoCode("");
//     } catch (err: any) {
//       setPromoApplied(null);
//       setPromoPercent(0);
//       setPromoError(err.response?.data?.error || "Invalid promo code");
//     }
//   };

//   /* ================================
//      SAVE NEW ADDRESS HELPER
//   ================================ */
//   const saveNewAddress = async (data: AddressForm) => {
//     try {
//       const token = localStorage.getItem("access");
//       if (!token) throw new Error("Authentication required");

//       await api.post(
//         "auth/addresses/",
//         {
//           label: data.addressLabel || "Home",
//           full_name: data.name,
//           phone: data.phone,
//           line1: data.street,
//           city: data.city,
//           state: data.state,
//           zip_code: data.zipCode,
//           country: "IN",
//           is_default: savedAddresses.length === 0, // Make default if it's the first one
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );
//       toast({ title: "Address saved to profile" });
//       // Refresh list so the new address appears (and could be selected next time)
//       fetchAddresses();
//     } catch (err: any) {
//       console.error("Save Address Error:", err);
//       toast({
//         title: "Failed to save address",
//         description: err.response?.data?.detail || "Please check your input.",
//         variant: "destructive",
//       });
//     }
//   };

//   /* ================================
//      SUBMIT ORDER
//   ================================ */
//   const onSubmit = async (data: AddressForm) => {
//     setIsProcessing(true);

//     try {
//       // 1. If "Save Address" checked, save it first (fire and forget or await)
//       if (selectedAddressId === "manual" && data.saveAddress) {
//         if (savedAddresses.length >= 3) {
//           toast({
//             title: "Cannot save address",
//             description: "You already have 3 addresses saved.",
//             variant: "destructive",
//           });
//         } else {
//           await saveNewAddress(data);
//         }
//       }

//       // 2. Process Payment & Order
//       await simulatePayment(grandTotal, (paymentId) => {
//         const shippingData = {
//           id:
//             selectedAddressId !== "manual"
//               ? selectedAddressId
//               : `temp_${Date.now()}`,
//           name: data.name,
//           phone: data.phone,
//           street: data.street,
//           city: data.city,
//           state: data.state,
//           zipCode: data.zipCode,
//           notes: data.notes,
//         };

//         const order = createOrder(
//           cartItems.map((item) => ({
//             id: item.id,
//             name: item.name,
//             price: item.price,
//             quantity: item.quantity,
//             image: item.image,
//           })),
//           grandTotal,
//           shippingData,
//           paymentId,
//           data.notes,
//         );

//         decreaseStock(
//           cartItems.map((item) => ({ id: item.id, quantity: item.quantity })),
//         );
//         clearCart();

//         toast({
//           title: "Order Successful",
//           description: `Order ID: ${order.id}`,
//         });

//         navigate(`/payment-success?orderId=${order.id}`);
//       });
//     } catch (error) {
//       console.error("Order Error", error);
//       toast({ title: "Order Failed", variant: "destructive" });
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   if (authLoading || loadingAddresses) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <Loader2 className="w-10 h-10 animate-spin" />
//         <p className="ml-2">Loading checkout...</p>
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     navigate("/login?return=/checkout");
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />

//       <main className="pt-[188px] md:pt-[200px] pb-16 px-4 max-w-6xl mx-auto">
//         <Link
//           to="/"
//           className="flex items-center mb-6 text-muted-foreground hover:text-foreground"
//         >
//           <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
//         </Link>

//         <h1 className="text-3xl font-bold mb-8">Checkout</h1>

//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="grid lg:grid-cols-3 gap-8">
//             {/* LEFT COLUMN */}
//             <div className="lg:col-span-2 space-y-6">
//               {/* ADDRESS SECTION */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex justify-between items-center">
//                     <span>
//                       <MapPin className="inline mr-2 h-5 w-5" /> Delivery
//                       Address
//                     </span>
//                     {savedAddresses.length < 3 && (
//                       <Button
//                         type="button"
//                         variant="outline"
//                         size="sm"
//                         onClick={() => navigate("/profile?return=/checkout")}
//                       >
//                         <Plus className="h-4 w-4 mr-1" /> Manage
//                       </Button>
//                     )}
//                   </CardTitle>
//                   <CardDescription>
//                     Select a saved address or enter a new one.
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   {/* Radio Group for Saved Addresses */}
//                   {savedAddresses.length > 0 && (
//                     <RadioGroup
//                       value={selectedAddressId}
//                       onValueChange={(val) => handleSelectAddress(val)}
//                       className="grid gap-4"
//                     >
//                       {savedAddresses.map((addr) => (
//                         <div
//                           key={addr.id}
//                           className={`flex items-start space-x-3 space-y-0 rounded-md border p-4 ${selectedAddressId === addr.id.toString() ? "border-primary bg-accent/50" : ""}`}
//                         >
//                           <RadioGroupItem
//                             value={addr.id.toString()}
//                             id={`addr-${addr.id}`}
//                             className="mt-1"
//                           />
//                           <Label
//                             htmlFor={`addr-${addr.id}`}
//                             className="font-normal cursor-pointer flex-1"
//                           >
//                             <div className="font-semibold flex items-center gap-2">
//                               {addr.label || "Saved Address"}
//                               {addr.is_default && (
//                                 <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
//                                   Default
//                                 </span>
//                               )}
//                             </div>
//                             <div className="text-sm text-muted-foreground mt-1">
//                               {addr.full_name}, {addr.phone}
//                             </div>
//                             <div className="text-sm text-muted-foreground">
//                               {addr.line1}
//                               {addr.line2 ? `, ${addr.line2}` : ""}, {addr.city}
//                               , {addr.zip_code}
//                             </div>
//                           </Label>
//                         </div>
//                       ))}

//                       {/* Manual Option */}
//                       <div className="flex items-center space-x-2 mt-2">
//                         <RadioGroupItem value="manual" id="addr-manual" />
//                         <Label htmlFor="addr-manual">
//                           Ship to a different address
//                         </Label>
//                       </div>
//                     </RadioGroup>
//                   )}

//                   {savedAddresses.length > 0 && <Separator />}

//                   {/* Manual Form Fields */}
//                   <div
//                     className={`grid grid-cols-1 md:grid-cols-2 gap-4 transition-opacity ${selectedAddressId !== "manual" ? "opacity-60" : "opacity-100"}`}
//                   >
//                     <div className="space-y-2">
//                       <Label>Full Name</Label>
//                       <Input
//                         {...register("name")}
//                         readOnly={selectedAddressId !== "manual"}
//                         placeholder="John Doe"
//                       />
//                       {errors.name && (
//                         <p className="text-red-500 text-xs">
//                           {errors.name.message}
//                         </p>
//                       )}
//                     </div>

//                     <div className="space-y-2">
//                       <Label>Phone Number</Label>
//                       <Input
//                         {...register("phone")}
//                         readOnly={selectedAddressId !== "manual"}
//                         placeholder="+91 98765 43210"
//                       />
//                       {errors.phone && (
//                         <p className="text-red-500 text-xs">
//                           {errors.phone.message}
//                         </p>
//                       )}
//                     </div>

//                     <div className="md:col-span-2 space-y-2">
//                       <Label>Street Address</Label>
//                       <Input
//                         {...register("street")}
//                         readOnly={selectedAddressId !== "manual"}
//                         placeholder="123 Main St, Apartment 4B"
//                       />
//                       {errors.street && (
//                         <p className="text-red-500 text-xs">
//                           {errors.street.message}
//                         </p>
//                       )}
//                     </div>

//                     <div className="space-y-2">
//                       <Label>City</Label>
//                       <Input
//                         {...register("city")}
//                         readOnly={selectedAddressId !== "manual"}
//                         placeholder="Mumbai"
//                       />
//                       {errors.city && (
//                         <p className="text-red-500 text-xs">
//                           {errors.city.message}
//                         </p>
//                       )}
//                     </div>

//                     <div className="space-y-2">
//                       <Label>State</Label>
//                       <Input
//                         {...register("state")}
//                         readOnly={selectedAddressId !== "manual"}
//                         placeholder="Maharashtra"
//                       />
//                       {errors.state && (
//                         <p className="text-red-500 text-xs">
//                           {errors.state.message}
//                         </p>
//                       )}
//                     </div>

//                     <div className="space-y-2">
//                       <Label>Zip Code</Label>
//                       <Input
//                         {...register("zipCode")}
//                         readOnly={selectedAddressId !== "manual"}
//                         placeholder="400001"
//                       />
//                       {errors.zipCode && (
//                         <p className="text-red-500 text-xs">
//                           {errors.zipCode.message}
//                         </p>
//                       )}
//                     </div>

//                     <div className="md:col-span-2 space-y-2">
//                       <Label>Delivery Notes (Optional)</Label>
//                       <Textarea
//                         {...register("notes")}
//                         placeholder="Leave at the front desk..."
//                       />
//                     </div>

//                     {/* SAVE ADDRESS OPTION */}
//                     {selectedAddressId === "manual" &&
//                       savedAddresses.length < 3 && (
//                         <div className="md:col-span-2 bg-muted/30 p-4 rounded-md border mt-2">
//                           <div className="flex items-center space-x-2">
//                             <Checkbox
//                               id="saveAddress"
//                               checked={watchedSaveAddress}
//                               onCheckedChange={(c) =>
//                                 setValue("saveAddress", c as boolean)
//                               }
//                             />
//                             <Label
//                               htmlFor="saveAddress"
//                               className="cursor-pointer font-medium"
//                             >
//                               Save this address for future orders
//                             </Label>
//                           </div>

//                           {watchedSaveAddress && (
//                             <div className="mt-3 animate-in fade-in slide-in-from-top-1">
//                               <Label className="text-xs">
//                                 Address Label (e.g., Home, Work)
//                               </Label>
//                               <Input
//                                 {...register("addressLabel")}
//                                 placeholder="Home"
//                                 className="mt-1 h-8"
//                               />
//                             </div>
//                           )}
//                         </div>
//                       )}
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* PROMO CODE SECTION */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>
//                     <Ticket className="inline mr-2 h-5 w-5" /> Apply Promo Code
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   {promoApplied ? (
//                     <div className="bg-green-50 border border-green-200 p-4 rounded-md flex justify-between items-center text-green-700">
//                       <span>
//                         <span className="font-bold">{promoApplied}</span>{" "}
//                         applied (-{promoPercent}%)
//                       </span>
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         className="text-green-700 hover:text-green-800 hover:bg-green-100"
//                         onClick={() => {
//                           setPromoApplied(null);
//                           setPromoPercent(0);
//                         }}
//                       >
//                         Remove
//                       </Button>
//                     </div>
//                   ) : (
//                     <div className="flex flex-col gap-2">
//                       <div className="flex gap-2">
//                         <Input
//                           value={promoCode}
//                           onChange={(e) =>
//                             setPromoCode(e.target.value.toUpperCase())
//                           }
//                           placeholder="ENTER CODE"
//                         />
//                         <Button type="button" onClick={handleApplyPromo}>
//                           Apply
//                         </Button>
//                       </div>
//                       {promoError && (
//                         <p className="text-red-500 text-sm">{promoError}</p>
//                       )}
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             </div>

//             {/* RIGHT COLUMN - ORDER SUMMARY */}
//             <div className="h-fit sticky top-24">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>
//                     <CreditCard className="inline mr-2 h-5 w-5" /> Order Summary
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="flex justify-between text-sm">
//                     <span className="text-muted-foreground">Subtotal</span>
//                     <span>₹{totalPrice.toFixed(2)}</span>
//                   </div>

//                   {promoDiscount > 0 && (
//                     <div className="flex justify-between text-sm text-green-600 font-medium">
//                       <span>Discount</span>
//                       <span>-₹{promoDiscount.toFixed(2)}</span>
//                     </div>
//                   )}

//                   <div className="flex justify-between text-sm">
//                     <span className="text-muted-foreground">Delivery</span>
//                     <span>
//                       {deliveryFee === 0
//                         ? "FREE"
//                         : `₹${deliveryFee.toFixed(2)}`}
//                     </span>
//                   </div>

//                   <Separator />

//                   <div className="flex justify-between font-bold text-lg">
//                     <span>Total</span>
//                     <span>₹{grandTotal.toFixed(2)}</span>
//                   </div>

//                   <Button
//                     type="submit"
//                     size="lg"
//                     disabled={isProcessing}
//                     className="w-full mt-4"
//                   >
//                     {isProcessing ? (
//                       <>
//                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                         Processing...
//                       </>
//                     ) : (
//                       `Pay ₹${grandTotal.toFixed(2)}`
//                     )}
//                   </Button>

//                   <div className="text-xs text-center text-muted-foreground mt-4">
//                     <Store className="inline w-3 h-3 mr-1" /> Secure checkout
//                     via Razorpay
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </form>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Checkout;

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  CreditCard,
  Loader2,
  Ticket,
  Plus,
  Store,
  Save,
} from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import api from "@/lib/axios"; // ✅ Using axios instance ONLY

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useOrders } from "@/contexts/OrderContext";
import { useToast } from "@/hooks/use-toast";

import { simulatePayment } from "@/lib/razorpay";
import {
  calculateDeliveryFee,
  CartItemWithMeta,
  DeliveryBreakdown,
} from "@/lib/deliveryUtils";
import { decreaseStock } from "@/lib/stockUtils";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* ================================
   TYPES & SCHEMAS
================================ */
type SavedAddress = {
  id: number;
  label?: string;
  full_name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  is_default: boolean;
};

const addressSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Phone number is required"),
  street: z.string().min(5, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(3, "Zip code is required"),
  notes: z.string().optional(),
  saveAddress: z.boolean().optional(),
  addressLabel: z.string().optional(),
});

type AddressForm = z.infer<typeof addressSchema>;

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { createOrder } = useOrders();
  const { toast } = useToast();

  // Address State
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("manual");

  // Promo State
  const [promoCode, setPromoCode] = useState("");
  const [promoPercent, setPromoPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState<string | null>(null);
  const [promoError, setPromoError] = useState("");

  // Processing State
  const [isProcessing, setIsProcessing] = useState(false);
  const [deliveryBreakdown, setDeliveryBreakdown] =
    useState<DeliveryBreakdown | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<AddressForm>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      notes: "",
      saveAddress: false,
      addressLabel: "Home",
    },
  });

  // Watch fields
  const watchedCity = useWatch({ control, name: "city" });
  const watchedZipCode = useWatch({ control, name: "zipCode" });
  const watchedSaveAddress = useWatch({ control, name: "saveAddress" });

  /* ================================
     FETCH ADDRESSES - ✅ FIXED
  ================================ */
  const fetchAddresses = async () => {
    try {
      console.log("🚀 Fetching addresses...");
      setLoadingAddresses(true);
      const res = await api.get("auth/addresses/"); // ✅ Relative URL + auto token
      console.log("✅ Addresses loaded:", res.data);
      const addresses: SavedAddress[] = res.data;
      setSavedAddresses(addresses);

      if (selectedAddressId === "manual" && addresses.length > 0) {
        const defaultAddr = addresses.find((a) => a.is_default) || addresses[0];
        handleSelectAddress(defaultAddr.id.toString(), addresses);
      }
    } catch (err: any) {
      console.error(
        "❌ Fetch error:",
        err.response?.status,
        err.response?.data,
      );
      toast({
        title: "Failed to load addresses",
        description: `${err.response?.status || "Network"}: ${err.response?.data?.detail || "Check login"}`,
        variant: "destructive",
      });
    } finally {
      setLoadingAddresses(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAddresses();
    }
  }, [isAuthenticated]);

  // Pre-fill user details if no address selected
  useEffect(() => {
    if (user && selectedAddressId === "manual") {
      setValue("name", user.name || "");
      setValue("phone", user.phone || "");
    }
  }, [user, selectedAddressId, setValue]);

  /* ================================
     ADDRESS SELECTION LOGIC
  ================================ */
  const handleSelectAddress = (id: string, list = savedAddresses) => {
    setSelectedAddressId(id);

    if (id === "manual") {
      setValue("street", "");
      setValue("city", "");
      setValue("state", "");
      setValue("zipCode", "");
      setValue("saveAddress", false);
      if (user) {
        setValue("name", user.name || "");
        setValue("phone", user.phone || "");
      }
      return;
    }

    const addr = list.find((a) => a.id.toString() === id);
    if (addr) {
      setValue("name", addr.full_name);
      setValue("phone", addr.phone);
      setValue("street", addr.line1 + (addr.line2 ? ", " + addr.line2 : ""));
      setValue("city", addr.city);
      setValue("state", addr.state);
      setValue("zipCode", addr.zip_code);
    }
  };

  /* ================================
     DELIVERY CALCULATION
  ================================ */
  const totalPrice = getTotalPrice();
  const cartItemsWithMeta: CartItemWithMeta[] = cartItems.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    category: item.category,
  }));

  useEffect(() => {
    if (watchedCity && watchedZipCode) {
      const breakdown = calculateDeliveryFee(
        cartItemsWithMeta,
        watchedCity,
        watchedZipCode,
        totalPrice,
      );
      setDeliveryBreakdown(breakdown);
    }
  }, [watchedCity, watchedZipCode, cartItems, totalPrice]);

  const deliveryFee = deliveryBreakdown?.total || 0;
  const promoDiscount =
    promoPercent > 0 ? (totalPrice * promoPercent) / 100 : 0;
  const grandTotal = Math.max(0, totalPrice + deliveryFee - promoDiscount);

  /* ================================
     APPLY PROMO - ✅ FIXED
  ================================ */
  const handleApplyPromo = async () => {
    setPromoError("");
    if (!promoCode.trim()) {
      setPromoError("Please enter promo code");
      return;
    }
    try {
      const res = await api.post("auth/promocode/", {
        // ✅ Using api instance
        code: promoCode.trim().toUpperCase(),
      });
      setPromoPercent(res.data.discount);
      setPromoApplied(res.data.code);
      toast({
        title: "Promo Applied 🎉",
        description: `${res.data.discount}% discount applied`,
      });
      setPromoCode("");
    } catch (err: any) {
      setPromoApplied(null);
      setPromoPercent(0);
      setPromoError(err.response?.data?.error || "Invalid promo code");
    }
  };

  /* ================================
     SAVE NEW ADDRESS - ✅ FIXED
  ================================ */
  const saveNewAddress = async (data: AddressForm) => {
    try {
      console.log("💾 Saving address..."); // DEBUG
      console.log("📍 Data:", data); // DEBUG

      const token = localStorage.getItem("access");
      console.log("🔑 Token exists:", !!token); // DEBUG

      const response = await api.post("auth/addresses/", {
        label: data.addressLabel || "Home",
        full_name: data.name,
        phone: data.phone,
        line1: data.street.includes(",")
          ? data.street.split(",")[0].trim()
          : data.street,
        line2: data.street.includes(",")
          ? data.street.split(",").slice(1).join(",").trim()
          : "",
        city: data.city,
        state: data.state,
        zip_code: data.zipCode,
        country: "IN",
        is_default: savedAddresses.length === 0, // First address = default
      });

      console.log("✅ SAVE RESPONSE:", response.data); // DEBUG
      toast({ title: "✅ Address saved successfully!" });
      await fetchAddresses(); // Refresh list
    } catch (err: any) {
      console.error("❌ SAVE ERROR FULL:", err.response?.data || err.message);
      console.error("❌ STATUS:", err.response?.status);
      console.error("❌ HEADERS:", err.response?.headers);

      toast({
        title: "Failed to save address",
        description:
          err.response?.data?.detail ||
          err.response?.data?.non_field_errors?.[0] ||
          "Please check your details and try again.",
        variant: "destructive",
      });
    }
  };

  /* ================================
     SUBMIT ORDER
  ================================ */
  const onSubmit = async (data: AddressForm) => {
    setIsProcessing(true);

    try {
      // 1. Save address if requested
      if (selectedAddressId === "manual" && data.saveAddress) {
        if (savedAddresses.length >= 3) {
          toast({
            title: "Cannot save address",
            description: "You already have 3 addresses saved.",
            variant: "destructive",
          });
        } else {
          await saveNewAddress(data);
        }
      }

      // 2. Process payment
      await simulatePayment(grandTotal, (paymentId) => {
        const shippingData = {
          id:
            selectedAddressId !== "manual"
              ? selectedAddressId
              : `temp_${Date.now()}`,
          name: data.name,
          phone: data.phone,
          street: data.street,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode,
          notes: data.notes,
        };

        const order = createOrder(
          cartItems.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          grandTotal,
          shippingData,
          paymentId,
          data.notes,
        );

        decreaseStock(
          cartItems.map((item) => ({ id: item.id, quantity: item.quantity })),
        );
        clearCart();

        toast({
          title: "Order Successful",
          description: `Order ID: ${order.id}`,
        });

        navigate(`/payment-success?orderId=${order.id}`);
      });
    } catch (error) {
      console.error("Order Error", error);
      toast({ title: "Order Failed", variant: "destructive" });
    } finally {
      setIsProcessing(false);
    }
  };

  if (authLoading || loadingAddresses) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-10 h-10 animate-spin" />
        <p className="ml-2">Loading checkout...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    navigate("/login?return=/checkout");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-[188px] md:pt-[200px] pb-16 px-4 max-w-6xl mx-auto">
        <Link
          to="/"
          className="flex items-center mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
        </Link>

        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-2 space-y-6">
              {/* ADDRESS SECTION */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>
                      <MapPin className="inline mr-2 h-5 w-5" /> Delivery
                      Address
                    </span>
                    {savedAddresses.length < 3 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => navigate("/profile?return=/checkout")}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Manage
                      </Button>
                    )}
                  </CardTitle>
                  <CardDescription>
                    Select a saved address or enter a new one.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {savedAddresses.length > 0 && (
                    <RadioGroup
                      value={selectedAddressId}
                      onValueChange={(val) => handleSelectAddress(val)}
                      className="grid gap-4"
                    >
                      {savedAddresses.map((addr) => (
                        <div
                          key={addr.id}
                          className={`
            group flex items-start gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer hover:shadow-sm
            ${
              selectedAddressId === addr.id.toString()
                ? "border-primary bg-primary/5 shadow-md ring-2 ring-primary/20"
                : "border-border hover:border-primary/50 hover:bg-accent/50"
            }
          `}
                        >
                          <RadioGroupItem
                            value={addr.id.toString()}
                            id={`addr-${addr.id}`}
                            className="mt-2 border-2 border-gray-300 data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                          />

                          <Label
                            htmlFor={`addr-${addr.id}`}
                            className="flex-1 cursor-pointer leading-relaxed"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold text-base text-foreground">
                                {addr.label || "Saved Address"}
                              </span>
                              {addr.is_default && (
                                <span className="text-xs font-bold uppercase tracking-wider bg-primary text-primary-foreground px-2.5 py-0.5 rounded-full">
                                  Default
                                </span>
                              )}
                            </div>

                            <div className="text-sm font-medium text-foreground mb-1">
                              {addr.full_name}, {addr.phone}
                            </div>

                            <div className="text-sm leading-relaxed text-foreground/90">
                              <span>{addr.line1}</span>
                              {addr.line2 && <span>, {addr.line2}</span>}
                              <br />
                              <span>{addr.city}</span>
                              {addr.state && (
                                <>
                                  <span>, {addr.state}</span>
                                </>
                              )}
                              <span> {addr.zip_code}</span>
                            </div>
                          </Label>
                        </div>
                      ))}

                      <div className="flex items-center gap-3 p-4 border-2 rounded-xl hover:border-primary/50 hover:bg-accent/50 transition-all cursor-pointer">
                        <RadioGroupItem
                          value="manual"
                          id="addr-manual"
                          className="mt-2 border-2 border-gray-300 data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                        />
                        <Label
                          htmlFor="addr-manual"
                          className="flex-1 cursor-pointer font-medium text-foreground"
                        >
                          <div className="flex items-center gap-2">
                            <Plus className="h-4 w-4 text-muted-foreground" />
                            Ship to a different address
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  )}

                  {/* <div
                    className={`
      grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-300
      ${
        selectedAddressId !== "manual" 
          ? "opacity-60 blur-sm pointer-events-none"
          : "opacity-100 blur-none"
      }
    `}
                  > */}
                  {selectedAddressId === "manual" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-muted/20 rounded-2xl border-2 border-dashed border-border">
                      <div className="md:col-span-2 space-y-2">
                        <Label className="text-sm font-medium">
                          Full Name *
                        </Label>
                        <Input
                          {...register("name")}
                          readOnly={selectedAddressId !== "manual"}
                          placeholder="John Doe"
                          className="h-11 text-base"
                        />
                        {errors.name && (
                          <p className="text-destructive text-xs mt-1">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          Phone Number *
                        </Label>
                        <Input
                          {...register("phone")}
                          readOnly={selectedAddressId !== "manual"}
                          placeholder="+91 98765 43210"
                          className="h-11 text-base"
                        />
                        {errors.phone && (
                          <p className="text-destructive text-xs mt-1">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label className="text-sm font-medium">
                          Street Address *
                        </Label>
                        <Input
                          {...register("street")}
                          readOnly={selectedAddressId !== "manual"}
                          placeholder="123 Main St, Apt 4B"
                          className="h-11 text-base"
                        />
                        {errors.street && (
                          <p className="text-destructive text-xs mt-1">
                            {errors.street.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">City *</Label>
                        <Input
                          {...register("city")}
                          readOnly={selectedAddressId !== "manual"}
                          placeholder="Mumbai"
                          className="h-11 text-base"
                        />
                        {errors.city && (
                          <p className="text-destructive text-xs mt-1">
                            {errors.city.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">State *</Label>
                        <Input
                          {...register("state")}
                          readOnly={selectedAddressId !== "manual"}
                          placeholder="Maharashtra"
                          className="h-11 text-base"
                        />
                        {errors.state && (
                          <p className="text-destructive text-xs mt-1">
                            {errors.state.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          Zip Code *
                        </Label>
                        <Input
                          {...register("zipCode")}
                          readOnly={selectedAddressId !== "manual"}
                          placeholder="400001"
                          className="h-11 text-base"
                        />
                        {errors.zipCode && (
                          <p className="text-destructive text-xs mt-1">
                            {errors.zipCode.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Country</Label>
                        <Input
                          value="India"
                          readOnly
                          className="h-11 bg-muted/50 text-base"
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label className="text-sm font-medium">
                          Delivery Instructions (Optional)
                        </Label>
                        <Textarea
                          {...register("notes")}
                          placeholder="e.g. Leave at security gate, Call before delivery"
                          rows={2}
                          className="text-base resize-none"
                        />
                      </div>

                      {selectedAddressId === "manual" &&
                        savedAddresses.length < 3 && (
                          <div className="md:col-span-2 bg-accent/30 p-4 rounded-xl border">
                            <div className="flex items-start gap-3">
                              <Checkbox
                                id="saveAddress"
                                checked={watchedSaveAddress}
                                onCheckedChange={(c) =>
                                  setValue("saveAddress", c as boolean)
                                }
                              />
                              <div>
                                <Label
                                  htmlFor="saveAddress"
                                  className="font-medium text-foreground cursor-pointer"
                                >
                                  Save this address for future orders
                                </Label>
                                {watchedSaveAddress && (
                                  <div className="mt-2 ml-7">
                                    <Label className="text-xs text-muted-foreground block mb-1">
                                      Label
                                    </Label>
                                    <Input
                                      {...register("addressLabel")}
                                      placeholder="Home"
                                      className="h-9 w-32 text-sm"
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* PROMO CODE */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    <Ticket className="inline mr-2 h-5 w-5" /> Apply Promo Code
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {promoApplied ? (
                    <div className="bg-green-50 border border-green-200 p-4 rounded-md flex justify-between items-center text-green-700">
                      <span>
                        <span className="font-bold">{promoApplied}</span>{" "}
                        applied (-{promoPercent}%)
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-green-700 hover:text-green-800 hover:bg-green-100"
                        onClick={() => {
                          setPromoApplied(null);
                          setPromoPercent(0);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <Input
                          value={promoCode}
                          onChange={(e) =>
                            setPromoCode(e.target.value.toUpperCase())
                          }
                          placeholder="ENTER CODE"
                        />
                        <Button type="button" onClick={handleApplyPromo}>
                          Apply
                        </Button>
                      </div>
                      {promoError && (
                        <p className="text-red-500 text-sm">{promoError}</p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* ORDER SUMMARY */}
            <div className="h-fit sticky top-24">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <CreditCard className="inline mr-2 h-5 w-5" /> Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{totalPrice.toFixed(2)}</span>
                  </div>

                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-sm text-green-600 font-medium">
                      <span>Discount</span>
                      <span>-₹{promoDiscount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span>
                      {deliveryFee === 0
                        ? "FREE"
                        : `₹${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{grandTotal.toFixed(2)}</span>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isProcessing}
                    className="w-full mt-4"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Pay ₹${grandTotal.toFixed(2)}`
                    )}
                  </Button>

                  <div className="text-xs text-center text-muted-foreground mt-4">
                    <Store className="inline w-3 h-3 mr-1" /> Secure checkout
                    via Razorpay
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
