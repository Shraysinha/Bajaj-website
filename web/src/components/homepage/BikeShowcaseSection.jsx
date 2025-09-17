import { ArrowRight, Download } from "lucide-react";

function BikeCard({ bike, compareList, onToggleCompare }) {
  return (
    <div
      key={bike.id}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      <div className="relative">
        <img
          src={bike.image_url}
          alt={bike.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 right-4">
          <button
            onClick={() => onToggleCompare(bike.id)}
            className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors duration-200 ${
              compareList.includes(bike.id)
                ? "bg-[#1B4D8C] text-white"
                : "bg-white/90 text-[#1B4D8C] hover:bg-[#1B4D8C] hover:text-white"
            }`}
          >
            {compareList.includes(bike.id)
              ? "Added to Compare"
              : "Compare"}
          </button>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{bike.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{bike.description}</p>
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <span className="font-semibold text-gray-700">Engine:</span>
            <p className="text-gray-600">{bike.engine}</p>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Mileage:</span>
            <p className="text-gray-600">{bike.mileage}</p>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-[#1B4D8C]">
              ₹{bike.price_min.toLocaleString()}
            </span>
            {bike.price_max !== bike.price_min && (
              <span className="text-gray-600">
                {" "}
                - ₹{bike.price_max.toLocaleString()}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <a
            href={`/bikes/${bike.id}`}
            className="flex-1 bg-[#1B4D8C] hover:bg-[#163D72] text-white px-4 py-2 rounded-lg font-semibold text-center transition-colors duration-200"
          >
            View Details
          </a>
          <button className="px-4 py-2 border border-[#1B4D8C] text-[#1B4D8C] hover:bg-[#1B4D8C] hover:text-white rounded-lg font-semibold transition-colors duration-200">
            <Download size={16} className="inline mr-1" />
            Brochure
          </button>
        </div>
      </div>
    </div>
  );
}


export function BikeShowcaseSection({ bikes, compareList, onToggleCompare }) {
  return (
    <section id="bikes" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our Bike Collection
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive range of Bajaj motorcycles, from
            efficient commuters to powerful sports bikes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bikes.map((bike) => (
            <BikeCard key={bike.id} bike={bike} compareList={compareList} onToggleCompare={onToggleCompare} />
          ))}
        </div>

        {compareList.length > 0 && (
          <div className="mt-8 text-center">
            <a
              href={`/compare?bikes=${compareList.join(",")}`}
              className="inline-flex items-center bg-[#1B4D8C] hover:bg-[#163D72] text-white px-6 py-3 rounded-full font-semibold transition-colors duration-200"
            >
              Compare Selected Bikes ({compareList.length})
              <ArrowRight size={20} className="ml-2" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
