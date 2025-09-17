import { Phone, Mail, MapPin } from "lucide-react";
import { useState, useCallback } from "react";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    inquiry_type: "enquiry",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleFormSubmit = useCallback((e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setFormSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        inquiry_type: "enquiry",
      });
      setIsSubmitting(false);
      setTimeout(() => setFormSubmitted(false), 5000);
    }, 1000);
  }, []);

  if (formSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <h4 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h4>
        <p className="text-gray-600">
          We've received your inquiry and will contact you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4D8C] focus:border-transparent outline-none transition-colors duration-200"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4D8C] focus:border-transparent outline-none transition-colors duration-200"
            placeholder="your@email.com"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone *
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4D8C] focus:border-transparent outline-none transition-colors duration-200"
            placeholder="+91 9876543210"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Inquiry Type *
          </label>
          <select
            required
            value={formData.inquiry_type}
            onChange={(e) => handleInputChange("inquiry_type", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4D8C] focus:border-transparent outline-none transition-colors duration-200"
          >
            <option value="enquiry">General Enquiry</option>
            <option value="test_ride">Book Test Ride</option>
            <option value="service">Service Request</option>
            <option value="finance">Finance Options</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Message
        </label>
        <textarea
          value={formData.message}
          onChange={(e) => handleInputChange("message", e.target.value)}
          rows="4"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4D8C] focus:border-transparent outline-none transition-colors duration-200"
          placeholder="Tell us more about your requirements..."
        ></textarea>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#1B4D8C] hover:bg-[#163D72] disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold text-lg transition-colors duration-200"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}

function ContactInfo() {
  return (
    <div>
      <div className="bg-gray-50 rounded-xl p-8 mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Visit Our Showroom
        </h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <MapPin className="text-[#1B4D8C] mt-1 mr-3" size={20} />
            <div>
              <h4 className="font-semibold text-gray-900">Address</h4>
              <p className="text-gray-600">
                123 Main Street, Commercial Complex
                <br />
                New Delhi - 110001, India
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Phone className="text-[#1B4D8C] mr-3" size={20} />
            <div>
              <h4 className="font-semibold text-gray-900">Phone</h4>
              <p className="text-gray-600">+91 9876543210</p>
            </div>
          </div>
          <div className="flex items-center">
            <Mail className="text-[#1B4D8C] mr-3" size={20} />
            <div>
              <h4 className="font-semibold text-gray-900">Email</h4>
              <p className="text-gray-600">info@shrivinayakbajaj.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-xl overflow-hidden shadow-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.0117822412!2d77.21021931508227!3d28.626137982433495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfb42297baaf7%3A0xe1c1b8e6b3e1e4c!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1635757234567!5m2!1sen!2sin"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Shri Vinayak Bajaj Showroom Location"
        />
      </div>
    </div>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="py-16 lg:py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to take your dream bike for a test ride? Contact us today!
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Send us a Message
            </h3>
            <ContactForm />
          </div>
          <ContactInfo />
        </div>
      </div>
    </section>
  );
}
