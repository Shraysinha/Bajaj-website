import { Youtube, Instagram, Phone, Mail, MapPin } from "lucide-react";
import { scrollToSection } from "../../utils/scrollToSection";

export function Footer() {
  return (
    <footer className="bg-[#1B4D8C] text-white py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-3">
                <span className="text-[#1B4D8C] font-bold text-xl">🚩</span>
              </div>
              <div>
                <div className="font-bold text-xl">Shri Vinayak Bajaj</div>
                <div className="text-sm text-gray-300">
                  Trusted Bajaj Showroom
                </div>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Your trusted partner for all Bajaj motorcycles. We provide genuine
              products, expert service, and unmatched customer satisfaction.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://youtube.com/@bajaj"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                <Youtube size={24} />
              </a>
              <a
                href="https://instagram.com/shrivinayakbajaj"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("bikes")}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Bikes
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("compare")}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Compare
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("offers")}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Offers
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                +91 9876543210
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                info@shrivinayakbajaj.com
              </li>
              <li className="flex items-start">
                <MapPin size={16} className="mr-2 mt-1" />
                123 Main Street, New Delhi
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2025 Shri Vinayak Bajaj – All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
