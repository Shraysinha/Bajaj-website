import { useState } from "react";
import { Menu, X } from "lucide-react";
import { scrollToSection } from "../../utils/scrollToSection";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "bikes", label: "Bikes" },
    { id: "compare", label: "Compare" },
    { id: "offers", label: "Offers" },
    { id: "achievements", label: "Achievements" },
    { id: "videos", label: "Videos" },
    { id: "contact", label: "Contact" },
  ];

  const handleMobileNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    scrollToSection(sectionId);
  };

  return (
    <nav className="sticky top-0 bg-white z-50 border-b border-[#E5E5E5] shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <div className="w-10 h-10 bg-[#1B4D8C] rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-lg">🚩</span>
            </div>
            <div>
              <div className="font-bold text-lg text-[#1B4D8C]">
                Shri Vinayak Bajaj
              </div>
              <div className="text-xs text-gray-600">
                Trusted Bajaj Showroom
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`font-semibold text-sm transition-colors duration-200 ${
                  index === 0
                    ? "text-[#1B4D8C] relative hover:text-[#163D72]"
                    : "text-gray-600 hover:text-[#1B4D8C]"
                }`}
              >
                {link.label}
                {index === 0 && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#1B4D8C]"></span>
                )}
              </button>
            ))}
          </div>

          <div className="hidden lg:block">
            <button
              onClick={() => scrollToSection("contact")}
              className="bg-[#1B4D8C] hover:bg-[#163D72] text-white font-semibold text-sm px-6 py-2 rounded-full transition-colors duration-200"
            >
              Book a Test Ride
            </button>
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#1B4D8C] hover:text-[#163D72] transition-colors duration-200"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#E5E5E5] shadow-lg">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleMobileNavClick(link.id)}
                className="block w-full text-left font-semibold text-lg text-gray-600 hover:text-[#1B4D8C] transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleMobileNavClick("contact")}
              className="w-full bg-[#1B4D8C] hover:bg-[#163D72] text-white font-semibold py-2 px-4 rounded-full transition-colors duration-200 mt-4"
            >
              Book a Test Ride
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
