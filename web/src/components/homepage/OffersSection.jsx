import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const offers = [
  {
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200",
    title: "Festive Offers",
    subtitle: "Up to ₹15,000 Off + Free Accessories",
    validity: "Valid till Dec 31, 2025",
  },
  {
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200",
    title: "Easy EMI Options",
    subtitle: "Starting from ₹2,999/month",
    validity: "Zero Down Payment Available",
  },
  {
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=1200",
    title: "Exchange Bonus",
    subtitle: "Extra ₹10,000 on old bike exchange",
    validity: "Any brand accepted",
  },
];

export function OffersSection() {
  const [currentOfferSlide, setCurrentOfferSlide] = useState(0);

  useEffect(() => {
    const offerTimer = setInterval(() => {
      setCurrentOfferSlide((prev) => (prev + 1) % offers.length);
    }, 4000);
    return () => clearInterval(offerTimer);
  }, []);

  return (
    <section id="offers" className="py-16 lg:py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Special Offers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't miss out on our latest deals and financing options.
          </p>
        </div>
        <div className="relative h-[400px] rounded-xl overflow-hidden">
          {offers.map((offer, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentOfferSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1B4D8C]/90 to-[#1B4D8C]/60"></div>
              <div className="absolute inset-0 flex items-center justify-center text-center">
                <div className="text-white max-w-2xl px-4">
                  <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                    {offer.title}
                  </h3>
                  <p className="text-xl lg:text-2xl mb-2">{offer.subtitle}</p>
                  <p className="text-lg text-gray-200">{offer.validity}</p>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={() => setCurrentOfferSlide((prev) => (prev - 1 + offers.length) % offers.length)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors duration-200"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => setCurrentOfferSlide((prev) => (prev + 1) % offers.length)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors duration-200"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
