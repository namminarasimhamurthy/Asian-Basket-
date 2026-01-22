// import { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { ArrowLeft, ShoppingBag, MapPin, CreditCard, Loader2, Tag, Ticket, AlertTriangle, Package } from 'lucide-react';
// import { useForm, useWatch } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { useCart } from '@/contexts/CartContext';
// import { useAuth } from '@/contexts/AuthContext';
// import { useOrders } from '@/contexts/OrderContext';
// import { useVouchers } from '@/contexts/VoucherContext';
// import { useToast } from '@/hooks/use-toast';
// import { simulatePayment } from '@/lib/razorpay';
// import { calculateDeliveryFee, CartItemWithMeta, DeliveryBreakdown } from '@/lib/deliveryUtils';
// import { decreaseStock } from '@/lib/stockUtils';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import FrozenItemAlert from '@/components/FrozenItemAlert';


// const addressSchema = z.object({
//     name: z.string().min(2, 'Name is required'),
//     phone: z.string().min(10, 'Valid phone number is required'),
//     street: z.string().min(5, 'Street address is required'),
//     city: z.string().min(2, 'City is required'),
//     state: z.string().min(2, 'County is required'),
//     zipCode: z.string().min(3, 'Eircode is required'),
//     notes: z.string().optional(),
// });

// type AddressForm = z.infer<typeof addressSchema>;

// const Checkout = () => {
//     const navigate = useNavigate();
//     const { cartItems, getTotalPrice, clearCart } = useCart();
//     const { user, isAuthenticated } = useAuth();
//     const { createOrder } = useOrders();
//     const { applyVoucher, appliedVoucher, clearAppliedVoucher, markVoucherAsUsed, getValidVouchers, generateVoucher } = useVouchers();
//     const { toast } = useToast();
//     const [isProcessing, setIsProcessing] = useState(false);
//     const [paymentProgress, setPaymentProgress] = useState('');
//     const [voucherCode, setVoucherCode] = useState('');
//     const [voucherError, setVoucherError] = useState('');
//     const [showFrozenAlert, setShowFrozenAlert] = useState(false);
//     const [frozenAlertShown, setFrozenAlertShown] = useState(false);
//     const [deliveryBreakdown, setDeliveryBreakdown] = useState<DeliveryBreakdown | null>(null);

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         control,
//     } = useForm<AddressForm>({
//         resolver: zodResolver(addressSchema),
//         defaultValues: {
//             name: user?.name || '',
//             phone: user?.phone || '',
//             city: 'Dublin',
//             state: 'Dublin',
//         },
//     });

//     // Watch city and zipCode for delivery fee calculation
//     const watchedCity = useWatch({ control, name: 'city' });
//     const watchedZipCode = useWatch({ control, name: 'zipCode' });

//     const totalPrice = getTotalPrice();
//     const validVouchers = getValidVouchers();

//     // Convert cart items to include category metadata
//     const cartItemsWithMeta: CartItemWithMeta[] = cartItems.map(item => ({
//         id: item.id,
//         name: item.name,
//         price: item.price,
//         quantity: item.quantity,
//         category: item.category,
//     }));

//     // Calculate delivery fee whenever city or cart changes
//     useEffect(() => {
//         if (watchedCity) {
//             const breakdown = calculateDeliveryFee(
//                 cartItemsWithMeta,
//                 watchedCity,
//                 watchedZipCode,
//                 totalPrice
//             );
//             setDeliveryBreakdown(breakdown);

//             // Show frozen alert for outside Dublin orders with frozen items
//             if (breakdown.isOutsideDublin && breakdown.hasFrozenItems && !frozenAlertShown) {
//                 setShowFrozenAlert(true);
//             }
//         }
//     }, [watchedCity, watchedZipCode, cartItems, totalPrice, frozenAlertShown]);

//     const deliveryFee = deliveryBreakdown?.total || 0;
//     const voucherDiscount = appliedVoucher?.amount || 0;
//     const grandTotal = Math.max(0, totalPrice + deliveryFee - voucherDiscount);

//     // Handle voucher application
//     const handleApplyVoucher = () => {
//         setVoucherError('');
//         if (!voucherCode.trim()) {
//             setVoucherError('Please enter a voucher code');
//             return;
//         }

//         const result = applyVoucher(voucherCode.trim().toUpperCase());
//         if (!result.success) {
//             setVoucherError(result.error || 'Invalid voucher');
//         } else {
//             toast({
//                 title: 'Voucher applied!',
//                 description: `€${result.discount.toFixed(2)} discount applied to your order.`,
//             });
//             setVoucherCode('');
//         }
//     };

//     // Handle frozen alert
//     const handleFrozenProceed = () => {
//         setShowFrozenAlert(false);
//         setFrozenAlertShown(true);
//     };

//     const handleFrozenModify = () => {
//         setShowFrozenAlert(false);
//         navigate('/');
//     };

//     // Redirect if cart is empty
//     if (cartItems.length === 0) {
//         return (
//             <div className="min-h-screen bg-background">
//                 <Header />
//                 <main className="pt-[188px] md:pt-[200px] pb-16 px-4">
//                     <div className="max-w-2xl mx-auto text-center py-12">
//                         <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
//                         <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
//                         <p className="text-muted-foreground mb-6">
//                             Add some delicious items to your cart before checkout.
//                         </p>
//                         <Link to="/#menu">
//                             <Button className="bg-primary hover:bg-primary/90">
//                                 Browse Menu
//                             </Button>
//                         </Link>
//                     </div>
//                 </main>
//                 <Footer />
//             </div>
//         );
//     }

//     // Redirect if not authenticated
//     if (!isAuthenticated) {
//         return (
//             <div className="min-h-screen bg-background">
//                 <Header />
//                 <main className="pt-[188px] md:pt-[200px] pb-16 px-4">
//                     <div className="max-w-2xl mx-auto text-center py-12">
//                         <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
//                         <h1 className="text-2xl font-bold mb-2">Please login to continue</h1>
//                         <p className="text-muted-foreground mb-6">
//                             You need to be logged in to place an order.
//                         </p>
//                         <Link to="/login">
//                             <Button className="bg-primary hover:bg-primary/90">
//                                 Login to Continue
//                             </Button>
//                         </Link>
//                     </div>
//                 </main>
//                 <Footer />
//             </div>
//         );
//     }

//     const onSubmit = async (data: AddressForm) => {
//         setIsProcessing(true);

//         try {
//             // Simulate payment process
//             await simulatePayment(
//                 grandTotal,
//                 (paymentId) => {
//                     // Create order
//                     const order = createOrder(
//                         cartItems.map(item => ({
//                             id: item.id,
//                             name: item.name,
//                             price: item.price,
//                             quantity: item.quantity,
//                             image: item.image,
//                         })),
//                         grandTotal,
//                         {
//                             id: `addr_${Date.now()}`,
//                             name: data.name,
//                             phone: data.phone,
//                             street: data.street,
//                             city: data.city,
//                             state: data.state,
//                             zipCode: data.zipCode,
//                         },
//                         paymentId,
//                         data.notes
//                     );

//                     // Mark voucher as used if applied
//                     if (appliedVoucher) {
//                         markVoucherAsUsed(appliedVoucher.code);
//                     }

//                     // Generate new voucher based on order total
//                     const newVoucher = generateVoucher(grandTotal, order.id);

//                     // Decrease stock for ordered items
//                     decreaseStock(cartItems.map(item => ({ id: item.id, quantity: item.quantity })));

//                     // Clear cart
//                     clearCart();

//                     // Show success message
//                     toast({
//                         title: 'Order placed successfully!',
//                         description: `Your order ${order.id} has been confirmed.`,
//                     });

