import { useState, useEffect } from "react";
import { scrollToSection } from "../../utils/scrollToSection";

const heroBikes = [
  {
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1200",
    title: "New Pulsar N160",
    subtitle: "Performance Redefined",
    offer: "Starting ₹1,18,000*",
  },
  {
    image:
      "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=1200",
    title: "Pulsar NS200",
    subtitle: "Naked Street Fighter",
    offer: "Special EMI from ₹3,200/month*",
  },
  {
    image:
      "https://images.unsplash.com/photo-1599819177107-2bbe6c0231f0?w=1200",
    title: "Dominar 400",
    subtitle: "Built for Highways",
    offer: "Adventure Ready",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const heroTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroBikes.length);
    }, 5000);
    return () => clearInterval(heroTimer);
  }, []);

  return (
    <section id="home" className="relative h-[600px] lg:h-[700px] overflow-hidden">
      <div className="relative h-full">
        {heroBikes.map((bike, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={bike.image}
              alt={bike.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-white max-w-2xl">
            <div className="flex items-center mb-4">
              <span className="bg-[#1B4D8C] text-white px-3 py-1 rounded-full text-sm font-semibold">
                🏆 AWARDED BEST DEALER
              </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">
              {heroBikes[currentSlide]?.title}
            </h1>
            <p className="text-xl lg:text-2xl mb-2 text-gray-200">
              {heroBikes[currentSlide]?.subtitle}
            </p>
            <p className="text-lg lg:text-xl mb-8 text-[#FFD700]">
              {heroBikes[currentSlide]?.offer}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection("bikes")}
                className="bg-[#1B4D8C] hover:bg-[#163D72] text-white px-8 py-3 rounded-full font-semibold text-lg transition-colors duration-200"
              >
                Explore Bikes
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="bg-transparent border-2 border-white hover:bg-white hover:text-[#1B4D8C] text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-200"
              >
                Book a Ride
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroBikes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide ? "bg-[#1B4D8C]" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
