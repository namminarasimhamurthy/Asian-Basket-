// import { useEffect, useState } from 'react';
// import { useSearchParams, Link } from 'react-router-dom';
// import { CheckCircle, ShoppingBag, ArrowRight, Ticket, Gift, Calendar } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { useOrders } from '@/contexts/OrderContext';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';

// const PaymentSuccess = () => {
//     const [searchParams] = useSearchParams();
//     const orderId = searchParams.get('orderId');
//     const voucherCode = searchParams.get('voucher');
//     const voucherAmount = searchParams.get('voucherAmount');
//     const { getOrderById } = useOrders();
//     const [order, setOrder] = useState<ReturnType<typeof getOrderById>>(undefined);

//     useEffect(() => {
//         if (orderId) {
//             setOrder(getOrderById(orderId));
//         }
//     }, [orderId, getOrderById]);

//     // Calculate voucher expiry (30 days from now)
//     const voucherExpiry = new Date();
//     voucherExpiry.setDate(voucherExpiry.getDate() + 30);

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-green-50 via-background to-blue-50">
//             <Header />

//             <main className="pt-[188px] md:pt-[200px] pb-16 px-4">
//                 <div className="max-w-2xl mx-auto text-center">
//                     {/* Success Animation */}
//                     <div className="mb-8">
//                         <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center animate-bounce">
//                             <CheckCircle className="h-14 w-14 text-green-600" />
//                         </div>
//                     </div>

//                     {/* Success Message */}
//                     <h1 className="text-3xl md:text-4xl font-bold mb-4 text-green-600">
//                         Payment Successful!
//                     </h1>
//                     <p className="text-lg text-muted-foreground mb-8">
//                         Thank you for your order. Your groceries are being prepared!
//                     </p>

//                     {/* Voucher Earned Card */}
//                     {voucherCode && voucherAmount && (
//                         <Card className="shadow-xl mb-8 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
//                             <CardContent className="p-6">
//                                 <div className="flex items-center justify-center gap-3 mb-4">
//                                     <div className="p-3 bg-amber-100 rounded-full">
//                                         <Gift className="h-6 w-6 text-amber-600" />
//                                     </div>
//                                     <h2 className="text-xl font-bold text-amber-800">
//                                         🎉 You've Earned a Voucher!
//                                     </h2>
//                                 </div>

//                                 <div className="bg-white rounded-xl p-4 shadow-inner border-2 border-dashed border-amber-300 mb-4">
//                                     <div className="flex items-center justify-between">
//                                         <div className="flex items-center gap-2">
//                                             <Ticket className="h-5 w-5 text-amber-600" />
//                                             <span className="font-mono text-lg font-bold text-amber-800">
//                                                 {voucherCode}
//                                             </span>
//                                         </div>
//                                         <span className="text-2xl font-bold text-green-600">
//                                             €{parseFloat(voucherAmount).toFixed(2)} OFF
//                                         </span>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-center justify-center gap-2 text-sm text-amber-700">
//                                     <Calendar className="h-4 w-4" />
//                                     <span>
//                                         Valid until {voucherExpiry.toLocaleDateString('en-IE', {
//                                             day: 'numeric',
//                                             month: 'long',
//                                             year: 'numeric'
//                                         })}
//                                     </span>
//                                 </div>

//                                 <p className="text-xs text-amber-600 mt-3">
//                                     Use this code on your next order to get €{voucherAmount} off!
//                                 </p>
//                             </CardContent>
//                         </Card>
//                     )}

//                     {/* Order Details Card */}
//                     {order && (
//                         <Card className="shadow-xl mb-8 text-left">
//                             <CardContent className="p-6">
//                                 <div className="flex items-center justify-between mb-6 pb-4 border-b">
//                                     <div>
//                                         <p className="text-sm text-muted-foreground">Order ID</p>
//                                         <p className="font-bold text-lg">{order.id}</p>
//                                     </div>
//                                     <div className="text-right">
//                                         <p className="text-sm text-muted-foreground">Total Amount</p>
//                                         <p className="font-bold text-lg text-primary">€{order.totalAmount.toFixed(2)}</p>
//                                     </div>
//                                 </div>

