import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PrivacyPolicy = () => {
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
                    <h1 className="text-4xl font-bold text-green-800 mb-4">Privacy Policy</h1>
                    <p className="text-sm text-gray-600 mb-8">Last updated: December 18, 2024</p>

                    <div className="prose prose-lg max-w-none space-y-8">
                        <section>
                            <p className="text-gray-700 leading-relaxed">
                                AsianBasket.ie operates this store and website, including all related information, content, features, tools, products and services,
                                in order to provide you, the customer, with a curated shopping experience (the "Services"). This Privacy Policy describes how we collect,
                                use, and disclose your personal information when you visit, use, or make a purchase or other transaction using the Services or otherwise
                                communicate with us.
                            </p>
                            <p className="text-gray-700 leading-relaxed mt-4">
                                Please read this Privacy Policy carefully. By using and accessing any of the Services, you acknowledge that you have read this Privacy Policy
                                and understand the collection, use, and disclosure of your information as described in this Privacy Policy.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-green-700 mb-4">Personal Information We Collect or Process</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                When we use the term "personal information," we are referring to information that identifies or can reasonably be linked to you or another person.
                                We may collect or process the following categories of personal information:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li><strong>Contact details</strong> including your name, address, billing address, shipping address, phone number, and email address.</li>
                                <li><strong>Financial information</strong> including credit card, debit card, and financial account numbers, payment card information, transaction details, and form of payment.</li>
                                <li><strong>Account information</strong> including your username, password, security questions, preferences and settings.</li>
                                <li><strong>Transaction information</strong> including the items you view, put in your cart, add to your wishlist, or purchase, return, exchange or cancel and your past transactions.</li>
                                <li><strong>Communications with us</strong> including the information you include in communications with us, for example, when sending a customer support inquiry.</li>
                                <li><strong>Device information</strong> including information about your device, browser, or network connection, your IP address, and other unique identifiers.</li>
                                <li><strong>Usage information</strong> including information regarding your interaction with the Services, including how and when you interact with or navigate the Services.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-green-700 mb-4">Personal Information Sources</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">We may collect personal information from the following sources:</p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li>Directly from you including when you create an account, visit or use the Services, communicate with us, or otherwise provide us with your personal information;</li>
                                <li>Automatically through the Services including from your device when you use our products or services or visit our websites, and through the use of cookies and similar technologies;</li>
                                <li>From our service providers including when we engage them to enable certain technology and when they collect or process your personal information on our behalf;</li>
                                <li>From our partners or other third parties.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-green-700 mb-4">How We Use Your Personal Information</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Depending on how you interact with us or which of the Services you use, we may use personal information for the following purposes:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li><strong>Provide, Tailor, and Improve the Services.</strong> We use your personal information to provide you with the Services, process your payments, fulfill your orders, and create a customized shopping experience for you.</li>
                                <li><strong>Marketing and Advertising.</strong> We use your personal information for marketing and promotional purposes, such as to send marketing communications and to show you online advertisements.</li>
                                <li><strong>Security and Fraud Prevention.</strong> We use your personal information to authenticate your account, detect fraudulent activity, and secure our services.</li>
                                <li><strong>Communicating with You.</strong> We use your personal information to provide you with customer support and maintain our business relationship with you.</li>
                                <li><strong>Legal Reasons.</strong> We use your personal information to comply with applicable law or respond to valid legal process.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-green-700 mb-4">How We Disclose Personal Information</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                In certain circumstances, we may disclose your personal information to third parties for legitimate purposes subject to this Privacy Policy. Such circumstances may include:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li>With vendors and other third parties who perform services on our behalf (e.g. IT management, payment processing, data analytics, customer support, cloud storage, fulfillment and shipping).</li>
                                <li>With business and marketing partners to provide marketing services and advertise to you.</li>
                                <li>When you direct, request us or otherwise consent to our disclosure of certain information to third parties.</li>
                                <li>With our affiliates or otherwise within our corporate group.</li>
                                <li>In connection with a business transaction such as a merger or bankruptcy, to comply with any applicable legal obligations, to enforce any applicable terms of service or policies, and to protect or defend the Services, our rights, and the rights of our users or others.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-green-700 mb-4">Security and Retention of Your Information</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Please be aware that no security measures are perfect or impenetrable, and we cannot guarantee "perfect security."
                                In addition, any information you send to us may not be secure while in transit. We recommend that you do not use unsecure channels
                                to communicate sensitive or confidential information to us.
                            </p>
                            <p className="text-gray-700 leading-relaxed mt-4">
                                How long we retain your personal information depends on different factors, such as whether we need the information to maintain your account,
                                to provide you with Services, comply with legal obligations, resolve disputes or enforce other applicable contracts and policies.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-green-700 mb-4">Your Rights and Choices</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Depending on where you live, you may have some or all of the rights listed below in relation to your personal information:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li><strong>Right to Access / Know.</strong> You may have a right to request access to personal information that we hold about you.</li>
                                <li><strong>Right to Delete.</strong> You may have a right to request that we delete personal information we maintain about you.</li>
                                <li><strong>Right to Correct.</strong> You may have a right to request that we correct inaccurate personal information we maintain about you.</li>
                                <li><strong>Right of Portability.</strong> You may have a right to receive a copy of the personal information we hold about you and to request that we transfer it to a third party.</li>
                                <li><strong>Managing Communication Preferences.</strong> We may send you promotional emails, and you may opt out of receiving these at any time by using the unsubscribe option displayed in our emails to you.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-green-700 mb-4">Children's Data</h2>
                            <p className="text-gray-700 leading-relaxed">
                                The Services are not intended to be used by children, and we do not knowingly collect any personal information about children under the age of majority
                                in your jurisdiction. If you are the parent or guardian of a child who has provided us with their personal information, you may contact us using the
                                contact details set out below to request that it be deleted.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-green-700 mb-4">International Transfers</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Please note that we may transfer, store and process your personal information outside the country you live in.
                                If we transfer your personal information out of the European Economic Area or the United Kingdom, we will rely on recognized transfer mechanisms
                                like the European Commission's Standard Contractual Clauses.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-green-700 mb-4">Changes to This Privacy Policy</h2>
                            <p className="text-gray-700 leading-relaxed">
                                We may update this Privacy Policy from time to time, including to reflect changes to our practices or for other operational, legal, or regulatory reasons.
                                We will post the revised Privacy Policy on this website and update the "Last updated" date.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-green-700 mb-4">Contact</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Should you have any questions about our privacy practices or this Privacy Policy, or if you would like to exercise any of the rights available to you,
                                please email us at{" "}
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

export default PrivacyPolicy;
