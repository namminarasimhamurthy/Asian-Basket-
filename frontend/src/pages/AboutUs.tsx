import { ArrowLeft, ShoppingBag, Globe, Heart, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AboutUs = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
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
                        <h1 className="text-5xl font-bold mb-4">About AsianBasket.ie</h1>
                        <p className="text-xl text-green-100 max-w-3xl mx-auto">
                            Your trusted destination for authentic Asian groceries delivered across Ireland
                        </p>
                    </div>

                    <div className="p-8 md:p-12">
                        {/* Mission Section */}
                        <section className="mb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <ShoppingBag className="h-8 w-8 text-green-600" />
                                <h2 className="text-3xl font-bold text-green-800">Our Mission</h2>
                            </div>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                We started AsianBasket.ie with a simple mission: to make Asian cooking accessible, affordable, and authentic for everyone in Ireland.
                                Whether you're craving the flavors of India, Sri Lanka, China, Thailand, Korea, Japan, or Southeast Asia, we bring the best of Asian
                                kitchens straight to your doorstep.
                            </p>
                        </section>

                        {/* Our Story Section */}
                        <section className="mb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <Heart className="h-8 w-8 text-green-600" />
                                <h2 className="text-3xl font-bold text-green-800">Our Story</h2>
                            </div>
                            <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                Living away from home often means missing familiar tastes and ingredients. We experienced this firsthand and realized how challenging
                                it could be to find genuine Asian products in one place.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                AsianBasket.ie was born to bridge that gap—connecting communities with the foods they love and introducing new customers to the rich
                                diversity of Asian cuisine.
                            </p>
                        </section>

                        {/* What We Offer */}
                        <section className="mb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <Globe className="h-8 w-8 text-green-600" />
                                <h2 className="text-3xl font-bold text-green-800">What We Offer</h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-green-50 p-6 rounded-lg">
                                    <h3 className="text-xl font-semibold text-green-700 mb-3">Authentic Products</h3>
                                    <p className="text-gray-700">
                                        From aromatic spices and premium rice to traditional snacks and specialty ingredients, we source authentic products
                                        from trusted suppliers across Asia.
                                    </p>
                                </div>
                                <div className="bg-green-50 p-6 rounded-lg">
                                    <h3 className="text-xl font-semibold text-green-700 mb-3">Nationwide Delivery</h3>
                                    <p className="text-gray-700">
                                        We deliver across Ireland, ensuring that no matter where you are, you can enjoy the authentic taste of home.
                                    </p>
                                </div>
                                <div className="bg-green-50 p-6 rounded-lg">
                                    <h3 className="text-xl font-semibold text-green-700 mb-3">Affordable Prices</h3>
                                    <p className="text-gray-700">
                                        Quality doesn't have to be expensive. We offer competitive prices to make Asian groceries accessible to everyone.
                                    </p>
                                </div>
                                <div className="bg-green-50 p-6 rounded-lg">
                                    <h3 className="text-xl font-semibold text-green-700 mb-3">Fresh & Quality</h3>
                                    <p className="text-gray-700">
                                        We carefully select and store our products to ensure you receive the freshest, highest quality items every time.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Community Section */}
                        <section className="bg-gradient-to-r from-green-50 to-green-100 p-8 rounded-lg">
                            <div className="flex items-center gap-3 mb-6">
                                <Users className="h-8 w-8 text-green-600" />
                                <h2 className="text-3xl font-bold text-green-800">Join Our Community</h2>
                            </div>
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                AsianBasket.ie is more than just a grocery store—it's a community. We're here to celebrate the diversity of Asian cultures,
                                share recipes, and help you recreate the flavors you love.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Thank you for choosing AsianBasket.ie. We look forward to serving you and bringing the taste of Asia to your table!
                            </p>
                        </section>

                        {/* Contact CTA */}
                        <div className="mt-12 text-center">
                            <p className="text-lg text-gray-700 mb-4">Have questions or feedback?</p>
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

export default AboutUs;
