import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-black">
            <Header />
            <main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="text-5xl font-bold text-white mb-4">Privacy Policy</h1>
                </div>
                
                <div className="prose prose-lg prose-invert max-w-none">
                    <section className="mb-12 bg-gray-900 rounded-lg p-8 shadow-lg">
                        <h2 className="text-3xl font-semibold text-emerald-500 mb-6 border-b border-emerald-700 pb-2">1. Information We Collect</h2>
                        <p className="text-gray-300 mb-4">At MP Jungle Safari, we value your privacy and are committed to protecting your personal data. We collect information that you provide directly to us, including:</p>
                        <ul className="list-disc pl-6 text-gray-300 space-y-2">
                            <li><span className="text-emerald-400 font-medium">Personal Information:</span> Name, email address, phone number, and postal address</li>
                            <li><span className="text-emerald-400 font-medium">Booking Details:</span> Safari preferences, dates, group size, and special requirements</li>
                            <li><span className="text-emerald-400 font-medium">Payment Information:</span> Credit card details, billing address, and transaction records</li>
                            <li><span className="text-emerald-400 font-medium">Account Information:</span> Login credentials and profile settings</li>
                            <li><span className="text-emerald-400 font-medium">Communication Data:</span> Your preferences and interactions with our emails and notifications</li>
                        </ul>
                    </section>

                    <section className="mb-12 bg-gray-900 rounded-lg p-8 shadow-lg">
                        <h2 className="text-3xl font-semibold text-emerald-500 mb-6 border-b border-emerald-700 pb-2">2. How We Use Your Information</h2>
                        <p className="text-gray-300 mb-4">We use the information we collect for various purposes, including:</p>
                        <ul className="list-disc pl-6 text-gray-300 space-y-2">
                            <li><span className="text-emerald-400 font-medium">Booking Management:</span> Processing your reservations, sending confirmation emails, and providing updates about your safari experience</li>
                            <li><span className="text-emerald-400 font-medium">Customer Service:</span> Responding to your inquiries, resolving issues, and improving our support systems</li>
                            <li><span className="text-emerald-400 font-medium">Service Improvement:</span> Analyzing usage patterns to enhance our website functionality and safari offerings</li>
                            <li><span className="text-emerald-400 font-medium">Marketing:</span> Sending relevant promotions and newsletters (only with your consent)</li>
                            <li><span className="text-emerald-400 font-medium">Legal Compliance:</span> Meeting our regulatory obligations and protecting our legal interests</li>
                        </ul>
                    </section>

                    <section className="mb-12 bg-gray-900 rounded-lg p-8 shadow-lg">
                        <h2 className="text-3xl font-semibold text-emerald-500 mb-6 border-b border-emerald-700 pb-2">3. Information Sharing</h2>
                        <p className="text-gray-300 mb-4">We may share your information with:</p>
                        <ul className="list-disc pl-6 text-gray-300 space-y-2">
                            <li><span className="text-emerald-400 font-medium">Service Providers:</span> Third parties who help us operate our business (payment processors, cloud services, etc.)</li>
                            <li><span className="text-emerald-400 font-medium">Safari Partners:</span> Local guides and accommodation providers necessary for fulfilling your booking</li>
                            <li><span className="text-emerald-400 font-medium">Legal Authorities:</span> When required by law or to protect our rights and safety</li>
                        </ul>
                        <p className="text-gray-300 mt-4">We will never sell your personal information to third parties for marketing purposes.</p>
                    </section>

                    <section className="mb-12 bg-gray-900 rounded-lg p-8 shadow-lg">
                        <h2 className="text-3xl font-semibold text-emerald-500 mb-6 border-b border-emerald-700 pb-2">4. Information Security</h2>
                        <p className="text-gray-300 mb-4">We implement robust security measures to protect your personal information, including:</p>
                        <ul className="list-disc pl-6 text-gray-300 space-y-2">
                            <li>Industry-standard encryption for all data transmission</li>
                            <li>Secure payment processing systems</li>
                            <li>Regular security audits and updates</li>
                            <li>Strict access controls for employee data access</li>
                            <li>Comprehensive data breach response protocols</li>
                        </ul>
                        <p className="text-gray-300 mt-4">While we strive to protect your personal information, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.</p>
                    </section>

                    <section className="mb-12 bg-gray-900 rounded-lg p-8 shadow-lg">
                        <h2 className="text-3xl font-semibold text-emerald-500 mb-6 border-b border-emerald-700 pb-2">5. Your Privacy Rights</h2>
                        <p className="text-gray-300 mb-4">Depending on your location, you may have the right to:</p>
                        <ul className="list-disc pl-6 text-gray-300 space-y-2">
                            <li>Access the personal information we hold about you</li>
                            <li>Correct inaccurate or incomplete information</li>
                            <li>Request deletion of your personal data</li>
                            <li>Restrict or object to certain processing activities</li>
                            <li>Request transfer of your data in a portable format</li>
                            <li>Withdraw consent for optional processing activities</li>
                        </ul>
                        <p className="text-gray-300 mt-4">To exercise any of these rights, please contact our Privacy Team using the details below.</p>
                    </section>

                    <section className="mb-12 bg-gray-900 rounded-lg p-8 shadow-lg">
                        <h2 className="text-3xl font-semibold text-emerald-500 mb-6 border-b border-emerald-700 pb-2">6. Cookies and Tracking</h2>
                        <p className="text-gray-300 mb-4">Our website uses cookies and similar technologies to enhance your browsing experience. These tools help us:</p>
                        <ul className="list-disc pl-6 text-gray-300 space-y-2">
                            <li>Remember your preferences and settings</li>
                            <li>Understand how you interact with our website</li>
                            <li>Improve site performance and functionality</li>
                            <li>Deliver relevant content and advertisements</li>
                        </ul>
                        <p className="text-gray-300 mt-4">You can manage your cookie preferences through your browser settings. However, disabling certain cookies may limit your ability to use some features of our website.</p>
                    </section>

                    <section className="mb-12 bg-gray-900 rounded-lg p-8 shadow-lg">
                        <h2 className="text-3xl font-semibold text-emerald-500 mb-6 border-b border-emerald-700 pb-2">7. Contact Us</h2>
                        <p className="text-gray-300 mb-4">If you have any questions about our Privacy Policy or how we handle your personal information, please don't hesitate to contact us:</p>
                        <div className="bg-black bg-opacity-50 p-6 rounded-md mt-6">
                            <p className="text-emerald-400 font-medium">MP Jungle Safari Privacy Team</p>
                            <p className="text-gray-300">Email: <a href="mailto:privacy@mpjunglesafari.com" className="text-emerald-400 hover:text-emerald-300 underline">privacy@mpjunglesafari.com</a></p>
                            <p className="text-gray-300">Phone: +91 (555) 123-4567</p>
                            <p className="text-gray-300">Address: 123 Wildlife Way, Madhya Pradesh, India 462001</p>
                        </div>
                    </section>
                </div>
                
                <div className="text-center mt-16">
                    <p className="text-gray-400 text-sm">MP Jungle Safari reserves the right to update this Privacy Policy at any time. Any changes will be posted on this page with a revised "Last Updated" date.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;