import { useState, useEffect, useRef } from 'react';
import { Store, MapPin, ShoppingBag } from 'lucide-react';
import logo from "@/assets/asian-basket-logo-dark.jpg";

const Food = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="food"
      ref={sectionRef}
      className="py-16 md:py-24 px-4 md:px-8 bg-white relative overflow-hidden"
    >
      {/* Decorative Curved Lines */}
      <svg className="absolute top-0 left-0 w-full h-full opacity-10" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M-100 400C100 200 300 600 500 400C700 200 900 600 1100 400C1300 200 1500 600 1700 400" stroke="#6B9B5A" strokeWidth="2" />
        <path d="M-100 600C100 400 300 800 500 600C700 400 900 800 1100 600C1300 400 1500 800 1700 600" stroke="#6B9B5A" strokeWidth="2" />
      </svg>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Content */}
        <div className="text-center mb-16 md:mb-20 relative">

          {/* Floating Food Images */}
          <div
            className={`absolute left-0 md:left-10 lg:left-20 -top-10 md:top-10 w-32 md:w-48 lg:w-64 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
              }`}
          >
            {/* Burger Image Placeholder */}
            <div className="relative animate-float">
              <img
                src="https://i.ibb.co/mF6N4K2T/wheels.webp"
                alt="Burger"
                className="w-full h-auto drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Small Tomato - Left Bottom */}
          {/* <div 
            className={`absolute left-5 md:left-20 bottom-0 md:bottom-10 w-8 md:w-12 transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 rotate-0' : 'opacity-0 rotate-45'
            }`}
          >
            <img 
              src="https://images.unsplash.com/photo-1546470427-227ce1d8f6fa?w=200&q=80" 
              alt="Tomato"
              className="w-full h-auto drop-shadow-lg animate-float-slow"
            />
          </div> */}

          {/* Leaf - Top Left */}
          {/* <div 
            className={`absolute left-1/4 top-0 w-12 md:w-16 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <img 
              src="https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=200&q=80" 
              alt="Leaf"
              className="w-full h-auto drop-shadow-lg animate-float"
            />
          </div> */}

          {/* Dumplings - Top Right */}
          <div
            className={`absolute right-0 md:right-10 lg:right-20 -top-10 w-32 md:w-48 lg:w-64 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
              }`}
          >
            <div className="relative animate-float-slow">
              <img
                src={logo}
                alt="Dumplings"
                className="w-full h-auto drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Small Tomato - Top Right */}
          {/* <div 
            className={`absolute right-1/4 top-10 md:top-20 w-8 md:w-12 transition-all duration-1000 delay-600 ${
              isVisible ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-45'
            }`}
          >
            <img 
              src="https://images.unsplash.com/photo-1546470427-227ce1d8f6fa?w=200&q=80" 
              alt="Tomato"
              className="w-full h-auto drop-shadow-lg animate-float"
            />
          </div> */}

          {/* Pizza - Bottom Right */}
          <div
            className={`absolute right-4 md:right-20 lg:right-32 -bottom-10 md:bottom-20 w-32 md:w-48 lg:w-56 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
          >
            <div className="relative animate-float">
              <img
                src="https://i.ibb.co/r2sdWmRv/nuggets-removebg-preview.png"
                alt="Pizza"
                className="w-full h-auto drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Center Content */}
          <div
            className={`relative z-10 py-12 md:py-20 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary mb-6 leading-tight">
              Flavors that roll<br />right to you
            </h1>
            <p className="text-base md:text-xl lg:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Flavor on Wheels is a Korean-Mexican food truck serving fresh,<br></br> flavorful dishes for weddings, corporate events, festivals,<br></br>  and private parties. If you’re an event host or organizer looking for catering that stands out, our fusion menu delivers <br></br>bold taste and crowd-pleasing variety.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div
          className={`bg-gray-50 rounded-3xl shadow-xl p-8 md:p-12 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">

            {/* Restaurants Stat */}
            <div className="flex items-center justify-center gap-4 md:gap-6 group">
              <div>
                <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">1000+</p>
                <p className="text-base md:text-lg text-gray-600 mt-1">Happy Customers</p>
              </div>
              <div className="bg-white p-3 md:p-4 rounded-2xl shadow-md group-hover:scale-110 transition-transform duration-300">
                <Store className="h-10 w-10 md:h-12 md:w-12 text-primary" />
              </div>
            </div>

            {/* Cities Stat */}
            <div className="flex items-center justify-center gap-4 md:gap-6 group border-t md:border-t-0 md:border-l border-gray-200 pt-8 md:pt-0">
              <div>
                <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">80+</p>
                <p className="text-base md:text-lg text-gray-600 mt-1">cities</p>
              </div>
              <div className="bg-white p-3 md:p-4 rounded-2xl shadow-md group-hover:scale-110 transition-transform duration-300">
                <MapPin className="h-10 w-10 md:h-12 md:w-12 text-primary" />
              </div>
            </div>

            {/* Orders Stat */}
            <div className="flex items-center justify-center gap-4 md:gap-6 group border-t md:border-t-0 md:border-l border-gray-200 pt-8 md:pt-0">
              <div>
                <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">1000+</p>
                <p className="text-base md:text-lg text-gray-600 mt-1">orders delivered</p>
              </div>
              <div className="bg-white p-3 md:p-4 rounded-2xl shadow-md group-hover:scale-110 transition-transform duration-300">
                <ShoppingBag className="h-10 w-10 md:h-12 md:w-12 text-primary" />
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

      
      `}</style>
    </section>
  );
};

export default Food;