// import { useEffect, useState } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import api from "@/lib/axios";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { Loader2, CheckCircle } from "lucide-react";

// const PaymentSuccess = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   const orderId = searchParams.get("order_id");

//   const [status, setStatus] = useState("VERIFYING");

//   useEffect(() => {
//     if (!orderId) return;

//     verifyWithRetry();
//   }, [orderId]);

//   const verifyWithRetry = async () => {
//     let attempts = 0;

//     while (attempts < 5) {
//       try {
//         const res = await api.post("auth/payment/verify/", {
//           order_id: orderId,
//         });

//         console.log("VERIFY RESPONSE:", res.data);

//         if (res.data.payment_status === "PAID") {
//           setStatus("SUCCESS");

//           setTimeout(() => {
//             navigate("/");
//           }, 3000);

//           return;
//         }
//       } catch (err) {
//         console.error(err);
//       }

//       attempts++;

//       await new Promise((resolve) => setTimeout(resolve, 2000));
//     }

//     setStatus("FAILED");
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />

//       <div className="flex flex-col items-center justify-center flex-1">
//         {status === "VERIFYING" && (
//           <>
//             <Loader2 className="animate-spin w-16 h-16 mb-4" />
//             <h2 className="text-xl">Verifying Payment...</h2>
//           </>
//         )}

//         {status === "SUCCESS" && (
//           <>
//             <CheckCircle className="text-green-500 w-20 h-20 mb-4" />
//             <h1 className="text-3xl font-bold text-green-600">
//               Payment Successful
//             </h1>
//             <p>Redirecting to home page...</p>
//           </>
//         )}

//         {status === "FAILED" && (
//           <>
//             <h1 className="text-3xl text-red-600">Payment Failed or Pending</h1>
//           </>
//         )}
//       </div>

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
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

type PaymentStatus = "VERIFYING" | "SUCCESS" | "FAILED";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const orderId = searchParams.get("order_id");
  const [status, setStatus] = useState<PaymentStatus>("VERIFYING");

  useEffect(() => {
    if (!orderId) {
      setStatus("FAILED");
      return;
    }

    let isCancelled = false;

    const verifyWithRetry = async () => {
      let attempts = 0;

      while (attempts < 5 && !isCancelled) {
        try {
          const res = await api.post("auth/payment/verify/", {
            order_id: orderId,
          });

          console.log("VERIFY RESPONSE:", res.data);

          if (res.data.payment_status === "PAID") {
            if (isCancelled) return;
            clearCart();
            setStatus("SUCCESS");
            return;
          }
        } catch (err) {
          console.error("Verify error:", err);
        }

        attempts++;
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      if (!isCancelled) {
        setStatus("FAILED");
      }
    };

    verifyWithRetry();

    return () => {
      isCancelled = true;
    };
  }, [orderId, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex flex-col items-center justify-center flex-1 px-4">
        {status === "VERIFYING" && (
          <>
            <Loader2 className="animate-spin w-16 h-16 mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              Verifying your payment...
            </h2>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              This may take a few seconds. Please do not close this window.
            </p>
          </>
        )}

        {status === "SUCCESS" && (
          <>
            <CheckCircle className="text-green-500 w-20 h-20 mb-4" />
            <h1 className="text-3xl font-bold text-green-600 mb-2">
              Payment Successful
            </h1>
            <p className="text-sm text-muted-foreground mb-4">
              Order ID: {orderId}
            </p>
            <Button onClick={() => navigate("/")}>Back to home</Button>
          </>
        )}

        {status === "FAILED" && (
          <>
            <h1 className="text-3xl font-bold text-red-600 mb-2">
              Payment Failed or Pending
            </h1>
            <p className="text-sm text-muted-foreground mb-4 text-center max-w-md">
              We could not verify your payment automatically. If money has been
              deducted from your account, please contact support with your order
              ID.
            </p>
            <Button variant="outline" onClick={() => navigate("/")}>
              Back to home
            </Button>
            {!orderId && (
              <p className="text-xs text-muted-foreground mt-2">
                Missing order ID in URL.
              </p>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default PaymentSuccess;