//                     // Navigate to success page with voucher info
//                     const voucherParam = newVoucher ? `&voucher=${newVoucher.code}&voucherAmount=${newVoucher.amount}` : '';
//                     navigate(`/payment-success?orderId=${order.id}${voucherParam}`);
//                 },
//                 (message) => setPaymentProgress(message)
//             );
//         } catch (error) {
//             toast({
//                 title: 'Payment failed',
//                 description: 'Something went wrong. Please try again.',
//                 variant: 'destructive',
//             });
//         } finally {
//             setIsProcessing(false);
//             setPaymentProgress('');
//         }
//     };

//     return (
//         <div className="min-h-screen bg-background">
//             <Header />

//             <main className="pt-[188px] md:pt-[200px] pb-16 px-4">
//                 <div className="max-w-6xl mx-auto">
//                     {/* Back Button */}
//                     <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
//                         <ArrowLeft className="h-4 w-4 mr-2" />
//                         Back to Home
//                     </Link>

//                     <h1 className="text-3xl font-bold mb-8">Checkout</h1>

//                     <form onSubmit={handleSubmit(onSubmit)}>
//                         <div className="grid lg:grid-cols-3 gap-8">
//                             {/* Left Column - Forms */}
//                             <div className="lg:col-span-2 space-y-6">
//                                 {/* Delivery Address */}
//                                 <Card className="shadow-lg">
//                                     <CardHeader>
//                                         <CardTitle className="flex items-center gap-2">
//                                             <MapPin className="h-5 w-5" />
//                                             Delivery Address
//                                         </CardTitle>
//                                     </CardHeader>
//                                     <CardContent className="space-y-4">
//                                         <div className="grid sm:grid-cols-2 gap-4">
//                                             <div className="space-y-2">
//                                                 <Label htmlFor="name">Full Name</Label>
//                                                 <Input id="name" {...register('name')} />
//                                                 {errors.name && (
//                                                     <p className="text-sm text-destructive">{errors.name.message}</p>
//                                                 )}
//                                             </div>
//                                             <div className="space-y-2">
//                                                 <Label htmlFor="phone">Phone Number</Label>
//                                                 <Input id="phone" {...register('phone')} />
//                                                 {errors.phone && (
//                                                     <p className="text-sm text-destructive">{errors.phone.message}</p>
//                                                 )}
//                                             </div>
//                                         </div>

//                                         <div className="space-y-2">
//                                             <Label htmlFor="street">Street Address</Label>
//                                             <Input id="street" placeholder="123 Main St, Apt 4" {...register('street')} />
//                                             {errors.street && (
//                                                 <p className="text-sm text-destructive">{errors.street.message}</p>
//                                             )}
//                                         </div>

//                                         <div className="grid sm:grid-cols-3 gap-4">
//                                             <div className="space-y-2">
//                                                 <Label htmlFor="city">City</Label>
//                                                 <Input id="city" {...register('city')} />
//                                                 {errors.city && (
//                                                     <p className="text-sm text-destructive">{errors.city.message}</p>
//                                                 )}
//                                             </div>
//                                             <div className="space-y-2">
//                                                 <Label htmlFor="state">County</Label>
//                                                 <Input id="state" {...register('state')} />
//                                                 {errors.state && (
//                                                     <p className="text-sm text-destructive">{errors.state.message}</p>
//                                                 )}
//                                             </div>
//                                             <div className="space-y-2">
//                                                 <Label htmlFor="zipCode">Eircode</Label>
//                                                 <Input id="zipCode" placeholder="D01 AB12" {...register('zipCode')} />
//                                                 {errors.zipCode && (
//                                                     <p className="text-sm text-destructive">{errors.zipCode.message}</p>
//                                                 )}
//                                             </div>
//                                         </div>

//                                         <div className="space-y-2">
//                                             <Label htmlFor="notes">Order Notes (Optional)</Label>
//                                             <Textarea
//                                                 id="notes"
//                                                 placeholder="Special instructions for your order..."
//                                                 {...register('notes')}
//                                             />
//                                         </div>
//                                     </CardContent>
//                                 </Card>

//                                 {/* Voucher Section */}
//                                 <Card className="shadow-lg">
//                                     <CardHeader>
//                                         <CardTitle className="flex items-center gap-2">
//                                             <Ticket className="h-5 w-5" />
//                                             Apply Voucher
//                                         </CardTitle>
//                                     </CardHeader>
//                                     <CardContent className="space-y-4">
//                                         {appliedVoucher ? (
//                                             <div className="bg-green-50 border border-green-200 rounded-lg p-4">
//                                                 <div className="flex items-center justify-between">
//                                                     <div className="flex items-center gap-2">
//                                                         <Tag className="h-5 w-5 text-green-600" />
//                                                         <span className="font-medium text-green-800">
//                                                             Voucher applied: {appliedVoucher.code}
//                                                         </span>
//                                                     </div>
//                                                     <div className="flex items-center gap-2">
//                                                         <span className="font-bold text-green-600">-€{appliedVoucher.amount.toFixed(2)}</span>
//                                                         <Button
//                                                             type="button"
//                                                             variant="ghost"
//                                                             size="sm"
//                                                             onClick={clearAppliedVoucher}
//                                                             className="text-red-500 hover:text-red-700"
//                                                         >
//                                                             Remove
//                                                         </Button>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         ) : (
//                                             <>
//                                                 <div className="flex gap-2">
//                                                     <Input
//                                                         placeholder="Enter voucher code"
//                                                         value={voucherCode}
//                                                         onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
//                                                         className="uppercase"
//                                                     />
//                                                     <Button type="button" onClick={handleApplyVoucher} variant="outline">
//                                                         Apply
//                                                     </Button>
//                                                 </div>
//                                                 {voucherError && (
//                                                     <p className="text-sm text-destructive">{voucherError}</p>
//                                                 )}
//                                                 {validVouchers.length > 0 && (
//                                                     <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
//                                                         <p className="text-sm text-amber-800 font-medium mb-2">
//                                                             You have {validVouchers.length} voucher(s) available:
//                                                         </p>
//                                                         <div className="space-y-1">
//                                                             {validVouchers.map(v => (
//                                                                 <div key={v.code} className="flex items-center justify-between text-sm">
//                                                                     <span className="font-mono text-amber-700">{v.code}</span>
//                                                                     <span className="text-amber-600">€{v.amount} off</span>
//                                                                 </div>
//                                                             ))}
//                                                         </div>
//                                                     </div>
//                                                 )}
//                                             </>
//                                         )}
//                                     </CardContent>
//                                 </Card>

//                                 {/* Order Items */}
//                                 <Card className="shadow-lg">
//                                     <CardHeader>
//                                         <CardTitle className="flex items-center gap-2">
//                                             <ShoppingBag className="h-5 w-5" />
//                                             Order Items ({cartItems.length})
//                                         </CardTitle>
//                                     </CardHeader>
//                                     <CardContent>
//                                         <div className="space-y-4">
//                                             {cartItems.map((item) => (
//                                                 <div key={item.id} className="flex items-center gap-4 pb-4 border-b last:border-0 last:pb-0">
//                                                     <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
//                                                         <img
//                                                             src={item.image}
//                                                             alt={item.name}
//                                                             className="w-full h-full object-cover"
//                                                         />
//                                                     </div>
//                                                     <div className="flex-1">
//                                                         <h4 className="font-semibold">{item.name}</h4>
//                                                         <p className="text-sm text-muted-foreground">
//                                                             Qty: {item.quantity} × €{item.price.toFixed(2)}
//                                                         </p>
//                                                     </div>
//                                                     <div className="text-right">
//                                                         <p className="font-bold text-primary">
//                                                             €{(item.price * item.quantity).toFixed(2)}
//                                                         </p>
//                                                     </div>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </CardContent>
//                                 </Card>
//                             </div>