//                                 {/* Order Items */}
//                                 <div className="mb-6">
//                                     <h3 className="font-semibold mb-3 flex items-center gap-2">
//                                         <ShoppingBag className="h-4 w-4" />
//                                         Order Items
//                                     </h3>
//                                     <div className="space-y-3">
//                                         {order.items.map((item, idx) => (
//                                             <div key={idx} className="flex items-center gap-3">
//                                                 <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
//                                                     <img
//                                                         src={item.image}
//                                                         alt={item.name}
//                                                         className="w-full h-full object-cover"
//                                                     />
//                                                 </div>
//                                                 <div className="flex-1">
//                                                     <p className="font-medium text-sm">{item.name}</p>
//                                                     <p className="text-xs text-muted-foreground">
//                                                         Qty: {item.quantity} × €{item.price.toFixed(2)}
//                                                     </p>
//                                                 </div>
//                                                 <p className="font-semibold text-sm">
//                                                     €{(item.price * item.quantity).toFixed(2)}
//                                                 </p>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>

//                                 {/* Delivery Address */}
//                                 <div className="bg-muted/50 rounded-lg p-4">
//                                     <h3 className="font-semibold mb-2 text-sm">Delivery Address</h3>
//                                     <p className="text-sm text-muted-foreground">
//                                         {order.deliveryAddress.name}<br />
//                                         {order.deliveryAddress.street}<br />
//                                         {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}
//                                     </p>
//                                 </div>

//                                 {/* Payment Info */}
//                                 <div className="mt-4 flex items-center justify-between text-sm">
//                                     <span className="text-muted-foreground">Payment ID</span>
//                                     <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
//                                         {order.paymentId}
//                                     </span>
//                                 </div>
//                             </CardContent>
//                         </Card>
//                     )}

//                     {/* Action Buttons */}
//                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                         <Link to="/orders">
//                             <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90">
//                                 View Order Details
//                                 <ArrowRight className="ml-2 h-4 w-4" />
//                             </Button>
//                         </Link>
//                         <Link to="/#menu">
//                             <Button variant="outline" className="w-full sm:w-auto">
//                                 Continue Shopping
//                             </Button>
//                         </Link>
//                     </div>

//                     {/* Estimated Time */}
//                     <div className="mt-12 p-6 bg-white rounded-2xl shadow-md">
//                         <p className="text-muted-foreground mb-2">Estimated Delivery Time</p>
//                         <p className="text-4xl font-bold text-primary">1-2 Days</p>
//                         <p className="text-sm text-muted-foreground mt-2">
//                             We'll notify you when your order is on its way!
//                         </p>
//                     </div>
//                 </div>
//             </main>

//             <Footer />
//         </div>
//     );
// };

// export default PaymentSuccess;


// import { useEffect, useState } from "react";
// import { useSearchParams, Link } from "react-router-dom";
// import { CheckCircle, XCircle, Loader2, ArrowRight } from "lucide-react";
// import api from "@/lib/axios";
// import { useCart } from "@/contexts/CartContext";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";

// const PaymentSuccess = () => {
//   const [searchParams] = useSearchParams();
//   const orderId = searchParams.get("order_id");

//   const { clearCart } = useCart();

//   const [status, setStatus] = useState<"loading" | "success" | "failed">(
//     "loading"
//   );
//   const [orderData, setOrderData] = useState<any>(null);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   useEffect(() => {
//     const verifyPayment = async () => {
//       if (!orderId) {
//         setStatus("failed");
//         setErrorMessage("Invalid order reference.");
//         return;
//       }

//       try {
//         // ✅ Correct API path based on your backend
//         const res = await api.get(
//           `auth/payment/verify/?order_id=${orderId}`
//         );

//         if (res.data.status === "PAID") {
//           setStatus("success");
//           setOrderData(res.data);

//           // ✅ Clear cart only after confirmed payment
//           clearCart();
//         } else {
//           setStatus("failed");
//           setErrorMessage("Payment not completed.");
//         }
//       } catch (error: any) {
//         setStatus("failed");
//         setErrorMessage(
//           error.response?.data?.error || "Payment verification failed."
//         );
//       }
//     };

//     verifyPayment();
//   }, [orderId, clearCart]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-background to-blue-50">
//       <Header />

//       <main className="pt-[188px] md:pt-[200px] pb-16 px-4">
//         <div className="max-w-2xl mx-auto text-center">

