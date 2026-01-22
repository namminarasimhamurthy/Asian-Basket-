import { useState, useMemo, useRef, useEffect } from 'react';
import { Search, Plus, Minus, Utensils, X, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { isLowStock, isOutOfStock, getStockStatusMessage } from '@/lib/stockUtils';
import riceBowlImg from '@/assets/menu/rice-bowl.jpg';
import friedChickenImg from '@/assets/menu/fried-chicken.jpg';
import koreanTacoImg from '@/assets/menu/korean-taco.jpg';
import bulgogiFriesImg from '@/assets/menu/bulgogi-fries.jpg';
import kidsFriesImg from '@/assets/menu/kids-fries.jpg';
import dessertImg from '@/assets/menu/dessert.jpg';
import beveragesImg from '@/assets/menu/beverages.jpg';



const menuData = [
  { id: 'rb1', name: 'Bulgogi Rice Bowl', price: 16.99, category: 'Rice Bowls', image: "https://i.ibb.co/DfJ8hW3m/Bulgogi-Rice-Bowl.png" },
  { id: 'rb2', name: 'KFC Rice Bowl', price: 14.50, category: 'Rice Bowls', image: "https://i.ibb.co/9HQg0rjJ/KFC-RICE-BOWL.png" },
  { id: 'rb3', name: 'GFC Rice Bowl', price: 14.50, category: 'Rice Bowls', image: "https://i.ibb.co/HTg63N0q/GFC-RICE-BOWL.png" },
  { id: 'rb4', name: 'Plant Based Rice Bowl (Vegan)', price: 14.50, category: 'Rice Bowls', image: riceBowlImg },
  { id: 'kfc1', name: '10 pcs Korean Fried Chicken', price: 14.00, category: 'Korean Fried Chicken', image: "https://i.ibb.co/BV4TGsM9/KOREAN-FRIED-CHICKEN.png" },
  { id: 'kfc2', name: '10 pcs Glazed Fried Chicken (Sweet and Spicy)', price: 14.00, category: 'Korean Fried Chicken', image: "https://i.ibb.co/W4QMJvvz/Glazed-Fried-Chicken.png" },
  { id: 'kfc3', name: '10 pcs Glazed Fried Chicken (Soy Garlic)', price: 14.00, category: 'Korean Fried Chicken', image: friedChickenImg },
  { id: 'kt1', name: 'Bulgogi Taco', price: 6.50, category: 'Korean Tacos', image: koreanTacoImg },
  { id: 'kt2', name: 'Gangjung Fried Chicken Taco', price: 6.50, category: 'Korean Tacos', image: koreanTacoImg },
  { id: 'kt3', name: 'KFC Taco', price: 6.50, category: 'Korean Tacos', image: "https://i.ibb.co/My30DW31/Fusion-Korean-Street-Food-Mango-Habanero-Taco.jpg" },
  { id: 'kt4', name: '3 Homies', price: 16.00, category: 'Korean Tacos', image: koreanTacoImg },
  { id: 'app1', name: 'Bulgogi Fries', price: 13.00, category: 'Appetizers/Sides', image: "https://i.ibb.co/fdd196Wg/Fusion-Korean-Street-Food-Bulgogi-Fries.jpg" },
  { id: 'app2', name: 'Fried Mandu', price: 7.00, category: 'Appetizers/Sides', image: "https://i.ibb.co/gLLJmwPh/Mandu.png" },
  { id: 'app3', name: 'Mandu Gangjung', price: 9.00, category: 'Appetizers/Sides', image: bulgogiFriesImg },
  { id: 'kf1', name: 'Dino Nuggets (4)', price: 5.99, category: 'Kids Friendly', image: "https://www.shutterstock.com/image-photo/view-plate-dinosaur-chicken-nuggets-600nw-2377883865.jpg" },
  { id: 'kf2', name: 'Onion Rings', price: 5.99, category: 'Kids Friendly', image: "https://media.istockphoto.com/id/865789218/photo/onion-rings-with-ketchup.jpg?s=612x612&w=0&k=20&c=XxCAWLfOicCFWfZz0tRv1qoDMZM7UdQlfLaMJT6GoS8=" },
  { id: 'kf3', name: 'Veg Spring Rolls', price: 4.99, category: 'Kids Friendly', image: "https://img.freepik.com/premium-photo/fried-vegetable-spring-rolls-with-sweet-chili-sauce-wooden-dish-white-plate-ai_1038983-10498.jpg" },
  { id: 'kf4', name: 'Crinkle Cut Fries', price: 6.50, category: 'Kids Friendly', image: kidsFriesImg },
  { id: 'des1', name: 'Chocolate Chip Cookie', price: 3.00, category: 'Desserts', image: "https://i.ibb.co/HT5XC6zQ/molten.jpg" },
  { id: 'des2', name: 'Chewy Marshmallow with Brown Butter Bar', price: 4.00, category: 'Desserts', image: "https://i.ibb.co/qMQYcqnF/Sweet-Street-Desserts-Chewy-Marshmallow.jpg" },
  { id: 'des3', name: 'Coffee Cake Sour Cream', price: 4.00, category: 'Desserts', image: "https://i.ibb.co/67frcQpG/Sour.jpg" },
  { id: 'bev1', name: 'Soft Drinks (Coke/Sprite/Dr. Pepper)', price: 2.50, category: 'Beverages', image: beveragesImg },
  { id: 'bev2', name: 'Iced Tea', price: 2.99, category: 'Beverages', image: "https://api.framify.io/api/files/j755xjwebrqkxn6/q7vh9z67kgte5pp/icedtea_HHajQAu9eF.png" },
  { id: 'bev3', name: 'Water', price: 1.00, category: 'Beverages', image: "https://img.freepik.com/free-photo/transparent-water-bottle-outdoors_23-2151049114.jpg" },
  { id: 'des4', name: 'Crème Brulée Cheesecake Slice', price: 6.10, category: 'Desserts', image: "https://i.ibb.co/5X0h0mnh/Sweet-Street-Desserts-Creme-Brulee-Cheesecake-Slice.jpg" },
  { id: 'des5', name: 'Yuzu Cheesecake', price: 6.98, category: 'Desserts', image: "https://i.ibb.co/994tCsDB/Sweet-Street-Desserts-Yuzu-Cheesecake.jpg" },
  { id: 'des6', name: 'Vegan Banana Manifesto Cake', price: 3.99, category: 'Desserts', image: "https://i.ibb.co/R4gfsGw7/Veg-Banana-Cake.jpg" },
  { id: 'des7', name: 'Ube Cheesecake', price: 6.98, category: 'Desserts', image: "https://i.ibb.co/wF6WVTTt/Sweet-Street-Desserts-UBECheesecake.jpg" },
  { id: 'des8', name: 'Raspberry Cheesecake White Chocolate', price: 4.99, category: 'Desserts', image: "https://i.ibb.co/0Vm1pv7d/Rasberry.jpg" },
  { id: 'des9', name: 'Oreo Brownie', price: 3.50, category: 'Desserts', image: "https://i.ibb.co/8421pKD8/Oreo.jpg" },
  { id: 'des10', name: 'Luscious Lemon Squares', price: 3.50, category: 'Desserts', image: "https://i.ibb.co/Vc6ywLRz/Sweet-Street-Desserts-Lucious-Lemon-Squares.jpg" },
  { id: 'des11', name: 'Fabulous Chocolate Chunk Brownie', price: 3.50, category: 'Desserts', image: "https://i.ibb.co/FL2bZ6dQ/Peruvian.jpg" },
  { id: 'des12', name: '4High Carrot Cake Slice', price: 8.25, category: 'Desserts', image: "https://i.ibb.co/hk3ggXq/Sweet-Street-Desserts-Four-High-Carrot-Cake-Slice.jpg" },
  { id: 'des13', name: 'Chocolate Torte Flourless Cake Slice', price: 3.99, category: 'Desserts', image: "https://i.ibb.co/cX6jLqGB/torte.jpg" },
  { id: 'des14', name: 'Chocolate Peruvian Brownie', price: 2.99, category: 'Desserts', image: "https://i.ibb.co/FL2bZ6dQ/Peruvian.jpg" },

  { id: 'des16', name: 'Blueberry Cobbler White Chocolate Cheesecake', price: 6.49, category: 'Desserts', image: "https://i.ibb.co/HDTVkkhN/Sweet-Street-Desserts-Blueberry-Cobbler-White-Chocolate-Cheesecake-Slice.jpg" },
  { id: 'des17', name: 'Big Chocolate Cake Slice', price: 9.25, category: 'Desserts', image: "https://i.ibb.co/1JZKbKWS/Sweet-Street-Desserts-Big-Chocolate-Cake-Slice.jpg" },
  { id: 'des18', name: 'Basque Cheesecake', price: 5.98, category: 'Desserts', image: "https://i.ibb.co/20Js8Hsf/Sweet-Street-Desserts-Basque-Cheesecake.jpg" },
  { id: 'des19', name: 'Chocolate Molten Cake', price: 5.49, category: 'Desserts', image: "https://i.ibb.co/HT5XC6zQ/molten.jpg" },
  { id: 'des20', name: 'Rockslide Brownie', price: 4.99, category: 'Desserts', image: "https://i.ibb.co/Xf9pdsgQ/Sweet-Street-Desserts-Rockslide-Brownie.jpg" },



];

const categories = ['All', ...Array.from(new Set(menuData.map(item => item.category)))];

const Menu = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [quantities, setQuantities] = useState({});
  const [filterOpen, setFilterOpen] = useState(false);
  const filterPanelRef = useRef(null);

  const { addToCart, removeFromCart } = useCart();
  const { toast } = useToast();

  const filteredItems = useMemo(() => {
    return menuData.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const getQuantity = (itemId) => quantities[itemId] || 0;

  const incrementQuantity = (itemId) => {
    const item = menuData.find(i => i.id === itemId);
    if (item) {
      addToCart(item);
      setQuantities(prev => ({
        ...prev,
        [itemId]: (prev[itemId] || 0) + 1
      }));
    }
  };

  /**  
   *  ✅ FIXED BUG: removeFromCart is now only called when quantity hits 0  
   */
  const decrementQuantity = (itemId) => {
    const newQty = Math.max(0, (quantities[itemId] || 0) - 1);

    if (newQty === 0) {
      removeFromCart(itemId);
      toast({
        title: 'Item removed',
        description: 'Item has been removed from your cart.',
      });
    }

    setQuantities(prev => ({
      ...prev,
      [itemId]: newQty
    }));
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setFilterOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterPanelRef.current && !filterPanelRef.current.contains(e.target)) {
        setFilterOpen(false);
      }
    };
    if (filterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [filterOpen]);

  return (
    <section id="menu" className="py-16 px-4 md:px-8 bg-background relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">
          Our Menu
        </h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Authentic Korean flavors served fresh from our food truck
        </p>

        {/* Search Bar */}
        <div className="mb-8 max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 border-2 focus:border-secondary"
            />
          </div>
        </div>

        {/* Category Filter - Desktop */}
        <div className="mb-10 hidden md:block overflow-x-auto">
          <div className="flex gap-2 justify-center flex-wrap min-w-max px-4">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className={`${selectedCategory === category
                  ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
                  : 'hover:bg-secondary/10'
                  } transition-all duration-300 whitespace-nowrap`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid - Desktop */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-secondary overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <span className="text-xs font-semibold text-white bg-primary px-3 py-1 rounded-full shadow-lg">
                    {item.category}
                  </span>
                </div>
                {/* Low Stock Badge */}
                {isLowStock(item.id) && (
                  <div className="absolute top-3 left-3">
                    <span className="text-xs font-bold text-white bg-amber-500 px-2 py-1 rounded-full shadow-lg flex items-center gap-1 animate-pulse">
                      <AlertTriangle className="h-3 w-3" />
                      {getStockStatusMessage(item.id)}
                    </span>
                  </div>
                )}
                {isOutOfStock(item.id) && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-lg font-bold text-white bg-red-600 px-4 py-2 rounded-lg">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              <CardContent className="pt-4">
                <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors min-h-[3rem]">
                  {item.name}
                </h3>
                <p className="text-2xl font-bold text-primary">
                  €{item.price.toFixed(2)}
                </p>
              </CardContent>

              <div className="px-4 pb-4 flex flex-col gap-3">
                {isOutOfStock(item.id) ? (
                  <Button
                    disabled
                    className="w-full bg-gray-400 text-white font-semibold h-11 cursor-not-allowed"
                  >
                    Out of Stock
                  </Button>
                ) : getQuantity(item.id) === 0 ? (
                  <Button
                    onClick={() => incrementQuantity(item.id)}
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold h-11"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                ) : (
                  <div className="flex items-center justify-between gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => decrementQuantity(item.id)}
                      className="flex-1 h-10 border-2 border-secondary hover:bg-secondary hover:text-secondary-foreground transition-all"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-lg font-bold text-foreground min-w-[3rem] text-center">
                      {getQuantity(item.id)}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => incrementQuantity(item.id)}
                      className="flex-1 h-10 border-2 border-secondary hover:bg-secondary hover:text-secondary-foreground transition-all"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Mobile View List */}
        <div className="md:hidden space-y-3">
          {filteredItems.map((item) => (
            <div key={item.id} className={`bg-white border border-gray-200 rounded-lg p-4 flex gap-3 relative ${isOutOfStock(item.id) ? 'opacity-60' : ''}`}>
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                />
                {isLowStock(item.id) && (
                  <span className="absolute -top-1 -left-1 text-[10px] font-bold text-white bg-amber-500 px-1.5 py-0.5 rounded-full">
                    {getStockStatusMessage(item.id)}
                  </span>
                )}
                {isOutOfStock(item.id) && (
                  <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-bold text-white bg-red-600 px-2 py-1 rounded">Sold Out</span>
                  </div>
                )}
              </div>
              <div className="flex-1 flex flex-col">
                <div className="mb-1">
                  <span className="text-xs font-semibold text-white bg-primary px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
                <h4 className="font-bold text-foreground text-sm mb-1">
                  {item.name}
                </h4>
                <p className="text-primary font-bold text-base mb-2">
                  €{item.price.toFixed(2)}
                </p>
                <div className="mt-auto">
                  {isOutOfStock(item.id) ? (
                    <Button
                      disabled
                      size="sm"
                      className="w-full h-8 bg-gray-400 text-white text-xs font-semibold cursor-not-allowed"
                    >
                      Out of Stock
                    </Button>
                  ) : getQuantity(item.id) === 0 ? (
                    <Button
                      onClick={() => incrementQuantity(item.id)}
                      size="sm"
                      className="w-full h-8 bg-secondary text-secondary-foreground hover:bg-secondary/90 text-xs font-semibold"
                    >
                      <Plus className="mr-1 h-3 w-3" />
                      Add
                    </Button>
                  ) : (
                    <div className="flex items-center justify-center gap-2 bg-gray-100 rounded-full w-full px-2 py-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => decrementQuantity(item.id)}
                        className="h-6 w-6 p-0 hover:bg-secondary hover:text-secondary-foreground"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-bold text-foreground min-w-[1.5rem] text-center">
                        {getQuantity(item.id)}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => incrementQuantity(item.id)}
                        className="h-6 w-6 p-0 hover:bg-secondary hover:text-secondary-foreground"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No items found matching your search.
            </p>
          </div>
        )}
      </div>

      {/* Filter Button - Mobile */}
      {!filterOpen && (
        <div className="md:hidden fixed bottom-20 right-4 z-40">
          <Button
            onClick={() => setFilterOpen(!filterOpen)}
            size="icon"
            className="h-14 w-14 rounded-full shadow-2xl bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:scale-110 transition-all duration-300"
          >
            <Utensils className="h-6 w-6" />
          </Button>
        </div>
      )}

      {/* Dynamic Filter Panel */}
      {filterOpen && (
        <div className="md:hidden fixed inset-0 z-30">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setFilterOpen(false)}
          />
          <div
            ref={filterPanelRef}
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl max-h-[80vh] overflow-y-auto animate-in slide-in-from-bottom-5"
          >
            <div className="sticky top-0 bg-white border-b px-4 py-4 flex items-center justify-between rounded-t-3xl">
              <h3 className="text-xl font-bold text-foreground">Filter by Category</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setFilterOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-4 space-y-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  className={`w-full h-12 text-base justify-start font-semibold transition-all ${selectedCategory === category
                    ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
                    : 'hover:bg-gray-100'
                    }`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`w-3 h-3 rounded-full transition-all ${selectedCategory === category
                      ? 'bg-secondary-foreground'
                      : 'border-2 border-gray-400'
                      }`} />
                    {category}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Menu;