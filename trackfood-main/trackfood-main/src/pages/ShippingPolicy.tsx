import { ArrowLeft, Gift, Truck, Package, Snowflake, Scale, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ShippingPolicy = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
            <div className="container mx-auto px-4 py-8 max-w-5xl">
                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                    className="mb-6 hover:bg-green-100"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Hero Section */}
                    <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-12 text-center">
                        <Truck className="h-16 w-16 mx-auto mb-4" />
                        <h1 className="text-5xl font-bold mb-4">Shipping & Delivery Policy</h1>
                        <p className="text-xl text-green-100 max-w-3xl mx-auto">
                            Everything you need to know about our delivery services and charges
                        </p>
                    </div>

                    <div className="p-8 md:p-12 space-y-12">
                        {/* Order Value Offers */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-green-100 p-3 rounded-lg">
                                    <Gift className="h-8 w-8 text-green-600" />
                                </div>
                                <h2 className="text-3xl font-bold text-green-800">Order Value Offers</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200">
                                    <div className="text-4xl font-bold text-green-700 mb-2">€5 Voucher</div>
                                    <p className="text-lg text-gray-700 mb-2">For every <span className="font-bold text-green-700">€50</span> order</p>
                                    <p className="text-sm text-gray-600">Save on your next purchase!</p>
                                </div>

                                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200">
                                    <div className="text-4xl font-bold text-green-700 mb-2">€10 Voucher</div>
                                    <p className="text-lg text-gray-700 mb-2">For every <span className="font-bold text-green-700">€100</span> order</p>
                                    <p className="text-sm text-gray-600">Even bigger savings!</p>
                                </div>
                            </div>

                            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                                <div className="flex gap-3">
                                    <div className="text-blue-600 mt-0.5">ℹ️</div>
                                    <div>
                                        <p className="font-semibold text-blue-900 mb-1">Voucher Terms:</p>
                                        <ul className="text-sm text-blue-800 space-y-1">
                                            <li>⏳ Valid for <strong>30 days</strong> from the date of issue</li>
                                            <li>✅ Redeemable on your <strong>next order only</strong></li>
                                            <li>🎁 Automatically added to your account after order completion</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Free Delivery */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-green-100 p-3 rounded-lg">
                                    <MapPin className="h-8 w-8 text-green-600" />
                                </div>
                                <h2 className="text-3xl font-bold text-green-800">Free Delivery in Dublin</h2>
                            </div>

                            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-8 rounded-xl text-center mb-6">
                                <p className="text-2xl font-bold mb-2">🚚 FREE Delivery within Dublin</p>
                                <p className="text-lg">For orders <span className="text-3xl font-bold">€39.99+</span></p>
                            </div>
                        </section>

                        {/* Delivery Charges & Weight Policies */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-green-100 p-3 rounded-lg">
                                    <Package className="h-8 w-8 text-green-600" />
                                </div>
                                <h2 className="text-3xl font-bold text-green-800">Delivery Charges & Weight Policies</h2>
                            </div>

                            <div className="space-y-4">
                                {/* Rice & Atta Only Orders */}
                                <div className="border border-green-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                                    <h3 className="text-xl font-semibold text-green-700 mb-3 flex items-center gap-2">
                                        <Package className="h-5 w-5" />
                                        Rice & Atta Only Orders
                                    </h3>
                                    <p className="text-gray-700">
                                        Orders containing <strong>only rice and/or atta</strong> will incur a <span className="text-green-700 font-bold">€3 delivery fee</span>.
                                    </p>
                                </div>

                                {/* Atta Weight Charge */}
                                <div className="border border-green-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                                    <h3 className="text-xl font-semibold text-green-700 mb-3 flex items-center gap-2">
                                        <Scale className="h-5 w-5" />
                                        20kg Atta Handling Fee
                                    </h3>
                                    <p className="text-gray-700">
                                        A <span className="text-green-700 font-bold">€1 handling fee</span> will be added automatically for 20kg atta packs due to heavy weight.
                                    </p>
                                </div>

                                {/* Outside Dublin Delivery */}
                                <div className="border border-green-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                                    <h3 className="text-xl font-semibold text-green-700 mb-3 flex items-center gap-2">
                                        <Truck className="h-5 w-5" />
                                        Outside Dublin Delivery
                                    </h3>
                                    <p className="text-gray-700">
                                        Orders delivered <strong>outside Dublin</strong> will incur a <span className="text-green-700 font-bold">€6.99 delivery charge</span>.
                                    </p>
                                </div>

                                {/* Weight Limit Policy */}
                                <div className="border border-orange-200 bg-orange-50 rounded-lg p-5">
                                    <h3 className="text-xl font-semibold text-orange-700 mb-3 flex items-center gap-2">
                                        <Scale className="h-5 w-5" />
                                        Weight Limit Policy
                                    </h3>
                                    <div className="space-y-2 text-gray-700">
                                        <p>• Maximum allowed weight per box is <strong>28kg</strong></p>
                                        <p>• If the total order weight exceeds 28kg, an <span className="text-orange-700 font-bold">additional €6.99 charge</span> will apply for extra packaging</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Frozen Items Policy */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-blue-100 p-3 rounded-lg">
                                    <Snowflake className="h-8 w-8 text-blue-600" />
                                </div>
                                <h2 className="text-3xl font-bold text-green-800">Frozen Items – Outside Dublin</h2>
                            </div>

                            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                                <div className="flex items-start gap-4">
                                    <Snowflake className="h-12 w-12 text-blue-600 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-xl font-semibold text-blue-900 mb-3">Next-Day Delivery for Frozen Items</h3>
                                        <p className="text-gray-700 mb-4">
                                            For orders delivered <strong>outside Dublin</strong> containing frozen items, you will receive an alert stating:
                                        </p>
                                        <div className="bg-white border-l-4 border-blue-500 p-4 rounded mb-4">
                                            <p className="text-blue-900 font-medium italic">
                                                "Frozen items will be delivered the next day."
                                            </p>
                                        </div>
                                        <p className="text-gray-700">
                                            You can choose to <strong>proceed with your order</strong> or <strong>modify it</strong> before checkout.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Summary Table */}
                        <section className="bg-gray-50 p-6 rounded-xl">
                            <h3 className="text-2xl font-bold text-green-800 mb-4">Quick Reference</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b-2 border-green-600">
                                            <th className="py-3 px-4 font-semibold text-green-700">Service</th>
                                            <th className="py-3 px-4 font-semibold text-green-700">Charge</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        <tr>
                                            <td className="py-3 px-4">Free Delivery (Dublin, €39.99+)</td>
                                            <td className="py-3 px-4 font-bold text-green-600">FREE</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 px-4">Rice & Atta Only Orders</td>
                                            <td className="py-3 px-4 font-bold">€3.00</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 px-4">20kg Atta Handling Fee</td>
                                            <td className="py-3 px-4 font-bold">€1.00</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 px-4">Outside Dublin Delivery</td>
                                            <td className="py-3 px-4 font-bold">€6.99</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 px-4">Extra Packaging (over 28kg)</td>
                                            <td className="py-3 px-4 font-bold">€6.99</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* Contact CTA */}
                        <div className="bg-gradient-to-r from-green-50 to-green-100 p-8 rounded-lg text-center">
                            <p className="text-lg text-gray-700 mb-4">Have questions about delivery?</p>
                            <Button
                                onClick={() => navigate('/contact')}
                                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
                            >
                                Contact Us
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShippingPolicy;
