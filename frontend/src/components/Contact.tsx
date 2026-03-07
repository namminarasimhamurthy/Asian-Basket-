import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'flavoronwheel@gmail.com',
      link: 'mailto:flavoronwheel@gmail.com',
      delay: 'delay-0'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '415-961-1921',
      link: 'tel:+14159611921',
      delay: 'delay-100'
    },
    {
      icon: MapPin,
      label: 'Address',
      value: 'Leanden, TX',

      delay: 'delay-200'
    },
  ];

  return (
    <div id="contact" className="mb-10 bg-white relative overflow-hidden">
      {/* Curved Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Red curve - top left */}
        <svg className="absolute -top-32 -left-32 w-96 h-96 text-primary opacity-20" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50,100 Q100,50 150,100" stroke="currentColor" strokeWidth="40" strokeLinecap="round" />
        </svg>

        {/* Green curve - bottom right */}
        <svg className="absolute -bottom-32 -right-32 w-96 h-96 text-accent opacity-20" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50,100 Q100,50 150,100" stroke="currentColor" strokeWidth="40" strokeLinecap="round" />
        </svg>

        {/* Light green accent curves */}
        <svg className="absolute top-1/3 -left-16 w-80 h-80 text-accent opacity-15 animate-pulse" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100,50 Q150,100 100,150" stroke="currentColor" strokeWidth="30" strokeLinecap="round" />
        </svg>

        {/* Green accent - right side */}
        <svg className="absolute bottom-1/4 -right-20 w-72 h-72 text-primary opacity-10 animate-pulse" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50,100 Q100,150 150,100" stroke="currentColor" strokeWidth="35" strokeLinecap="round" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header Section */}
        <div className="py-12 px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="text-3xl font-black text-primary">
              ASIAN
            </div>
            <div className="text-2xl animate-bounce"></div>
          </div>
          <div className="text-2xl font-black text-primary mb-4">
            BASKET
          </div>
          <p className="text-gray-600 text-sm">
            Get in touch with us!
          </p>
        </div>

        {/* Contact Cards - Single Column */}
        <div className="flex justify-center px-4 pb-1">
          <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">

            {contactInfo.map((item, index) => {
              const Icon = item.icon;
              return (
                <a
                  key={index}
                  href={item.link}
                  className={`block transition-all duration-500 ease-out animate-fade-in-up ${item.delay}`}
                >
                  <div className="group relative h-24 bg-gradient-to-r from-primary/10 to-accent/10 border-l-4 border-primary rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition duration-300 overflow-hidden">
                    {/* Animated background circle */}
                    <div className="absolute -right-8 -top-8 w-24 h-24 bg-primary rounded-full opacity-0 group-hover:opacity-10 transition duration-300 group-hover:scale-150"></div>

                    <div className="relative flex items-center gap-4">
                      <div className="bg-primary p-3 rounded-xl group-hover:bg-accent group-hover:rotate-12 transition duration-300 flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-gray-800 font-bold text-sm mb-1">
                          {item.label}
                        </h3>
                        <p className="text-gray-600 font-semibold text-xs truncate group-hover:text-primary transition duration-300">
                          {item.value}
                        </p>
                      </div>

                      {/* Animated arrow */}
                      <div className="text-primary font-bold opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition duration-300">
                        →
                      </div>
                    </div>

                    {/* Top animated line */}
                    <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-primary to-accent w-0 group-hover:w-full transition duration-300"></div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <style >{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.15;
          }
          50% {
            opacity: 0.25;
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .delay-0 {
          animation-delay: 0s;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .animate-pulse {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}