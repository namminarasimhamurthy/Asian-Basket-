import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, ShoppingBag, ArrowRight, Ticket, Gift, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useOrders } from '@/contexts/OrderContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('orderId');
    const voucherCode = searchParams.get('voucher');
    const voucherAmount = searchParams.get('voucherAmount');
    const { getOrderById } = useOrders();
    const [order, setOrder] = useState<ReturnType<typeof getOrderById>>(undefined);

    useEffect(() => {
        if (orderId) {
            setOrder(getOrderById(orderId));
        }
    }, [orderId, getOrderById]);

    // Calculate voucher expiry (30 days from now)
    const voucherExpiry = new Date();
    voucherExpiry.setDate(voucherExpiry.getDate() + 30);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-background to-blue-50">
            <Header />

            <main className="pt-[188px] md:pt-[200px] pb-16 px-4">
                <div className="max-w-2xl mx-auto text-center">
                    {/* Success Animation */}
                    <div className="mb-8">
                        <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center animate-bounce">
                            <CheckCircle className="h-14 w-14 text-green-600" />
                        </div>
                    </div>

                    {/* Success Message */}
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-green-600">
                        Payment Successful!
                    </h1>
                    <p className="text-lg text-muted-foreground mb-8">
                        Thank you for your order. Your groceries are being prepared!
                    </p>

                    {/* Voucher Earned Card */}
                    {voucherCode && voucherAmount && (
                        <Card className="shadow-xl mb-8 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-center gap-3 mb-4">
                                    <div className="p-3 bg-amber-100 rounded-full">
                                        <Gift className="h-6 w-6 text-amber-600" />
                                    </div>
                                    <h2 className="text-xl font-bold text-amber-800">
                                        🎉 You've Earned a Voucher!
                                    </h2>
                                </div>

                                <div className="bg-white rounded-xl p-4 shadow-inner border-2 border-dashed border-amber-300 mb-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Ticket className="h-5 w-5 text-amber-600" />
                                            <span className="font-mono text-lg font-bold text-amber-800">
                                                {voucherCode}
                                            </span>
                                        </div>
                                        <span className="text-2xl font-bold text-green-600">
                                            €{parseFloat(voucherAmount).toFixed(2)} OFF
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center gap-2 text-sm text-amber-700">
                                    <Calendar className="h-4 w-4" />
                                    <span>
                                        Valid until {voucherExpiry.toLocaleDateString('en-IE', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </span>
                                </div>

                                <p className="text-xs text-amber-600 mt-3">
                                    Use this code on your next order to get €{voucherAmount} off!
                                </p>
                            </CardContent>
                        </Card>
                    )}

                    {/* Order Details Card */}
                    {order && (
                        <Card className="shadow-xl mb-8 text-left">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-6 pb-4 border-b">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Order ID</p>
                                        <p className="font-bold text-lg">{order.id}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-muted-foreground">Total Amount</p>
                                        <p className="font-bold text-lg text-primary">€{order.totalAmount.toFixed(2)}</p>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="mb-6">
                                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                                        <ShoppingBag className="h-4 w-4" />
                                        Order Items
                                    </h3>
                                    <div className="space-y-3">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium text-sm">{item.name}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        Qty: {item.quantity} × €{item.price.toFixed(2)}
                                                    </p>
                                                </div>
                                                <p className="font-semibold text-sm">
                                                    €{(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Delivery Address */}
                                <div className="bg-muted/50 rounded-lg p-4">
                                    <h3 className="font-semibold mb-2 text-sm">Delivery Address</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {order.deliveryAddress.name}<br />
                                        {order.deliveryAddress.street}<br />
                                        {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}
                                    </p>
                                </div>

                                {/* Payment Info */}
                                <div className="mt-4 flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Payment ID</span>
                                    <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                                        {order.paymentId}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/orders">
                            <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90">
                                View Order Details
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                        <Link to="/#menu">
                            <Button variant="outline" className="w-full sm:w-auto">
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>

                    {/* Estimated Time */}
                    <div className="mt-12 p-6 bg-white rounded-2xl shadow-md">
                        <p className="text-muted-foreground mb-2">Estimated Delivery Time</p>
                        <p className="text-4xl font-bold text-primary">1-2 Days</p>
                        <p className="text-sm text-muted-foreground mt-2">
                            We'll notify you when your order is on its way!
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PaymentSuccess;
