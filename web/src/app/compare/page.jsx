import { useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Plus, X, Check, ArrowRight } from "lucide-react";

export default function ComparePage() {
  const [selectedBikes, setSelectedBikes] = useState([]);
  const [isAddingBike, setIsAddingBike] = useState(false);

  // Get bikes from URL params on load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const bikeIds = urlParams.get("bikes");
    if (bikeIds) {
      const ids = bikeIds
        .split(",")
        .map((id) => parseInt(id))
        .filter((id) => !isNaN(id));
      setSelectedBikes(ids.slice(0, 3)); // Limit to 3 bikes
    }
  }, []);

  // Navigate back to home page
  const navigateHome = useCallback(() => {
    window.location.href = "/";
  }, []);

  // Fetch all bikes for selection
  const { data: bikesData } = useQuery({
    queryKey: ["bikes"],
    queryFn: async () => {
      const response = await fetch("/api/bikes");
      if (!response.ok) {
        throw new Error("Failed to fetch bikes");
      }
      return response.json();
    },
  });

  // Fetch selected bikes details
  const { data: selectedBikesData, isLoading: isLoadingSelected } = useQuery({
    queryKey: ["compare-bikes", selectedBikes],
    queryFn: async () => {
      if (selectedBikes.length === 0) return [];

      const bikePromises = selectedBikes.map(async (id) => {
        const response = await fetch(`/api/bikes/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch bike ${id}`);
        }
        const data = await response.json();
        return data.bike;
      });

      return Promise.all(bikePromises);
    },
    enabled: selectedBikes.length > 0,
  });

  const bikes = bikesData?.bikes || [];
  const compareData = selectedBikesData || [];
  const availableBikes = bikes.filter(
    (bike) => !selectedBikes.includes(bike.id),
  );

  const addBike = useCallback(
    (bikeId) => {
      if (selectedBikes.length < 3 && !selectedBikes.includes(bikeId)) {
        setSelectedBikes((prev) => [...prev, bikeId]);
        setIsAddingBike(false);
      }
    },
    [selectedBikes],
  );

  const removeBike = useCallback((bikeId) => {
    setSelectedBikes((prev) => prev.filter((id) => id !== bikeId));
  }, []);

  const comparisonCategories = [
    {
      title: "Basic Information",
      fields: [
        { key: "name", label: "Model Name" },
        {
          key: "price_range",
          label: "Price Range",
          format: (bike) =>
            `₹${bike.price_min.toLocaleString()} - ₹${bike.price_max.toLocaleString()}`,
        },
        {
          key: "category",
          label: "Category",
          format: (bike) =>
            bike.category.charAt(0).toUpperCase() + bike.category.slice(1),
        },
      ],
    },
    {
      title: "Engine & Performance",
      fields: [
        { key: "engine", label: "Engine" },
        { key: "mileage", label: "Mileage" },
        { key: "torque", label: "Torque" },
      ],
    },
    {
      title: "Variants & Colors",
      fields: [
        {
          key: "variants",
          label: "Variants",
          format: (bike) => bike.variants.join(", "),
        },
        {
          key: "colors",
          label: "Colors Available",
          format: (bike) => bike.colors.join(", "),
        },
      ],
    },
    {
      title: "Key Features",
      fields: [
        {
          key: "key_features",
          label: "Features",
          format: (bike) => bike.key_features,
        },
      ],
    },
  ];

  if (selectedBikes.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="border-b border-gray-200 bg-white sticky top-0 z-50">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={navigateHome}
                  className="flex items-center text-[#1B4D8C] hover:text-[#163D72] transition-colors duration-200"
                >
                  <ArrowLeft size={20} className="mr-2" />
                  Back to Home
                </button>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Compare Bikes</h1>
              <div></div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ArrowRight size={32} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Select Bikes to Compare
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Choose up to 3 bikes from our collection to compare their
              features, specifications, and pricing side by side.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bikes.map((bike) => (
                <div
                  key={bike.id}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-200"
                >
                  <img
                    src={bike.image_url}
                    alt={bike.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {bike.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {bike.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-[#1B4D8C]">
                      ₹{bike.price_min.toLocaleString()}
                    </div>
                    <button
                      onClick={() => addBike(bike.id)}
                      className="bg-[#1B4D8C] hover:bg-[#163D72] text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
                    >
                      Add to Compare
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoadingSelected) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#1B4D8C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading comparison...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={navigateHome}
                className="flex items-center text-[#1B4D8C] hover:text-[#163D72] transition-colors duration-200"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back to Home
              </button>
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              Compare Bikes ({selectedBikes.length}/3)
            </h1>
            <div className="flex items-center space-x-2">
              {selectedBikes.length < 3 && (
                <button
                  onClick={() => setIsAddingBike(true)}
                  className="flex items-center text-[#1B4D8C] hover:text-[#163D72] font-semibold transition-colors duration-200"
                >
                  <Plus size={16} className="mr-1" />
                  Add Bike
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Bike Modal */}
      {isAddingBike && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  Add Bike to Compare
                </h2>
                <button
                  onClick={() => setIsAddingBike(false)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableBikes.map((bike) => (
                  <div
                    key={bike.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <img
                      src={bike.image_url}
                      alt={bike.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {bike.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {bike.description}
                    </p>
                    <button
                      onClick={() => addBike(bike.id)}
                      className="w-full bg-[#1B4D8C] hover:bg-[#163D72] text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-200"
                    >
                      Add to Compare
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Bikes Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {compareData.map((bike, index) => (
            <div
              key={bike.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden"
            >
              <div className="relative">
                <img
                  src={bike.image_url}
                  alt={bike.name}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => removeBike(bike.id)}
                  className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full transition-colors duration-200"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {bike.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {bike.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-[#1B4D8C]">
                    ₹{bike.price_min.toLocaleString()}
                    {bike.price_max !== bike.price_min && (
                      <span className="text-lg text-gray-600">
                        {" "}
                        - ₹{bike.price_max.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
                <a
                  href={`/bikes/${bike.id}`}
                  className="w-full bg-[#1B4D8C] hover:bg-[#163D72] text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-200 text-center block"
                >
                  View Details
                </a>
              </div>
            </div>
          ))}

          {/* Add More Bikes Placeholder */}
          {selectedBikes.length < 3 && (
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl h-full min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus size={24} className="text-gray-400" />
                </div>
                <h4 className="text-lg font-semibold text-gray-600 mb-2">
                  Add Another Bike
                </h4>
                <p className="text-gray-500 mb-4">Compare up to 3 bikes</p>
                <button
                  onClick={() => setIsAddingBike(true)}
                  className="bg-[#1B4D8C] hover:bg-[#163D72] text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
                >
                  Add Bike
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Detailed Comparison Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">
              Detailed Comparison
            </h2>
          </div>

          {comparisonCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              {/* Category Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  {category.title}
                </h3>
              </div>

              {/* Category Fields */}
              {category.fields.map((field, fieldIndex) => (
                <div key={fieldIndex} className="border-b border-gray-200">
                  <div className="grid grid-cols-1 lg:grid-cols-4 min-h-[60px]">
                    {/* Field Label */}
                    <div className="bg-gray-50 lg:bg-transparent px-6 py-4 flex items-center border-b lg:border-b-0 lg:border-r border-gray-200">
                      <span className="font-semibold text-gray-900">
                        {field.label}
                      </span>
                    </div>

                    {/* Bike Values */}
                    {compareData.map((bike, bikeIndex) => (
                      <div
                        key={bike.id}
                        className="px-6 py-4 flex items-center"
                      >
                        {field.key === "key_features" ? (
                          <div className="space-y-1">
                            {field.format(bike).map((feature, featureIndex) => (
                              <div
                                key={featureIndex}
                                className="flex items-center text-sm"
                              >
                                <Check
                                  size={14}
                                  className="text-green-600 mr-2 flex-shrink-0"
                                />
                                <span className="text-gray-700">{feature}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-900">
                            {field.format
                              ? field.format(bike)
                              : bike[field.key]}
                          </span>
                        )}
                      </div>
                    ))}

                    {/* Empty cells for remaining slots */}
                    {Array.from({ length: 3 - compareData.length }).map(
                      (_, emptyIndex) => (
                        <div
                          key={`empty-${emptyIndex}`}
                          className="px-6 py-4 bg-gray-50"
                        >
                          <span className="text-gray-400">-</span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setSelectedBikes([])}
              className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-semibold transition-colors duration-200"
            >
              Clear All
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="bg-[#1B4D8C] hover:bg-[#163D72] text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
