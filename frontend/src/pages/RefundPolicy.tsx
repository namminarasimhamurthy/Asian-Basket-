import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const RefundPolicy = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                    className="mb-6 hover:bg-green-100"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>

                <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
                    <h1 className="text-4xl font-bold text-green-800 mb-6">Refund Policy</h1>

                    <div className="prose prose-lg max-w-none">
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-green-700 mb-4">Refunds</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We will notify you once we've received and inspected your return, and let you know if the refund was approved or not.
                                If approved, you'll be automatically refunded on your original payment method within 10 business days.
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Please remember it can take some time for your bank or credit card company to process and post the refund too.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                If more than 15 business days have passed since we've approved your return, please contact us at{" "}
                                <a
                                    href="mailto:support@asianbasket.ie"
                                    className="text-green-600 hover:text-green-700 font-medium underline"
                                >
                                    support@asianbasket.ie
                                </a>
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-green-700 mb-4">Return Process</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                To initiate a return, please contact our customer service team with your order details.
                                We'll guide you through the return process and provide you with the necessary instructions.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-green-700 mb-4">Contact Us</h2>
                            <p className="text-gray-700 leading-relaxed">
                                For any questions regarding refunds or returns, please reach out to us at{" "}
                                <a
                                    href="mailto:support@asianbasket.ie"
                                    className="text-green-600 hover:text-green-700 font-medium underline"
                                >
                                    support@asianbasket.ie
                                </a>
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RefundPolicy;