//           {/* ================= LOADING ================= */}
//           {status === "loading" && (
//             <div className="flex flex-col items-center">
//               <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
//               <h2 className="text-xl font-semibold mb-2">
//                 Verifying Payment...
//               </h2>
//               <p className="text-muted-foreground">
//                 Please wait while we confirm your transaction.
//               </p>
//             </div>
//           )}

//           {/* ================= SUCCESS ================= */}
//           {status === "success" && (
//             <>
//               <div className="mb-6">
//                 <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4 animate-bounce" />
//                 <h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
//                   Payment Successful 🎉
//                 </h1>
//                 <p className="text-muted-foreground">
//                   Thank you! Your order has been confirmed.
//                 </p>
//               </div>

//               {orderData && (
//                 <Card className="shadow-xl mb-8 text-left">
//                   <CardContent className="p-6 space-y-4">
//                     <div className="flex justify-between">
//                       <span className="text-muted-foreground">
//                         Order ID
//                       </span>
//                       <span className="font-bold">
//                         {orderData.order_id}
//                       </span>
//                     </div>

//                     <div className="flex justify-between">
//                       <span className="text-muted-foreground">
//                         Amount Paid
//                       </span>
//                       <span className="font-bold text-primary">
//                         €{parseFloat(orderData.amount).toFixed(2)}
//                       </span>
//                     </div>

//                     <div className="flex justify-between">
//                       <span className="text-muted-foreground">
//                         Status
//                       </span>
//                       <span className="text-green-600 font-semibold">
//                         {orderData.status}
//                       </span>
//                     </div>
//                   </CardContent>
//                 </Card>
//               )}

//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <Link to="/orders">
//                   <Button className="w-full sm:w-auto">
//                     View Orders
//                     <ArrowRight className="ml-2 h-4 w-4" />
//                   </Button>
//                 </Link>

//                 <Link to="/">
//                   <Button variant="outline" className="w-full sm:w-auto">
//                     Continue Shopping
//                   </Button>
//                 </Link>
//               </div>
//             </>
//           )}

//           {/* ================= FAILED ================= */}
//           {status === "failed" && (
//             <>
//               <div className="mb-6">
//                 <XCircle className="w-20 h-20 text-red-600 mx-auto mb-4" />
//                 <h1 className="text-3xl font-bold text-red-600 mb-2">
//                   Payment Failed ❌
//                 </h1>
//                 <p className="text-muted-foreground">
//                   {errorMessage || "Something went wrong."}
//                 </p>
//               </div>

//               <Link to="/checkout">
//                 <Button variant="destructive">
//                   Try Again
//                 </Button>
//               </Link>
//             </>
//           )}
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default PaymentSuccess;



// import { useEffect, useState } from "react";
// import { useSearchParams, Link } from "react-router-dom";
// import api from "@/lib/axios";

// import { CheckCircle, Loader2, ArrowLeft, Package } from "lucide-react";

// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { Button } from "@/components/ui/button";

// import { useCart } from "@/contexts/CartContext";
// import { useToast } from "@/hooks/use-toast";

// const PaymentSuccess = () => {

//   const [searchParams] = useSearchParams();
//   const orderId = searchParams.get("order_id");

//   const { clearCart } = useCart();
//   const { toast } = useToast();

//   const [loading, setLoading] = useState(true);
//   const [status, setStatus] = useState<"PAID" | "FAILED" | "PENDING">("PENDING");

//   useEffect(() => {

//     if (!orderId) {
//       setLoading(false);
//       return;
//     }

//     verifyPayment();

//   }, [orderId]);



//   const verifyPayment = async () => {

//     try {

//       const response = await api.post("auth/payment/verify/", {
//         order_id: orderId
//       });

//       const paymentStatus = response.data.payment_status;

//       if (paymentStatus === "PAID") {

//         setStatus("PAID");

//         clearCart();

//         toast({
//           title: "Payment Successful 🎉",
//           description: "Your order has been confirmed.",
//         });

//       }
//       else {

//         setStatus("FAILED");

//         toast({
//           title: "Payment Failed",
//           description: "Your payment could not be verified.",
//           variant: "destructive",
//         });

//       }

//     }
//     catch (error: any) {

//       console.error("Verify error:", error);

//       setStatus("FAILED");

