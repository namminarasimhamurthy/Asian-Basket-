import { useState, useEffect } from 'react';
import { ShoppingCart, X, Plus, Minus, Send, Trash2, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface CartProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Cart = ({ isOpen, setIsOpen }: CartProps) => {
  const { cartItems, removeFromCart, updateQuantity, getTotalItems, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [showItems, setShowItems] = useState(false);

  const totalItems = getTotalItems();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowItems(true), 50);
    } else {
      setShowItems(false);
    }
  }, [isOpen]);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: 'Cart is empty',
        description: 'Please add items to your cart before checking out.',
        variant: 'destructive',
      });
      return;
    }

    const orderDetails = cartItems.map(
      item => `${item.quantity}x ${item.name} - €${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const total = getTotalPrice().toFixed(2);
    const message = `New Order from Asian Basket\n\n${orderDetails}\n\nTotal: €${total}`;
    const whatsappUrl = `https://wa.me/353899899412?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');

    toast({
      title: 'Redirecting to WhatsApp',
      description: 'Complete your order via WhatsApp!',
    });

    setIsOpen(false);
    clearCart();
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
    toast({
      title: 'Item removed',
      description: 'Item has been removed from your cart.',
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: 'Cart cleared',
      description: 'All items have been removed from your cart.',
    });
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Cart Sheet - Dynamic */}
      <div
        className={`fixed right-0 top-0 h-full z-50 transition-all duration-500 ease-out ${isOpen ? 'w-full sm:w-96' : 'w-0'
          } overflow-hidden`}
      >
        <div className="h-full flex flex-col bg-white dark:bg-gray-900 shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground sticky top-0 z-10 px-6 py-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <ShoppingCart className="h-6 w-6" />
              <div>
                <h2 className="text-xl font-bold">Your Cart</h2>
                <p className="text-xs opacity-90">{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
              </div>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="h-10 w-10 hover:bg-secondary-foreground/20 text-secondary-foreground"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Items Container */}
          <div className="flex-1 overflow-y-auto py-6 px-4">
            {cartItems.length === 0 ? (
              <div className={`flex flex-col items-center justify-center h-full text-center transition-all duration-500 ${showItems ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}>
                <div className="bg-secondary/10 rounded-full p-6 mb-4">
                  <ShoppingCart className="h-16 w-16 text-muted-foreground" />
                </div>
                <p className="text-lg font-semibold text-foreground">Your cart is empty</p>
                <p className="text-sm text-muted-foreground mt-2 px-2">
                  Add delicious Korean items from the menu to get started
                </p>
              </div>
            ) : (
              <div className={`space-y-3 transition-all duration-500 ${showItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                {cartItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`bg-card border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-secondary transition-all duration-300 hover:shadow-md animate-in fade-in slide-in-from-left-2`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground text-sm md:text-base leading-snug">
                          {item.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">{item.category}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveItem(item.id)}
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0 ml-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-full p-1 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="h-8 w-8 hover:bg-secondary/20 text-foreground"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="font-bold w-6 text-center text-sm text-foreground">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 hover:bg-secondary/20 text-foreground"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="text-right flex-1">
                        <p className="text-sm text-muted-foreground">
                          €{item.price.toFixed(2)} each
                        </p>
                        <p className="text-lg font-bold text-primary">
                          €{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="bg-gradient-to-t from-white dark:from-gray-900 border-t-2 border-gray-200 dark:border-gray-700 sticky bottom-0 p-4 md:p-6 space-y-3 animate-in fade-in slide-in-from-bottom-4">
              {/* Divider with Items Count */}
              <div className="space-y-3">
                <div className="flex justify-between items-center py-3">
                  <span className="text-sm font-semibold text-muted-foreground">Subtotal</span>
                  <span className="text-lg font-bold text-foreground">
                    €{getTotalPrice().toFixed(2)}
                  </span>
                </div>

                {/* Order Buttons */}
                <div className="space-y-2">
                  <Button
                    onClick={() => {
                      setIsOpen(false);
                      window.location.href = '/checkout';
                    }}
                    className="w-full h-12 md:h-14 text-base md:text-lg bg-primary text-primary-foreground hover:bg-primary/90 font-bold group shadow-lg hover:shadow-xl transition-all"
                  >
                    <CreditCard className="mr-2 h-5 w-5" />
                    Proceed to Checkout
                  </Button>

                  <Button
                    onClick={handleCheckout}
                    variant="outline"
                    className="w-full h-11 border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-semibold"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Order via WhatsApp
                  </Button>

                  <Button
                    onClick={handleClearCart}
                    variant="ghost"
                    className="w-full h-10 text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear Cart
                  </Button>
                </div>
              </div>

              {/* Info Badge */}
              <div className="bg-secondary/10 rounded-lg px-3 py-2 text-center">
                <p className="text-xs text-muted-foreground">
                  💬 You will be redirected to WhatsApp to complete your order
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;