//                             {/* Right Column - Order Summary */}
//                             <div>
//                                 <Card className="shadow-lg sticky top-24">
//                                     <CardHeader>
//                                         <CardTitle className="flex items-center gap-2">
//                                             <CreditCard className="h-5 w-5" />
//                                             Order Summary
//                                         </CardTitle>
//                                     </CardHeader>
//                                     <CardContent className="space-y-4">
//                                         <div className="space-y-2">
//                                             <div className="flex justify-between text-sm">
//                                                 <span className="text-muted-foreground">Subtotal</span>
//                                                 <span>€{totalPrice.toFixed(2)}</span>
//                                             </div>

//                                             {/* Delivery Fee Breakdown */}
//                                             {deliveryBreakdown && (
//                                                 <>
//                                                     <div className="flex justify-between text-sm">
//                                                         <span className="text-muted-foreground">Delivery Fee</span>
//                                                         <span>{deliveryFee === 0 ? 'FREE' : `€${deliveryFee.toFixed(2)}`}</span>
//                                                     </div>

//                                                     {/* Show delivery fee breakdown if there are charges */}
//                                                     {deliveryBreakdown.messages.length > 0 && (
//                                                         <div className="bg-muted/50 rounded-lg p-3 space-y-1">
//                                                             {deliveryBreakdown.messages.map((msg, idx) => (
//                                                                 <p key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
//                                                                     <Package className="h-3 w-3 mt-0.5 flex-shrink-0" />
//                                                                     {msg}
//                                                                 </p>
//                                                             ))}
//                                                             {deliveryBreakdown.totalWeight > 0 && (
//                                                                 <p className="text-xs text-muted-foreground mt-1">
//                                                                     📦 Total weight: {deliveryBreakdown.totalWeight.toFixed(1)}kg
//                                                                 </p>
//                                                             )}
//                                                         </div>
//                                                     )}
//                                                 </>
//                                             )}

//                                             {/* Voucher Discount */}
//                                             {appliedVoucher && (
//                                                 <div className="flex justify-between text-sm text-green-600">
//                                                     <span>Voucher Discount</span>
//                                                     <span>-€{voucherDiscount.toFixed(2)}</span>
//                                                 </div>
//                                             )}
//                                         </div>

//                                         <div className="border-t pt-4">
//                                             <div className="flex justify-between">
//                                                 <span className="font-bold text-lg">Total</span>
//                                                 <span className="font-bold text-lg text-primary">
//                                                     €{grandTotal.toFixed(2)}
//                                                 </span>
//                                             </div>
//                                         </div>

//                                         {/* Frozen Items Warning */}
//                                         {deliveryBreakdown?.hasFrozenItems && deliveryBreakdown?.isOutsideDublin && (
//                                             <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
//                                                 <div className="flex items-start gap-2">
//                                                     <AlertTriangle className="h-4 w-4 text-blue-600 mt-0.5" />
//                                                     <p className="text-xs text-blue-700">
//                                                         Frozen items will be delivered the next day for outside Dublin orders.
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                         )}

//                                         {/* Free Delivery Hint */}
//                                         {!deliveryBreakdown?.isOutsideDublin && totalPrice < 39.99 && (
//                                             <p className="text-xs text-muted-foreground bg-muted p-3 rounded-lg">
//                                                 💡 Add €{(39.99 - totalPrice).toFixed(2)} more for FREE delivery!
//                                             </p>
//                                         )}

//                                         {/* Voucher Hint */}
//                                         {grandTotal >= 50 && !appliedVoucher && (
//                                             <p className="text-xs text-muted-foreground bg-green-50 p-3 rounded-lg border border-green-200">
//                                                 🎉 You'll earn a €{grandTotal >= 100 ? '10' : '5'} voucher with this order!
//                                             </p>
//                                         )}

//                                         <Button
//                                             type="submit"
//                                             className="w-full h-14 text-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold"
//                                             disabled={isProcessing}
//                                         >
//                                             {isProcessing ? (
//                                                 <>
//                                                     <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//                                                     {paymentProgress || 'Processing...'}
//                                                 </>
//                                             ) : (
//                                                 <>
//                                                     <CreditCard className="mr-2 h-5 w-5" />
//                                                     Pay €{grandTotal.toFixed(2)}
//                                                 </>
//                                             )}
//                                         </Button>

//                                         <p className="text-xs text-center text-muted-foreground">
//                                             🔒 Your payment is secure and encrypted
//                                         </p>
//                                     </CardContent>
//                                 </Card>
//                             </div>
//                         </div>
//                     </form>
//                 </div>
//             </main>

//             <Footer />

//             {/* Frozen Item Alert Dialog */}
//             <FrozenItemAlert
//                 isOpen={showFrozenAlert}
//                 onProceed={handleFrozenProceed}
//                 onModify={handleFrozenModify}
//             />
//         </div>
//     );
// };

// export default Checkout;


// import { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import {
//   ArrowLeft,
//   ShoppingBag,
//   MapPin,
//   CreditCard,
//   Loader2,
//   Tag,
//   Ticket,
//   AlertTriangle,
//   Package,
// } from 'lucide-react';
// import { useForm, useWatch } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import axios from 'axios';

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';

// import { useCart } from '@/contexts/CartContext';
// import { useAuth } from '@/contexts/AuthContext';
// import { useOrders } from '@/contexts/OrderContext';
// import { useToast } from '@/hooks/use-toast';

// import { simulatePayment } from '@/lib/razorpay';
// import {
//   calculateDeliveryFee,
//   CartItemWithMeta,
//   DeliveryBreakdown,
// } from '@/lib/deliveryUtils';
// import { decreaseStock } from '@/lib/stockUtils';

// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import FrozenItemAlert from '@/components/FrozenItemAlert';

// /* ================================
//    PROMO API
// ================================ */
// const PROMO_API = 'http://127.0.0.1:8000/api/auth/promocode/';

// /* ================================
//    ADDRESS SCHEMA
// ================================ */
// const addressSchema = z.object({
//   name: z.string().min(2),
//   phone: z.string().min(10),
//   street: z.string().min(5),
//   city: z.string().min(2),
//   state: z.string().min(2),
//   zipCode: z.string().min(3),
//   notes: z.string().optional(),
// });

// type AddressForm = z.infer<typeof addressSchema>;

// const Checkout = () => {
//   const navigate = useNavigate();
//   const { cartItems, getTotalPrice, clearCart } = useCart();
//   const { user, isAuthenticated, isLoading } = useAuth();
//   const { createOrder } = useOrders();
//   const { toast } = useToast();

//   /* ================================
//      PROMO STATE
//   ================================ */
//   const [promoCode, setPromoCode] = useState('');
//   const [promoPercent, setPromoPercent] = useState<number>(0);
//   const [promoApplied, setPromoApplied] = useState<string | null>(null);
//   const [promoError, setPromoError] = useState('');

//   const [isProcessing, setIsProcessing] = useState(false);
//   const [paymentProgress, setPaymentProgress] = useState('');
//   const [deliveryBreakdown, setDeliveryBreakdown] =
//     useState<DeliveryBreakdown | null>(null);

//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm<AddressForm>({
//     resolver: zodResolver(addressSchema),
//     defaultValues: {
//       name: user?.name || '',
//       phone: user?.phone || '',
//       city: 'Dublin',
//       state: 'Dublin',
//     },
//   });

//   const watchedCity = useWatch({ control, name: 'city' });
//   const watchedZipCode = useWatch({ control, name: 'zipCode' });

//   const totalPrice = getTotalPrice();

//   const cartItemsWithMeta: CartItemWithMeta[] = cartItems.map((item) => ({
//     id: item.id,
//     name: item.name,
//     price: item.price,
//     quantity: item.quantity,
//     category: item.category,
//   }));