//       toast({
//         title: "Verification Failed",
//         description: "Unable to verify payment.",
//         variant: "destructive",
//       });

//     }
//     finally {

//       setLoading(false);

//     }

//   };



//   return (

//     <div className="min-h-screen bg-background">

//       <Header />

//       <main className="pt-[188px] md:pt-[200px] pb-16 px-4 max-w-xl mx-auto text-center">

//         {loading ? (

//           <div className="flex flex-col items-center gap-4">

//             <Loader2 className="h-12 w-12 animate-spin text-primary" />

//             <h2 className="text-xl font-semibold">
//               Verifying payment...
//             </h2>

//           </div>

//         ) : status === "PAID" ? (

//           <div className="space-y-6">

//             <CheckCircle className="h-20 w-20 text-green-500 mx-auto" />

//             <h1 className="text-3xl font-bold text-green-600">
//               Payment Successful
//             </h1>

//             <p className="text-muted-foreground">
//               Your order has been placed successfully.
//             </p>

//             {orderId && (

//               <div className="bg-muted p-4 rounded-lg">

//                 <p className="text-sm text-muted-foreground">
//                   Order ID
//                 </p>

//                 <p className="font-semibold">
//                   {orderId}
//                 </p>

//               </div>

//             )}

//             <div className="flex gap-4 justify-center">

//               <Link to="/">
//                 <Button>
//                   Continue Shopping
//                 </Button>
//               </Link>

//               <Link to="/orders">
//                 <Button variant="outline">
//                   <Package className="mr-2 h-4 w-4" />
//                   View Orders
//                 </Button>
//               </Link>

//             </div>

//           </div>

//         ) : (

//           <div className="space-y-6">

//             <h1 className="text-3xl font-bold text-red-600">
//               Payment Failed
//             </h1>

//             <p className="text-muted-foreground">
//               Your payment could not be completed.
//             </p>

//             <Link to="/checkout">
//               <Button>
//                 Try Again
//               </Button>
//             </Link>

//           </div>

//         )}

//       </main>

//       <Footer />

//     </div>

//   );

// };

// export default PaymentSuccess;




// import { useEffect, useState } from "react";
// import { useSearchParams, Link, useNavigate } from "react-router-dom";
// import api from "@/lib/axios";

// import { CheckCircle, Loader2, Package } from "lucide-react";

// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { Button } from "@/components/ui/button";

// import { useCart } from "@/contexts/CartContext";
// import { useToast } from "@/hooks/use-toast";


// const PaymentSuccess = () => {

//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   const orderId = searchParams.get("order_id");

//   const { clearCart } = useCart();
//   const { toast } = useToast();

//   const [loading, setLoading] = useState(true);

//   const [status, setStatus] = useState<
//     "PAID" | "FAILED" | "PENDING"
//   >("PENDING");


//   /* ===============================
//      VERIFY PAYMENT WITH BACKEND
//   =============================== */
//   useEffect(() => {

//     if (!orderId) {
//       setLoading(false);
//       setStatus("FAILED");
//       return;
//     }

//     verifyPayment();

//   }, [orderId]);


//   const verifyPayment = async () => {

//     try {

//       const response = await api.post(
//         "auth/payment/verify/",
//         {
//           order_id: orderId
//         }
//       );

//       const paymentStatus =
//         response.data.payment_status;

//       console.log("Payment status:", paymentStatus);


//       if (paymentStatus === "PAID") {

//         setStatus("PAID");

//         // Clear cart
//         clearCart();

//         toast({
//           title: "Payment Successful 🎉",
//           description:
//             "Your order has been confirmed.",
//         });

//       }
//       else {

//         setStatus("FAILED");

//         toast({
//           title: "Payment Failed",
//           description:
//             "Payment was not completed.",
//           variant: "destructive",
//         });

//       }

//     }
//     catch (error: any) {

//       console.error(
//         "Verification error:",
//         error
//       );

//       setStatus("FAILED");

//       toast({
//         title: "Verification Failed",
//         description:
//           "Unable to verify payment.",
//         variant: "destructive",
//       });

//     }
//     finally {

//       setLoading(false);

//     }

//   };


//   /* ===============================
//      AUTO REDIRECT AFTER SUCCESS
//   =============================== */
//   useEffect(() => {

