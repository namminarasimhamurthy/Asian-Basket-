import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Package, MapPin, CreditCard, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useOrders } from '@/contexts/OrderContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const statusConfig = {
    pending: { icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-100', label: 'Pending' },
    confirmed: { icon: CheckCircle, color: 'text-blue-500', bg: 'bg-blue-100', label: 'Confirmed' },
    preparing: { icon: Package, color: 'text-orange-500', bg: 'bg-orange-100', label: 'Preparing' },
    ready: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-100', label: 'Ready for Pickup' },
    delivered: { icon: Truck, color: 'text-green-600', bg: 'bg-green-100', label: 'Delivered' },
    cancelled: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-100', label: 'Cancelled' },
};

const OrderDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { getOrderById } = useOrders();

    const order = id ? getOrderById(id) : undefined;

    if (!order) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <main className="pt-[188px] md:pt-[200px] pb-16 px-4">
                    <div className="max-w-2xl mx-auto text-center py-12">
                        <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                        <h1 className="text-2xl font-bold mb-2">Order Not Found</h1>
                        <p className="text-muted-foreground mb-6">
                            The order you're looking for doesn't exist or has been removed.
                        </p>
                        <Link to="/orders">
                            <Button>View All Orders</Button>
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const status = statusConfig[order.status];
    const StatusIcon = status.icon;

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-[188px] md:pt-[200px] pb-16 px-4">
                <div className="max-w-3xl mx-auto">
                    {/* Back Button */}
                    <Link to="/orders" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Orders
                    </Link>

                    {/* Order Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-2xl font-bold">{order.id}</h1>
                            <p className="text-muted-foreground">
                                Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </p>
                        </div>
                        <div className={`px-4 py-2 rounded-full ${status.bg} ${status.color} flex items-center gap-2 font-semibold`}>
                            <StatusIcon className="h-5 w-5" />
                            {status.label}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Order Items */}
                        <div className="md:col-span-2">
                            <Card className="shadow-lg">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Package className="h-5 w-5" />
                                        Order Items
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-4 pb-4 border-b last:border-0 last:pb-0">
                                                <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-semibold">{item.name}</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-primary">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Order Notes */}
                                    {order.orderNotes && (
                                        <div className="mt-6 pt-4 border-t">
                                            <h4 className="font-semibold mb-2">Order Notes</h4>
                                            <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                                                {order.orderNotes}
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Order Summary */}
                        <div className="space-y-6">
                            {/* Payment Info */}
                            <Card className="shadow-lg">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <CreditCard className="h-5 w-5" />
                                        Payment
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Status</span>
                                            <span className={`font-semibold ${order.paymentStatus === 'paid' ? 'text-green-600' :
                                                order.paymentStatus === 'failed' ? 'text-red-600' : 'text-yellow-600'
                                                }`}>
                                                {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                                            </span>
                                        </div>
                                        {order.paymentId && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Payment ID</span>
                                                <span className="font-mono text-xs">{order.paymentId}</span>
                                            </div>
                                        )}
                                        <div className="pt-3 mt-3 border-t">
                                            <div className="flex justify-between">
                                                <span className="font-semibold">Total</span>
                                                <span className="font-bold text-lg text-primary">
                                                    ${order.totalAmount.toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Delivery Address */}
                            <Card className="shadow-lg">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <MapPin className="h-5 w-5" />
                                        Delivery Address
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-sm space-y-1">
                                        <p className="font-semibold">{order.deliveryAddress.name}</p>
                                        <p className="text-muted-foreground">{order.deliveryAddress.phone}</p>
                                        <p className="text-muted-foreground">{order.deliveryAddress.street}</p>
                                        <p className="text-muted-foreground">
                                            {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Actions */}
                            <div className="space-y-2">
                                <Link to="/#menu" className="block">
                                    <Button className="w-full bg-primary hover:bg-primary/90">
                                        Order Again
                                    </Button>
                                </Link>
                                <Link to="/orders" className="block">
                                    <Button variant="outline" className="w-full">
                                        Back to Orders
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default OrderDetails;