//   useEffect(() => {
//     if (watchedCity) {
//       const breakdown = calculateDeliveryFee(
//         cartItemsWithMeta,
//         watchedCity,
//         watchedZipCode,
//         totalPrice
//       );
//       setDeliveryBreakdown(breakdown);
//     }
//   }, [watchedCity, watchedZipCode, cartItems, totalPrice]);

//   const deliveryFee = deliveryBreakdown?.total || 0;

//   const promoDiscount =
//     promoPercent > 0 ? (totalPrice * promoPercent) / 100 : 0;

//   const grandTotal = Math.max(
//     0,
//     totalPrice + deliveryFee - promoDiscount
//   );

//   /* ================================
//      APPLY PROMO CODE
//   ================================ */
//   const handleApplyPromo = async () => {
//     setPromoError('');

//     if (!promoCode.trim()) {
//       setPromoError('Please enter promo code');
//       return;
//     }

//     try {
//       const res = await axios.post(PROMO_API, {
//         code: promoCode.trim().toUpperCase(),
//       });

//       setPromoPercent(res.data.discount);
//       setPromoApplied(res.data.code);

//       toast({
//         title: 'Promo Applied 🎉',
//         description: `${res.data.discount}% discount applied`,
//       });

//       setPromoCode('');
//     } catch (err: any) {
//       setPromoApplied(null);
//       setPromoPercent(0);
//       setPromoError(
//         err.response?.data?.error || 'Invalid promo code'
//       );
//     }
//   };

//   /* ================================
//      SUBMIT ORDER
//   ================================ */
//   const onSubmit = async (data: AddressForm) => {
//     setIsProcessing(true);

//     try {
//       await simulatePayment(
//         grandTotal,
//         (paymentId) => {
//           const order = createOrder(
//             cartItems.map((item) => ({
//               id: item.id,
//               name: item.name,
//               price: item.price,
//               quantity: item.quantity,
//               image: item.image,
//             })),
//             grandTotal,
//             {
//               id: `addr_${Date.now()}`,
//               ...data,
//             },
//             paymentId,
//             data.notes
//           );

//           decreaseStock(
//             cartItems.map((item) => ({
//               id: item.id,
//               quantity: item.quantity,
//             }))
//           );

//           clearCart();

//           toast({
//             title: 'Order placed successfully',
//             description: `Order ID: ${order.id}`,
//           });

//           navigate(`/payment-success?orderId=${order.id}`);
//         },
//         (msg) => setPaymentProgress(msg)
//       );
//     } catch {
//       toast({
//         title: 'Payment failed',
//         variant: 'destructive',
//       });
//     } finally {
//       setIsProcessing(false);
//       setPaymentProgress('');
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <Loader2 className="w-10 h-10 animate-spin" />
//         <p className="ml-2">Verifying session...</p>
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     navigate('/login');
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />

//       <main className="pt-[188px] md:pt-[200px] pb-16 px-4 max-w-6xl mx-auto">
//         <Link to="/" className="flex items-center mb-6">
//           <ArrowLeft className="mr-2" /> Back to Home
//         </Link>

//         <h1 className="text-3xl font-bold mb-8">Checkout</h1>

//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="grid lg:grid-cols-3 gap-8">
//             {/* LEFT */}
//             <div className="lg:col-span-2 space-y-6">
//               {/* ADDRESS */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>
//                     <MapPin className="inline mr-2" />
//                     Delivery Address
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <Input placeholder="Name" {...register('name')} />
//                   <Input placeholder="Phone" {...register('phone')} />
//                   <Input placeholder="Street" {...register('street')} />
//                   <Input placeholder="City" {...register('city')} />
//                   <Input placeholder="State" {...register('state')} />
//                   <Input placeholder="Zip" {...register('zipCode')} />
//                   <Textarea placeholder="Notes" {...register('notes')} />
//                 </CardContent>
//               </Card>

