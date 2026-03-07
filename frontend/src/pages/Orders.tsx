import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Package, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useOrders } from '@/contexts/OrderContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const statusConfig = {
    pending: { icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-50', label: 'Pending' },
    confirmed: { icon: CheckCircle, color: 'text-blue-500', bg: 'bg-blue-50', label: 'Confirmed' },
    preparing: { icon: Package, color: 'text-orange-500', bg: 'bg-orange-50', label: 'Preparing' },
    ready: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50', label: 'Ready' },
    delivered: { icon: Truck, color: 'text-green-600', bg: 'bg-green-50', label: 'Delivered' },
    cancelled: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-50', label: 'Cancelled' },
};

const Orders = () => {
    const { orders, isLoading } = useOrders();

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-[188px] md:pt-[200px] pb-16 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Back Button */}
                    <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Home
                    </Link>

                    {/* Page Header */}
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                            <ShoppingBag className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">My Orders</h1>
                            <p className="text-muted-foreground">Track and manage your orders</p>
                        </div>
                    </div>

                    {/* Orders List */}
                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                    ) : orders.length === 0 ? (
                        <Card className="shadow-lg">
                            <CardContent className="py-12 text-center">
                                <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
                                <p className="text-muted-foreground mb-6">
                                    You haven't placed any orders yet. Start exploring our menu!
                                </p>
                                <Link to="/#menu">
                                    <Button className="bg-primary hover:bg-primary/90">
                                        Browse Menu
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => {
                                const status = statusConfig[order.status];
                                const StatusIcon = status.icon;

                                return (
                                    <Card key={order.id} className="shadow-md hover:shadow-lg transition-shadow">
                                        <CardContent className="p-6">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                {/* Order Info */}
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3 className="font-bold text-lg">{order.id}</h3>
                                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status.bg} ${status.color} flex items-center gap-1`}>
                                                            <StatusIcon className="h-3 w-3" />
                                                            {status.label}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground mb-2">
                                                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        })}
                                                    </p>
                                                    <p className="text-sm">
                                                        {order.items.length} item{order.items.length > 1 ? 's' : ''} •
                                                        <span className="font-semibold text-primary ml-1">
                                                            ${order.totalAmount.toFixed(2)}
                                                        </span>
                                                    </p>
                                                </div>

                                                {/* Order Items Preview */}
                                                <div className="flex -space-x-2">
                                                    {order.items.slice(0, 3).map((item, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-muted"
                                                        >
                                                            <img
                                                                src={item.image}
                                                                alt={item.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                    ))}
                                                    {order.items.length > 3 && (
                                                        <div className="w-12 h-12 rounded-full border-2 border-white bg-muted flex items-center justify-center">
                                                            <span className="text-xs font-semibold">+{order.items.length - 3}</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Actions */}
                                                <div>
                                                    <Link to={`/orders/${order.id}`}>
                                                        <Button variant="outline" size="sm">
                                                            View Details
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>

                                            {/* Items Summary */}
                                            <div className="mt-4 pt-4 border-t">
                                                <p className="text-sm text-muted-foreground">
                                                    {order.items.map(item => `${item.quantity}x ${item.name}`).join(', ')}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Orders;
