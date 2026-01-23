import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import Cart from '@/components/Cart';

const OffersPage = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background pb-16 md:pb-0">
            <Header />

            <div className="pt-[188px] md:pt-[200px]">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-2 text-primary">Special Offers</h1>
                    <p className="text-muted-foreground mb-8">Check out our latest deals and discounts</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
                        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-6 border-2 border-primary">
                            <h3 className="text-xl font-bold text-primary mb-2">50% OFF</h3>
                            <p className="text-foreground mb-4">On all fresh vegetables</p>
                            <p className="text-sm text-muted-foreground">Valid until end of month</p>
                        </div>

                        <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl p-6 border-2 border-accent">
                            <h3 className="text-xl font-bold text-accent mb-2">Buy 1 Get 1</h3>
                            <p className="text-foreground mb-4">On selected rice products</p>
                            <p className="text-sm text-muted-foreground">Limited time offer</p>
                        </div>

                        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-6 border-2 border-primary">
                            <h3 className="text-xl font-bold text-primary mb-2">Free Delivery</h3>
                            <p className="text-foreground mb-4">On orders above €50</p>
                            <p className="text-sm text-muted-foreground">No code needed</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
            <BottomNav setIsCartOpen={setIsCartOpen} />
            <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
        </div>
    );
};

export default OffersPage;
