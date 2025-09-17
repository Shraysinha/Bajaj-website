import { Star } from "lucide-react";

export function AchievementsSection() {
  return (
    <section id="achievements" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Meet Our Founder
            </h2>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-start space-x-6">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
                  alt="Showroom Owner"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Mr. Vinayak Sharma
                  </h3>
                  <p className="text-[#1B4D8C] font-semibold mb-4">
                    Founder & Managing Director
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    With over 15 years of experience in the automobile
                    industry, Mr. Sharma has built Shri Vinayak Bajaj from a
                    small showroom to the most trusted Bajaj dealership in the
                    region. His commitment to customer satisfaction and
                    genuine service has earned numerous accolades.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Our Achievements
            </h3>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-6 shadow-md flex items-center">
                <div className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center mr-4">
                  <Star size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">
                    Best Dealer Award 2023
                  </h4>
                  <p className="text-gray-600">Awarded by Bajaj Auto Ltd.</p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md flex items-center">
                <div className="w-12 h-12 bg-[#1B4D8C] rounded-full flex items-center justify-center mr-4">
                  <Star size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">
                    Customer Service Excellence
                  </h4>
                  <p className="text-gray-600">
                    5-star rating for 3 consecutive years
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md flex items-center">
                <div className="w-12 h-12 bg-[#FF6B6B] rounded-full flex items-center justify-center mr-4">
                  <Star size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">
                    Sales Achievement Award
                  </h4>
                  <p className="text-gray-600">
                    Highest sales volume in North Zone
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