//               {/* PROMO */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>
//                     <Ticket className="inline mr-2" />
//                     Apply Promo Code
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   {promoApplied ? (
//                     <div className="bg-green-50 p-4 rounded flex justify-between">
//                       <span>
//                         {promoApplied} (-{promoPercent}%)
//                       </span>
//                       <Button
//                         variant="ghost"
//                         onClick={() => {
//                           setPromoApplied(null);
//                           setPromoPercent(0);
//                         }}
//                       >
//                         Remove
//                       </Button>
//                     </div>
//                   ) : (
//                     <>
//                       <div className="flex gap-2">
//                         <Input
//                           value={promoCode}
//                           onChange={(e) =>
//                             setPromoCode(e.target.value.toUpperCase())
//                           }
//                         />
//                         <Button
//                           type="button"
//                           onClick={handleApplyPromo}
//                         >
//                           Apply
//                         </Button>
//                       </div>
//                       {promoError && (
//                         <p className="text-red-500 text-sm">
//                           {promoError}
//                         </p>
//                       )}
//                     </>
//                   )}
//                 </CardContent>
//               </Card>
//             </div>

//             {/* RIGHT */}
//             <Card className="h-fit sticky top-24">
//               <CardHeader>
//                 <CardTitle>
//                   <CreditCard className="inline mr-2" />
//                   Order Summary
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-2">
//                 <div className="flex justify-between">
//                   <span>Subtotal</span>
//                   <span>€{totalPrice.toFixed(2)}</span>
//                 </div>

//                 {promoDiscount > 0 && (
//                   <div className="flex justify-between text-green-600">
//                     <span>Promo Discount</span>
//                     <span>-€{promoDiscount.toFixed(2)}</span>
//                   </div>
//                 )}

//                 <div className="flex justify-between">
//                   <span>Delivery</span>
//                   <span>
//                     {deliveryFee === 0
//                       ? 'FREE'
//                       : `€${deliveryFee.toFixed(2)}`}
//                   </span>
//                 </div>

//                 <div className="border-t pt-4 flex justify-between font-bold">
//                   <span>Total</span>
//                   <span>€{grandTotal.toFixed(2)}</span>
//                 </div>

//                 <Button
//                   type="submit"
//                   disabled={isProcessing}
//                   className="w-full mt-4"
//                 >
//                   {isProcessing ? (
//                     <>
//                       <Loader2 className="mr-2 animate-spin" />
//                       Processing...
//                     </>
//                   ) : (
//                     'Pay Now'
//                   )}
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </form>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Checkout;

// import { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import {
//   ArrowLeft,
//   ShoppingBag,
//   MapPin,
//   CreditCard,
//   Loader2,
//   Tag,
//   Ticket,
//   AlertTriangle,
//   Package,
// } from 'lucide-react';
// import { useForm, useWatch } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import axios from 'axios';

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';

// import { useCart } from '@/contexts/CartContext';
// import { useAuth } from '@/contexts/AuthContext';
// import { useOrders } from '@/contexts/OrderContext';
// import { useToast } from '@/hooks/use-toast';

// import { simulatePayment } from '@/lib/razorpay';
// import {
//   calculateDeliveryFee,
//   CartItemWithMeta,
//   DeliveryBreakdown,
// } from '@/lib/deliveryUtils';
// import { decreaseStock } from '@/lib/stockUtils';

// import Header from '@/components/Header';
// import Footer from '@/components/Footer';

// /* ================= PROMO API ================= */
// const PROMO_API = 'http://127.0.0.1:8000/api/auth/promocode/';

// /* ================= ADDRESS ================= */
// const addressSchema = z.object({
//   name: z.string().min(2),
//   phone: z.string().min(10),
//   street: z.string().min(5),
//   city: z.string().min(2),
//   state: z.string().min(2),
//   zipCode: z.string().min(3),
//   notes: z.string().optional(),
// });

// type AddressForm = z.infer<typeof addressSchema>;

// const Checkout = () => {
//   const navigate = useNavigate();
//   const { cartItems, getTotalPrice, clearCart } = useCart();
//   const { user, isAuthenticated, isLoading } = useAuth();
//   const { createOrder } = useOrders();
//   const { toast } = useToast();

//   const [promoCode, setPromoCode] = useState('');
//   const [promoPercent, setPromoPercent] = useState(0);
//   const [promoApplied, setPromoApplied] = useState<string | null>(null);
//   const [promoError, setPromoError] = useState('');

//   const [isProcessing, setIsProcessing] = useState(false);
//   const [paymentProgress, setPaymentProgress] = useState('');
//   const [deliveryBreakdown, setDeliveryBreakdown] =
//     useState<DeliveryBreakdown | null>(null);

//   const {
//     register,
//     handleSubmit,
//     control,
//   } = useForm<AddressForm>({
//     resolver: zodResolver(addressSchema),
//     defaultValues: {
//       name: user?.name || '',
//       phone: user?.phone || '',
//       city: 'Dublin',
//       state: 'Dublin',
//     },
//   });

//   const watchedCity = useWatch({ control, name: 'city' });
//   const watchedZipCode = useWatch({ control, name: 'zipCode' });

//   const totalPrice = getTotalPrice();

//   const cartItemsWithMeta: CartItemWithMeta[] = cartItems.map((item) => ({
//     id: item.id,
//     name: item.name,
//     price: item.price,
//     quantity: item.quantity,
//     category: item.category,
//   }));

//   useEffect(() => {
//     if (watchedCity) {
//       const breakdown = calculateDeliveryFee(
//         cartItemsWithMeta,
//         watchedCity,
//         watchedZipCode,
//         totalPrice
//       );
//       setDeliveryBreakdown(breakdown);
//     }
//   }, [watchedCity, watchedZipCode, cartItems, totalPrice]);

//   const deliveryFee = deliveryBreakdown?.total || 0;

//   const promoDiscount =
//     promoPercent > 0 ? (totalPrice * promoPercent) / 100 : 0;

//   const grandTotal = Math.max(
//     0,
//     totalPrice + deliveryFee - promoDiscount
//   );

//   /* ===== APPLY PROMO ===== */
//   const handleApplyPromo = async () => {
//     setPromoError('');
//     try {
//       const res = await axios.post(PROMO_API, {
//         code: promoCode.trim().toUpperCase(),
//       });

//       setPromoPercent(res.data.discount);
//       setPromoApplied(res.data.code);

//       toast({
//         title: 'Promo Applied 🎉',
//         description: `${res.data.discount}% discount applied`,
//       });
//     } catch (err: any) {
//       setPromoError(err.response?.data?.error || 'Invalid promo code');
//       setPromoApplied(null);
//       setPromoPercent(0);
//     }
//   };

//   /* ===== SUBMIT ORDER ===== */
//   const onSubmit = async (data: AddressForm) => {
//     setIsProcessing(true);
//     try {
//       await simulatePayment(grandTotal, (paymentId) => {
//         const order = createOrder(
//           cartItems,
//           grandTotal,
//           data,
//           paymentId
//         );

//         decreaseStock(
//           cartItems.map((i) => ({
//             id: i.id,
//             quantity: i.quantity,
//           }))
//         );

//         clearCart();

//         toast({
//           title: 'Order placed successfully!',
//           description: `Order ID: ${order.id}`,
//         });

//         navigate(`/payment-success?orderId=${order.id}`);
//       });
//     } finally {
//       setIsProcessing(false);
//       setPaymentProgress('');
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <Loader2 className="w-10 h-10 animate-spin" />
//         <p className="ml-2">Checking login...</p>
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     navigate('/login');
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
//       <main className="pt-[188px] md:pt-[200px] pb-16 px-4 max-w-6xl mx-auto">
//         <Link to="/" className="flex items-center mb-6">
//           <ArrowLeft className="mr-2" /> Back to Home
//         </Link>

//         <h1 className="text-3xl font-bold mb-8">Checkout</h1>

//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="grid lg:grid-cols-3 gap-8">
//             {/* LEFT */}
//             <div className="lg:col-span-2 space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>
//                     <MapPin className="inline mr-2" />
//                     Delivery Address
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   <Input placeholder="Name" {...register('name')} />
//                   <Input placeholder="Phone" {...register('phone')} />
//                   <Input placeholder="Street" {...register('street')} />
//                   <Input placeholder="City" {...register('city')} />
//                   <Input placeholder="State" {...register('state')} />
//                   <Input placeholder="Zip" {...register('zipCode')} />
//                   <Textarea placeholder="Notes" {...register('notes')} />
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>
//                     <Ticket className="inline mr-2" />
//                     Apply Promo Code
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   {promoApplied ? (
//                     <div className="bg-green-50 p-3 flex justify-between rounded">
//                       <span>
//                         {promoApplied} (-{promoPercent}%)
//                       </span>
//                       <Button
//                         variant="ghost"
//                         onClick={() => {
//                           setPromoApplied(null);
//                           setPromoPercent(0);
//                         }}
//                       >
//                         Remove
//                       </Button>
//                     </div>
//                   ) : (
//                     <>
//                       <div className="flex gap-2">
//                         <Input
//                           value={promoCode}
//                           onChange={(e) =>
//                             setPromoCode(e.target.value)
//                           }
//                         />
//                         <Button
//                           type="button"
//                           onClick={handleApplyPromo}
//                         >
//                           Apply
//                         </Button>
//                       </div>
//                       {promoError && (
//                         <p className="text-red-500 text-sm">
//                           {promoError}
//                         </p>
//                       )}
//                     </>
//                   )}
//                 </CardContent>
//               </Card>
//             </div>

//             {/* RIGHT */}
//             <Card className="h-fit sticky top-24">
//               <CardHeader>
//                 <CardTitle>
//                   <CreditCard className="inline mr-2" />
//                   Order Summary
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex justify-between">
//                   <span>Subtotal</span>
//                   <span>€{totalPrice.toFixed(2)}</span>
//                 </div>

//                 {promoDiscount > 0 && (
//                   <div className="flex justify-between text-green-600">
//                     <span>Promo Discount</span>
//                     <span>-€{promoDiscount.toFixed(2)}</span>
//                   </div>
//                 )}

//                 <div className="flex justify-between">
//                   <span>Delivery</span>
//                   <span>
//                     {deliveryFee === 0
//                       ? 'FREE'
//                       : `€${deliveryFee.toFixed(2)}`}
//                   </span>
//                 </div>

//                 <div className="border-t mt-3 pt-3 flex justify-between font-bold">
//                   <span>Total</span>
//                   <span>€{grandTotal.toFixed(2)}</span>
//                 </div>

//                 <Button
//                   type="submit"
//                   className="w-full mt-4"
//                   disabled={isProcessing}
//                 >
//                   {isProcessing ? (
//                     <>
//                       <Loader2 className="mr-2 animate-spin" />
//                       Processing...
//                     </>
//                   ) : (
//                     'Pay Now'
//                   )}
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </form>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default Checkout;


// import { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import {
//   ArrowLeft,
//   MapPin,
//   CreditCard,
//   Loader2,
//   Ticket,
// } from 'lucide-react';
// import { useForm, useWatch } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import axios from 'axios';

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';

// import { useCart } from '@/contexts/CartContext';
// import { useAuth } from '@/contexts/AuthContext';
// import { useOrders } from '@/contexts/OrderContext';
// import { useToast } from '@/hooks/use-toast';

// import { simulatePayment } from '@/lib/razorpay';
// import {
//   calculateDeliveryFee,
//   CartItemWithMeta,
//   DeliveryBreakdown,
// } from '@/lib/deliveryUtils';
// import { decreaseStock } from '@/lib/stockUtils';

// import Header from '@/components/Header';
// import Footer from '@/components/Footer';

// /* ================================
//    PROMO API
// ================================ */
// const PROMO_API = 'http://127.0.0.1:8000/api/auth/promocode/';

// /* ================================
//    ADDRESS SCHEMA
// ================================ */
// const addressSchema = z.object({
//   name: z.string().min(2),
//   phone: z.string().min(10),
//   street: z.string().min(5),
//   city: z.string().min(2),
//   state: z.string().min(2),
//   zipCode: z.string().min(3),
//   notes: z.string().optional(),
// });

// type AddressForm = z.infer<typeof addressSchema>;

// const Checkout = () => {
//   const navigate = useNavigate();
//   const { cartItems, getTotalPrice, clearCart } = useCart();
//   const { user, isAuthenticated, isLoading } = useAuth();
//   const { createOrder } = useOrders();
//   const { toast } = useToast();

//   const [promoCode, setPromoCode] = useState('');
//   const [promoPercent, setPromoPercent] = useState(0);
//   const [promoApplied, setPromoApplied] = useState<string | null>(null);
//   const [promoError, setPromoError] = useState('');

//   const [isProcessing, setIsProcessing] = useState(false);
//   const [paymentProgress, setPaymentProgress] = useState('');
//   const [deliveryBreakdown, setDeliveryBreakdown] =
//     useState<DeliveryBreakdown | null>(null);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     control,
//   } = useForm<AddressForm>({
//     resolver: zodResolver(addressSchema),
//     defaultValues: {
//       name: '',
//       phone: '',
//       city: 'Dublin',
//       state: 'Dublin',
//     },
//   });

//   /* ================================
//      FILL USER DATA AFTER LOAD
//   ================================ */
//   useEffect(() => {
//     if (user) {
//       reset({
//         name: user.name || '',
//         phone: user.phone || '',
//         city: 'Dublin',
//         state: 'Dublin',
//       });
//     }
//   }, [user, reset]);

//   const watchedCity = useWatch({ control, name: 'city' });
//   const watchedZipCode = useWatch({ control, name: 'zipCode' });

//   const totalPrice = getTotalPrice();

//   const cartItemsWithMeta: CartItemWithMeta[] = cartItems.map((item) => ({
//     id: item.id,
//     name: item.name,
//     price: item.price,
//     quantity: item.quantity,
//     category: item.category,
//   }));

//   useEffect(() => {
//     if (watchedCity) {
//       const breakdown = calculateDeliveryFee(
//         cartItemsWithMeta,
//         watchedCity,
//         watchedZipCode,
//         totalPrice
//       );
//       setDeliveryBreakdown(breakdown);
//     }
//   }, [watchedCity, watchedZipCode, cartItems, totalPrice]);

//   const deliveryFee = deliveryBreakdown?.total || 0;
//   const promoDiscount =
//     promoPercent > 0 ? (totalPrice * promoPercent) / 100 : 0;

//   const grandTotal = Math.max(
//     0,
//     totalPrice + deliveryFee - promoDiscount
//   );

//   /* ================================
//      APPLY PROMO
//   ================================ */
//   const handleApplyPromo = async () => {
//     setPromoError('');

//     try {
//       const res = await axios.post(PROMO_API, {
//         code: promoCode.trim().toUpperCase(),
//       });

//       setPromoPercent(res.data.discount);
//       setPromoApplied(res.data.code);

//       toast({
//         title: 'Promo Applied',
//         description: `${res.data.discount}% discount added`,
//       });

//       setPromoCode('');
//     } catch (err: any) {
//       setPromoError(
//         err.response?.data?.error || 'Invalid promo code'
//       );
//     }
//   };

//   /* ================================
//      SUBMIT
//   ================================ */
//   const onSubmit = async (data: AddressForm) => {
//     setIsProcessing(true);

//     try {
//       await simulatePayment(grandTotal, (paymentId) => {
//         const order = createOrder(
//           cartItems.map((item) => ({
//             id: item.id,
//             name: item.name,
//             price: item.price,
//             quantity: item.quantity,
//             image: item.image,
//           })),
//           grandTotal,
//           {
//             id: `addr_${Date.now()}`,
//             ...data,
//           },
//           paymentId,
//           data.notes
//         );

//         decreaseStock(
//           cartItems.map((item) => ({
//             id: item.id,
//             quantity: item.quantity,
//           }))
//         );

//         clearCart();

//         toast({
//           title: 'Order Successful',
//           description: `Order ID: ${order.id}`,
//         });

//         navigate(`/payment-success?orderId=${order.id}`);
//       });
//     } finally {
//       setIsProcessing(false);
//       setPaymentProgress('');
//     }
//   };

//   /* ================================
//      AUTH WAIT
//   ================================ */
//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <Loader2 className="w-10 h-10 animate-spin" />
//         <p className="ml-2">Loading session...</p>
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     navigate('/login');
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />

//       <main className="pt-[188px] md:pt-[200px] pb-16 px-4 max-w-6xl mx-auto">
//         <Link to="/" className="flex items-center mb-6">
//           <ArrowLeft className="mr-2" /> Back to Home
//         </Link>

//         <h1 className="text-3xl font-bold mb-8">Checkout</h1>

//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="grid lg:grid-cols-3 gap-8">
//             {/* LEFT */}
//             <div className="lg:col-span-2 space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>
//                     <MapPin className="inline mr-2" />
//                     Delivery Address
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   <Input placeholder="Name" {...register('name')} />
//                   <Input placeholder="Phone" {...register('phone')} />
//                   <Input placeholder="Street" {...register('street')} />
//                   <Input placeholder="City" {...register('city')} />
//                   <Input placeholder="State" {...register('state')} />
//                   <Input placeholder="Zip" {...register('zipCode')} />
//                   <Textarea placeholder="Notes" {...register('notes')} />
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>
//                     <Ticket className="inline mr-2" />
//                     Apply Promo Code
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex gap-2">
//                     <Input
//                       value={promoCode}
//                       onChange={(e) =>
//                         setPromoCode(e.target.value.toUpperCase())
//                       }
//                     />
//                     <Button
//                       type="button"
//                       onClick={handleApplyPromo}
//                     >
//                       Apply
//                     </Button>
//                   </div>
//                   {promoError && (
//                     <p className="text-red-500 text-sm mt-2">
//                       {promoError}
//                     </p>
//                   )}
//                 </CardContent>
//               </Card>
//             </div>

//             {/* RIGHT */}
//             <Card className="h-fit sticky top-24">
//               <CardHeader>
//                 <CardTitle>
//                   <CreditCard className="inline mr-2" />
//                   Order Summary
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex justify-between">
//                   <span>Subtotal</span>
//                   <span>€{totalPrice.toFixed(2)}</span>
//                 </div>

//                 {promoDiscount > 0 && (
//                   <div className="flex justify-between text-green-600">
//                     <span>Promo Discount</span>
//                     <span>-€{promoDiscount.toFixed(2)}</span>
//                   </div>
//                 )}

//                 <div className="flex justify-between">
//                   <span>Delivery</span>
//                   <span>
//                     {deliveryFee === 0
//                       ? 'FREE'
//                       : `€${deliveryFee.toFixed(2)}`}
//                   </span>
//                 </div>

//                 <div className="border-t pt-4 flex justify-between font-bold">
//                   <span>Total</span>
//                   <span>€{grandTotal.toFixed(2)}</span>
//                 </div>

//                 <Button
//                   type="submit"
//                   disabled={isProcessing}
//                   className="w-full mt-4"
//                 >
//                   {isProcessing ? (
//                     <>
//                       <Loader2 className="mr-2 animate-spin" />
//                       Processing...
//                     </>
//                   ) : (
//                     'Pay Now'
//                   )}
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </form>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Checkout;


// import { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import {
//   ArrowLeft,
//   MapPin,
//   CreditCard,
//   Loader2,
//   Ticket,
// } from 'lucide-react';
// import { useForm, useWatch } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import axios from 'axios';

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';

// import { useCart } from '@/contexts/CartContext';
// import { useAuth } from '@/contexts/AuthContext';
// import { useOrders } from '@/contexts/OrderContext';
// import { useToast } from '@/hooks/use-toast';

// import { simulatePayment } from '@/lib/razorpay';
// import {
//   calculateDeliveryFee,
//   CartItemWithMeta,
//   DeliveryBreakdown,
// } from '@/lib/deliveryUtils';
// import { decreaseStock } from '@/lib/stockUtils';

// import Header from '@/components/Header';
// import Footer from '@/components/Footer';

// /* ================================
//    PROMO API
// ================================ */
// const PROMO_API = 'http://127.0.0.1:8000/api/auth/promocode/';

// /* ================================
//    ADDRESS SCHEMA
// ================================ */
// const addressSchema = z.object({
//   name: z.string().min(2),
//   phone: z.string().min(10),
//   street: z.string().min(5),
//   city: z.string().min(2),
//   state: z.string().min(2),
//   zipCode: z.string().min(3),
//   notes: z.string().optional(),
// });

// type AddressForm = z.infer<typeof addressSchema>;

// const Checkout = () => {
//   const navigate = useNavigate();
//   const { cartItems, getTotalPrice, clearCart } = useCart();
//   const { user, isAuthenticated, isLoading } = useAuth();
//   const { createOrder } = useOrders();
//   const { toast } = useToast();

//   /* ================================
//      PROMO STATE
//   ================================ */
//   const [promoCode, setPromoCode] = useState('');
//   const [promoPercent, setPromoPercent] = useState(0);
//   const [promoApplied, setPromoApplied] = useState<string | null>(null);
//   const [promoError, setPromoError] = useState('');

//   const [isProcessing, setIsProcessing] = useState(false);
//   const [deliveryBreakdown, setDeliveryBreakdown] =
//     useState<DeliveryBreakdown | null>(null);

//   const { register, handleSubmit, reset, control } =
//     useForm<AddressForm>({
//       resolver: zodResolver(addressSchema),
//       defaultValues: {
//         name: '',
//         phone: '',
//         city: 'Dublin',
//         state: 'Dublin',
//       },
//     });

//   /* ================================
//      FILL USER DATA
//   ================================ */
//   useEffect(() => {
//     if (user) {
//       reset({
//         name: user.name || '',
//         phone: user.phone || '',
//         city: 'Dublin',
//         state: 'Dublin',
//       });
//     }
//   }, [user, reset]);

//   const watchedCity = useWatch({ control, name: 'city' });
//   const watchedZipCode = useWatch({ control, name: 'zipCode' });

//   const totalPrice = getTotalPrice();

//   const cartItemsWithMeta: CartItemWithMeta[] = cartItems.map((item) => ({
//     id: item.id,
//     name: item.name,
//     price: item.price,
//     quantity: item.quantity,
//     category: item.category,
//   }));

//   useEffect(() => {
//     if (watchedCity) {
//       const breakdown = calculateDeliveryFee(
//         cartItemsWithMeta,
//         watchedCity,
//         watchedZipCode,
//         totalPrice
//       );
//       setDeliveryBreakdown(breakdown);
//     }
//   }, [watchedCity, watchedZipCode, cartItems, totalPrice]);

//   const deliveryFee = deliveryBreakdown?.total || 0;

//   const promoDiscount =
//     promoPercent > 0 ? (totalPrice * promoPercent) / 100 : 0;

//   const grandTotal = Math.max(
//     0,
//     totalPrice + deliveryFee - promoDiscount
//   );

//   /* ================================
//      APPLY PROMO
//   ================================ */
//   const handleApplyPromo = async () => {
//     setPromoError('');

//     if (!promoCode.trim()) {
//       setPromoError('Please enter promo code');
//       return;
//     }

//     try {
//       const res = await axios.post(PROMO_API, {
//         code: promoCode.trim().toUpperCase(),
//       });

//       setPromoPercent(res.data.discount);
//       setPromoApplied(res.data.code);

//       toast({
//         title: 'Promo Applied 🎉',
//         description: `${res.data.discount}% discount applied`,
//       });

//       setPromoCode('');
//     } catch (err: any) {
//       setPromoApplied(null);
//       setPromoPercent(0);
//       setPromoError(
//         err.response?.data?.error || 'Invalid promo code'
//       );
//     }
//   };

//   /* ================================
//      SUBMIT
//   ================================ */
//   const onSubmit = async (data: AddressForm) => {
//     setIsProcessing(true);

//     try {
//       await simulatePayment(grandTotal, (paymentId) => {
//         const order = createOrder(
//           cartItems.map((item) => ({
//             id: item.id,
//             name: item.name,
//             price: item.price,
//             quantity: item.quantity,
//             image: item.image,
//           })),
//           grandTotal,
//           {
//             id: `addr_${Date.now()}`,
//             ...data,
//           },
//           paymentId,
//           data.notes
//         );

//         decreaseStock(
//           cartItems.map((item) => ({
//             id: item.id,
//             quantity: item.quantity,
//           }))
//         );

//         clearCart();

//         toast({
//           title: 'Order Successful',
//           description: `Order ID: ${order.id}`,
//         });

//         navigate(`/payment-success?orderId=${order.id}`);
//       });
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <Loader2 className="w-10 h-10 animate-spin" />
//         <p className="ml-2">Loading session...</p>
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     navigate('/login');
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />

//       <main className="pt-[188px] md:pt-[200px] pb-16 px-4 max-w-6xl mx-auto">
//         <Link to="/" className="flex items-center mb-6">
//           <ArrowLeft className="mr-2" /> Back to Home
//         </Link>

//         <h1 className="text-3xl font-bold mb-8">Checkout</h1>

//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="grid lg:grid-cols-3 gap-8">
//             {/* LEFT */}
//             <div className="lg:col-span-2 space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>
//                     <MapPin className="inline mr-2" />
//                     Delivery Address
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   <Input placeholder="Name" {...register('name')} />
//                   <Input placeholder="Phone" {...register('phone')} />
//                   <Input placeholder="Street" {...register('street')} />
//                   <Input placeholder="City" {...register('city')} />
//                   <Input placeholder="State" {...register('state')} />
//                   <Input placeholder="Zip" {...register('zipCode')} />
//                   <Textarea placeholder="Notes" {...register('notes')} />
//                 </CardContent>
//               </Card>

//               {/* PROMO */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>
//                     <Ticket className="inline mr-2" />
//                     Apply Promo Code
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   {promoApplied ? (
//                     <div className="bg-green-50 p-4 rounded flex justify-between">
//                       <span>
//                         {promoApplied} (-{promoPercent}%)
//                       </span>
//                       <Button
//                         variant="ghost"
//                         onClick={() => {
//                           setPromoApplied(null);
//                           setPromoPercent(0);
//                         }}
//                       >
//                         Remove
//                       </Button>
//                     </div>
//                   ) : (
//                     <>
//                       <div className="flex gap-2">
//                         <Input
//                           value={promoCode}
//                           onChange={(e) =>
//                             setPromoCode(
//                               e.target.value.toUpperCase()
//                             )
//                           }
//                         />
//                         <Button
//                           type="button"
//                           onClick={handleApplyPromo}
//                         >
//                           Apply
//                         </Button>
//                       </div>
//                       {promoError && (
//                         <p className="text-red-500 text-sm mt-2">
//                           {promoError}
//                         </p>
//                       )}
//                     </>
//                   )}
//                 </CardContent>
//               </Card>
//             </div>

//             {/* RIGHT */}
//             <Card className="h-fit sticky top-24">
//               <CardHeader>
//                 <CardTitle>
//                   <CreditCard className="inline mr-2" />
//                   Order Summary
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex justify-between">
//                   <span>Subtotal</span>
//                   <span>€{totalPrice.toFixed(2)}</span>
//                 </div>

//                 {promoDiscount > 0 && (
//                   <div className="flex justify-between text-green-600">
//                     <span>Promo Discount</span>
//                     <span>-€{promoDiscount.toFixed(2)}</span>
//                   </div>
//                 )}

//                 <div className="flex justify-between">
//                   <span>Delivery</span>
//                   <span>
//                     {deliveryFee === 0
//                       ? 'FREE'
//                       : `€${deliveryFee.toFixed(2)}`}
//                   </span>
//                 </div>

//                 <div className="border-t pt-4 flex justify-between font-bold">
//                   <span>Total</span>
//                   <span>€{grandTotal.toFixed(2)}</span>
//                 </div>

//                 <Button
//                   type="submit"
//                   disabled={isProcessing}
//                   className="w-full mt-4"
//                 >
//                   {isProcessing ? (
//                     <>
//                       <Loader2 className="mr-2 animate-spin" />
//                       Processing...
//                     </>
//                   ) : (
//                     'Pay Now'
//                   )}
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </form>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Checkout;

import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  CreditCard,
  Loader2,
  Ticket,
} from 'lucide-react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/contexts/OrderContext';
import { useToast } from '@/hooks/use-toast';

import { simulatePayment } from '@/lib/razorpay';
import {
  calculateDeliveryFee,
  CartItemWithMeta,
  DeliveryBreakdown,
} from '@/lib/deliveryUtils';
import { decreaseStock } from '@/lib/stockUtils';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

/* ================================
   PROMO API
================================ */
const PROMO_API = 'http://127.0.0.1:8000/api/auth/promocode/';

/* ================================
   ADDRESS SCHEMA
================================ */
const addressSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  street: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  zipCode: z.string().min(3),
  notes: z.string().optional(),
});

type AddressForm = z.infer<typeof addressSchema>;

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user, isAuthenticated, isLoading } = useAuth();
  const { createOrder } = useOrders();
  const { toast } = useToast();

  /* ================================
     PROMO STATE
  ================================ */
  const [promoCode, setPromoCode] = useState('');
  const [promoPercent, setPromoPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');

  const [isProcessing, setIsProcessing] = useState(false);
  const [deliveryBreakdown, setDeliveryBreakdown] =
    useState<DeliveryBreakdown | null>(null);

  const { register, handleSubmit, reset, control } =
    useForm<AddressForm>({
      resolver: zodResolver(addressSchema),
      defaultValues: {
        name: '',
        phone: '',
        city: 'Dublin',
        state: 'Dublin',
      },
    });

  /* ================================
     FILL USER DATA
  ================================ */
  useEffect(() => {
    if (user) {
      reset({
        name: user.name || '',
        phone: user.phone || '',
        city: 'Dublin',
        state: 'Dublin',
      });
    }
  }, [user, reset]);

  const watchedCity = useWatch({ control, name: 'city' });
  const watchedZipCode = useWatch({ control, name: 'zipCode' });

  const totalPrice = getTotalPrice();

  const cartItemsWithMeta: CartItemWithMeta[] = cartItems.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    category: item.category,
  }));

  useEffect(() => {
    if (watchedCity) {
      const breakdown = calculateDeliveryFee(
        cartItemsWithMeta,
        watchedCity,
        watchedZipCode,
        totalPrice
      );
      setDeliveryBreakdown(breakdown);
    }
  }, [watchedCity, watchedZipCode, cartItems, totalPrice]);

  const deliveryFee = deliveryBreakdown?.total || 0;

  const promoDiscount =
    promoPercent > 0 ? (totalPrice * promoPercent) / 100 : 0;

  const grandTotal = Math.max(
    0,
    totalPrice + deliveryFee - promoDiscount
  );

  /* ================================
     APPLY PROMO
  ================================ */
  const handleApplyPromo = async () => {
    setPromoError('');

    if (!promoCode.trim()) {
      setPromoError('Please enter promo code');
      return;
    }

    try {
      const res = await axios.post(PROMO_API, {
        code: promoCode.trim().toUpperCase(),
      });

      setPromoPercent(res.data.discount);
      setPromoApplied(res.data.code);

      toast({
        title: 'Promo Applied 🎉',
        description: `${res.data.discount}% discount applied`,
      });

      setPromoCode('');
    } catch (err: any) {
      setPromoApplied(null);
      setPromoPercent(0);
      setPromoError(
        err.response?.data?.error || 'Invalid promo code'
      );
    }
  };

  /* ================================
     SUBMIT
  ================================ */
  const onSubmit = async (data: AddressForm) => {
    setIsProcessing(true);

    try {
      await simulatePayment(grandTotal, (paymentId) => {
        const order = createOrder(
          cartItems.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          grandTotal,
          {
            id: `addr_${Date.now()}`,
            ...data,
          },
          paymentId,
          data.notes
        );

        decreaseStock(
          cartItems.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          }))
        );

        clearCart();

        toast({
          title: 'Order Successful',
          description: `Order ID: ${order.id}`,
        });

        navigate(`/payment-success?orderId=${order.id}`);
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-10 h-10 animate-spin" />
        <p className="ml-2">Loading session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-[188px] md:pt-[200px] pb-16 px-4 max-w-6xl mx-auto">
        <Link to="/" className="flex items-center mb-6">
          <ArrowLeft className="mr-2" /> Back to Home
        </Link>

        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* LEFT */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <MapPin className="inline mr-2" />
                    Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input placeholder="Name" {...register('name')} />
                  <Input placeholder="Phone" {...register('phone')} />
                  <Input placeholder="Street" {...register('street')} />
                  <Input placeholder="City" {...register('city')} />
                  <Input placeholder="State" {...register('state')} />
                  <Input placeholder="Zip" {...register('zipCode')} />
                  <Textarea placeholder="Notes" {...register('notes')} />
                </CardContent>
              </Card>

              {/* PROMO */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    <Ticket className="inline mr-2" />
                    Apply Promo Code
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {promoApplied ? (
                    <div className="bg-green-50 p-4 rounded flex justify-between">
                      <span>
                        {promoApplied} (-{promoPercent}%)
                      </span>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setPromoApplied(null);
                          setPromoPercent(0);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="flex gap-2">
                        <Input
                          value={promoCode}
                          onChange={(e) =>
                            setPromoCode(
                              e.target.value.toUpperCase()
                            )
                          }
                        />
                        <Button
                          type="button"
                          onClick={handleApplyPromo}
                        >
                          Apply
                        </Button>
                      </div>
                      {promoError && (
                        <p className="text-red-500 text-sm mt-2">
                          {promoError}
                        </p>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* RIGHT */}
            <Card className="h-fit sticky top-24">
              <CardHeader>
                <CardTitle>
                  <CreditCard className="inline mr-2" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>€{totalPrice.toFixed(2)}</span>
                </div>

                {promoDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Promo Discount</span>
                    <span>-€{promoDiscount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>
                    {deliveryFee === 0
                      ? 'FREE'
                      : `€${deliveryFee.toFixed(2)}`}
                  </span>
                </div>

                <div className="border-t pt-4 flex justify-between font-bold">
                  <span>Total</span>
                  <span>€{grandTotal.toFixed(2)}</span>
                </div>

                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full mt-4"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Pay Now'
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;

