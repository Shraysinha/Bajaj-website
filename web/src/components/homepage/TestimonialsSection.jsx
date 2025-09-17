import { Star } from "lucide-react";

function TestimonialCard({ testimonial }) {
    return (
        <div
            key={testimonial.id}
            className="bg-white rounded-xl p-6 shadow-lg"
        >
            <div className="flex items-center mb-4">
                <div className="flex text-[#FFD700]">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            size={20}
                            className={i < testimonial.rating ? "fill-current" : ""}
                        />
                    ))}
                </div>
            </div>
            <p className="text-gray-600 mb-4 italic">
                "{testimonial.review_text}"
            </p>
            <div>
                <h4 className="font-bold text-gray-900">
                    {testimonial.customer_name}
                </h4>
                {testimonial.bike_name && (
                    <p className="text-[#1B4D8C] text-sm">
                        {testimonial.bike_name} Owner
                    </p>
                )}
            </div>
        </div>
    );
}

export function TestimonialsSection({ testimonials }) {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't take our word for it. Here's what our satisfied customers
            have to say.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