//     if (status === "PAID") {

//       const timer = setTimeout(() => {

//         // Redirect to home page
//         navigate("/");

//         // OR redirect to orders page:
//         // navigate("/orders");

//       }, 3000);

//       return () => clearTimeout(timer);

//     }

//   }, [status, navigate]);


//   /* ===============================
//      UI
//   =============================== */
//   return (

//     <div className="min-h-screen bg-background">

//       <Header />

//       <main className="pt-[188px] md:pt-[200px] pb-16 px-4 max-w-xl mx-auto text-center">


//         {/* LOADING */}
//         {loading ? (

//           <div className="flex flex-col items-center gap-4">

//             <Loader2 className="h-12 w-12 animate-spin text-primary" />

//             <h2 className="text-xl font-semibold">
//               Verifying payment...
//             </h2>

//           </div>

//         ) : status === "PAID" ? (


//           /* SUCCESS UI */
//           <div className="space-y-6">

//             <CheckCircle className="h-20 w-20 text-green-500 mx-auto" />

//             <h1 className="text-3xl font-bold text-green-600">
//               Payment Successful
//             </h1>

//             <p className="text-muted-foreground">
//               Your order has been placed successfully.
//             </p>

//             <p className="text-sm text-muted-foreground">
//               Redirecting to home page in 3 seconds...
//             </p>


//             {orderId && (

//               <div className="bg-muted p-4 rounded-lg">

//                 <p className="text-sm text-muted-foreground">
//                   Order ID
//                 </p>

//                 <p className="font-semibold">
//                   {orderId}
//                 </p>

//               </div>

//             )}


//             <div className="flex gap-4 justify-center">

//               <Link to="/">
//                 <Button>
//                   Continue Shopping
//                 </Button>
//               </Link>

//               <Link to="/orders">
//                 <Button variant="outline">

//                   <Package className="mr-2 h-4 w-4" />

//                   View Orders

//                 </Button>
//               </Link>

//             </div>

//           </div>

//         ) : (


//           /* FAILED UI */
//           <div className="space-y-6">

//             <h1 className="text-3xl font-bold text-red-600">
//               Payment Failed
//             </h1>

//             <p className="text-muted-foreground">
//               Your payment could not be completed.
//             </p>

//             <Link to="/checkout">

//               <Button>
//                 Try Again
//               </Button>

//             </Link>

//           </div>

//         )}

//       </main>

//       <Footer />

//     </div>

//   );

// };


// export default PaymentSuccess;



import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "@/lib/axios";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Loader2, CheckCircle } from "lucide-react";

const PaymentSuccess = () => {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const orderId = searchParams.get("order_id");

  const [status, setStatus] = useState("VERIFYING");

  useEffect(() => {

    if (!orderId) return;

    verifyWithRetry();

  }, [orderId]);



  const verifyWithRetry = async () => {

    let attempts = 0;

    while (attempts < 5) {

      try {

        const res = await api.post("auth/payment/verify/", {
          order_id: orderId
        });

        console.log("VERIFY RESPONSE:", res.data);

        if (res.data.payment_status === "PAID") {

          setStatus("SUCCESS");

          setTimeout(() => {
            navigate("/");
          }, 3000);

          return;
        }

      } catch (err) {

        console.error(err);

      }

      attempts++;

      await new Promise(resolve => setTimeout(resolve, 2000));

    }

    setStatus("FAILED");

  };



  return (

    <div className="min-h-screen flex flex-col">

      <Header />

      <div className="flex flex-col items-center justify-center flex-1">

        {status === "VERIFYING" && (
          <>
            <Loader2 className="animate-spin w-16 h-16 mb-4"/>
            <h2 className="text-xl">Verifying Payment...</h2>
          </>
        )}

        {status === "SUCCESS" && (
          <>
            <CheckCircle className="text-green-500 w-20 h-20 mb-4"/>
            <h1 className="text-3xl font-bold text-green-600">
              Payment Successful
            </h1>
            <p>Redirecting to home page...</p>
          </>
        )}

        {status === "FAILED" && (
          <>
            <h1 className="text-3xl text-red-600">
              Payment Failed or Pending
            </h1>
          </>
        )}

      </div>

      <Footer />

    </div>

  );

};

export default PaymentSuccess;