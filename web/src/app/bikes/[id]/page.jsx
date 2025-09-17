import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Star, Download, Phone, Mail, Share2, ChevronLeft, ChevronRight, Check } from "lucide-react";

export default function BikeDetailPage({ params }) {
  const { id } = params;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    inquiry_type: 'enquiry'
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const queryClient = useQueryClient();

  // Fetch bike details
  const { data: bikeData, isLoading } = useQuery({
    queryKey: ['bike', id],
    queryFn: async () => {
      const response = await fetch(`/api/bikes/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch bike details');
      }
      return response.json();
    },
  });

  // Submit inquiry mutation
  const submitInquiry = useMutation({
    mutationFn: async (data) => {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, bike_id: parseInt(id) }),
      });
      if (!response.ok) {
        throw new Error('Failed to submit inquiry');
      }
      return response.json();
    },
    onSuccess: () => {
      setFormSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        inquiry_type: 'enquiry'
      });
      setTimeout(() => setFormSubmitted(false), 5000);
    },
    onError: (error) => {
      console.error('Error submitting inquiry:', error);
    },
  });

  const bike = bikeData?.bike;

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleFormSubmit = useCallback((e) => {
    e.preventDefault();
    submitInquiry.mutate(formData);
  }, [formData, submitInquiry]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#1B4D8C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading bike details...</p>
        </div>
      </div>
    );
  }

  if (!bike) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Bike Not Found</h2>
          <p className="text-gray-600 mb-6">The bike you're looking for doesn't exist.</p>
          <a 
            href="/"
            className="bg-[#1B4D8C] hover:bg-[#163D72] text-white px-6 py-3 rounded-full font-semibold transition-colors duration-200"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  // Additional images for gallery (using placeholder images for demo)
  const bikeImages = [
    bike.image_url,
    "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800",
    "https://images.unsplash.com/photo-1599819177107-2bbe6c0231f0?w=800",
    "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800"
  ];

  const specifications = [
    { label: "Engine", value: bike.engine },
    { label: "Mileage", value: bike.mileage },
    { label: "Torque", value: bike.torque },
    { label: "Category", value: bike.category.charAt(0).toUpperCase() + bike.category.slice(1) },
    { label: "Variants", value: bike.variants.length },
    { label: "Colors Available", value: bike.colors.length }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a 
                href="/"
                className="flex items-center text-[#1B4D8C] hover:text-[#163D72] transition-colors duration-200"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back to Home
              </a>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-[#1B4D8C] transition-colors duration-200">
                <Share2 size={20} />
              </button>
              <button 
                onClick={() => document.getElementById('enquire').scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#1B4D8C] hover:bg-[#163D72] text-white px-6 py-2 rounded-full font-semibold transition-colors duration-200"
              >
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="relative rounded-xl overflow-hidden shadow-lg mb-4">
              <img
                src={bikeImages[currentImageIndex]}
                alt={`${bike.name} - View ${currentImageIndex + 1}`}
                className="w-full h-96 object-cover"
              />
              
              {/* Navigation Arrows */}
              {bikeImages.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev - 1 + bikeImages.length) % bikeImages.length)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-[#1B4D8C] p-2 rounded-full transition-all duration-200"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev + 1) % bikeImages.length)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-[#1B4D8C] p-2 rounded-full transition-all duration-200"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
              
              {/* Image Indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {bikeImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentImageIndex ? 'bg-[#1B4D8C]' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {bikeImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    index === currentImageIndex ? 'border-[#1B4D8C]' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-20 h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Bike Details */}
          <div className="space-y-8">
            {/* Title and Price */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {bike.name}
              </h1>
              <p className="text-lg text-gray-600 mb-4">{bike.description}</p>
              <div className="flex items-center space-x-4">
                <div className="text-3xl font-bold text-[#1B4D8C]">
                  ₹{bike.price_min.toLocaleString()}
                  {bike.price_max !== bike.price_min && (
                    <span className="text-xl text-gray-600"> - ₹{bike.price_max.toLocaleString()}</span>
                  )}
                </div>
                <span className="text-sm text-gray-500">*Ex-showroom price</span>
              </div>
            </div>

            {/* Variant Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Select Variant</h3>
              <div className="grid grid-cols-2 gap-3">
                {bike.variants.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedVariant(index)}
                    className={`p-3 border rounded-lg text-left transition-all duration-200 ${
                      selectedVariant === index
                        ? 'border-[#1B4D8C] bg-[#1B4D8C]/10 text-[#1B4D8C]'
                        : 'border-gray-300 hover:border-[#1B4D8C] text-gray-700'
                    }`}
                  >
                    <div className="font-semibold">{variant}</div>
                    {selectedVariant === index && (
                      <div className="flex items-center mt-1">
                        <Check size={14} className="mr-1" />
                        <span className="text-sm">Selected</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Select Color</h3>
              <div className="flex flex-wrap gap-3">
                {bike.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    className={`px-4 py-2 border rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedColor === index
                        ? 'border-[#1B4D8C] bg-[#1B4D8C] text-white'
                        : 'border-gray-300 hover:border-[#1B4D8C] text-gray-700 hover:text-[#1B4D8C]'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {bike.key_features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check size={16} className="text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => document.getElementById('enquire').scrollIntoView({ behavior: 'smooth' })}
                className="flex-1 bg-[#1B4D8C] hover:bg-[#163D72] text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Book Test Ride
              </button>
              <button className="px-6 py-3 border-2 border-[#1B4D8C] text-[#1B4D8C] hover:bg-[#1B4D8C] hover:text-white rounded-lg font-semibold transition-colors duration-200">
                <Download size={18} className="inline mr-2" />
                Download Brochure
              </button>
            </div>
          </div>
        </div>

        {/* Specifications Table */}
        <div className="mt-16 bg-gray-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specifications.map((spec, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-sm font-medium text-gray-500 mb-1">{spec.label}</div>
                <div className="text-lg font-semibold text-gray-900">{spec.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Enquiry Form */}
        <div id="enquire" className="mt-16">
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Interested in {bike.name}?
              </h2>
              <p className="text-lg text-gray-600">
                Get in touch with us for pricing, test rides, and financing options.
              </p>
            </div>

            {formSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-600">We've received your inquiry and will contact you soon.</p>
              </div>
            ) : (
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
                      onChange={(e) => handleInputChange('name', e.target.value)}
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
                      onChange={(e) => handleInputChange('email', e.target.value)}
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
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4D8C] focus:border-transparent outline-none transition-colors duration-200"
                      placeholder="+91 9876543210"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Interest *
                    </label>
                    <select
                      required
                      value={formData.inquiry_type}
                      onChange={(e) => handleInputChange('inquiry_type', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4D8C] focus:border-transparent outline-none transition-colors duration-200"
                    >
                      <option value="enquiry">General Enquiry</option>
                      <option value="test_ride">Book Test Ride</option>
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
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4D8C] focus:border-transparent outline-none transition-colors duration-200"
                    placeholder={`I'm interested in the ${bike.name}. Please provide more details about pricing and availability.`}
                  />
                </div>
                
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={submitInquiry.isLoading}
                    className="w-full sm:w-auto bg-[#1B4D8C] hover:bg-[#163D72] disabled:bg-gray-400 text-white py-3 px-8 rounded-lg font-semibold text-lg transition-colors duration-200"
                  >
                    {submitInquiry.isLoading ? 'Submitting...' : 'Submit Inquiry'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Or call us directly:</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+919876543210"
              className="inline-flex items-center text-[#1B4D8C] hover:text-[#163D72] font-semibold transition-colors duration-200"
            >
              <Phone size={18} className="mr-2" />
              +91 9876543210
            </a>
            <a 
              href="mailto:info@shrivinayakbajaj.com"
              className="inline-flex items-center text-[#1B4D8C] hover:text-[#163D72] font-semibold transition-colors duration-200"
            >
              <Mail size={18} className="mr-2" />
              info@shrivinayakbajaj.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}