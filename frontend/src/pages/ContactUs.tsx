import { ArrowLeft, Mail, Phone, MapPin, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ContactUs = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        name: "",
        orderId: "",
        query: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form
        if (!formData.name || !formData.query) {
            toast({
                title: "Missing Information",
                description: "Please fill in your name and query.",
                variant: "destructive"
            });
            return;
        }

        if (formData.query.length > 500) {
            toast({
                title: "Query Too Long",
                description: "Please limit your query to 500 characters.",
                variant: "destructive"
            });
            return;
        }

        setIsSubmitting(true);

        // Simulate form submission (replace with actual API call)
        try {
            // Here you would typically send the data to your backend
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast({
                title: "Message Sent!",
                description: "We'll get back to you as soon as possible.",
            });

            // Reset form
            setFormData({
                name: "",
                orderId: "",
                query: ""
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to send message. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

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
                        <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
                        <p className="text-xl text-green-100 max-w-3xl mx-auto">
                            We're here to help! Reach out to us with any questions or concerns.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
                        {/* Contact Information */}
                        <div>
                            <h2 className="text-3xl font-bold text-green-800 mb-6">Get in Touch</h2>
                            <p className="text-gray-700 mb-8 leading-relaxed">
                                If you have any questions regarding your order, delivery, products, or payments, feel free to reach out to us.
                                Our support team will get back to you as soon as possible.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-green-100 p-3 rounded-lg">
                                        <Mail className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                                        <a
                                            href="mailto:support@asianbasket.ie"
                                            className="text-green-600 hover:text-green-700 hover:underline"
                                        >
                                            support@asianbasket.ie
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-green-100 p-3 rounded-lg">
                                        <Phone className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                                        <p className="text-gray-700">Available Monday - Saturday, 9AM - 6PM</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-green-100 p-3 rounded-lg">
                                        <MapPin className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                                        <p className="text-gray-700">Serving all of Ireland</p>
                                    </div>
                                </div>
                            </div>

                            {/* FAQ Section */}
                            <div className="mt-8 bg-green-50 p-6 rounded-lg">
                                <h3 className="font-semibold text-green-800 mb-3">Quick Tips</h3>
                                <ul className="space-y-2 text-sm text-gray-700">
                                    <li>• Include your Order ID for faster assistance</li>
                                    <li>• Check our FAQ section for common questions</li>
                                    <li>• Allow 24-48 hours for email responses</li>
                                </ul>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div>
                            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-lg border border-green-100">
                                <h2 className="text-2xl font-bold text-green-800 mb-6">Send Us a Message</h2>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <Label htmlFor="name" className="text-gray-700 font-medium">
                                            Name <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="Your full name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="mt-2 border-green-200 focus:border-green-500 focus:ring-green-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="orderId" className="text-gray-700 font-medium">
                                            Order ID <span className="text-gray-400 text-sm">(Optional)</span>
                                        </Label>
                                        <Input
                                            id="orderId"
                                            name="orderId"
                                            type="text"
                                            placeholder="e.g., ORD-12345"
                                            value={formData.orderId}
                                            onChange={handleChange}
                                            className="mt-2 border-green-200 focus:border-green-500 focus:ring-green-500"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="query" className="text-gray-700 font-medium">
                                            Your Query <span className="text-red-500">*</span>
                                        </Label>
                                        <Textarea
                                            id="query"
                                            name="query"
                                            placeholder="Please describe your question or concern..."
                                            value={formData.query}
                                            onChange={handleChange}
                                            className="mt-2 min-h-[150px] border-green-200 focus:border-green-500 focus:ring-green-500"
                                            maxLength={500}
                                            required
                                        />
                                        <p className="text-sm text-gray-500 mt-2">
                                            {formData.query.length}/500 characters
                                        </p>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-semibold"
                                    >
                                        {isSubmitting ? (
                                            "Sending..."
                                        ) : (
                                            <>
                                                <Send className="mr-2 h-5 w-5" />
                                                Send Message
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="bg-green-50 p-8 text-center">
                        <p className="text-gray-700">
                            For urgent matters, please email us directly at{" "}
                            <a
                                href="mailto:support@asianbasket.ie"
                                className="text-green-600 hover:text-green-700 font-semibold underline"
                            >
                                support@asianbasket.ie
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
