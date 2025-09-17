"use client";
import { useState, useCallback } from "react";

import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { HeroSection } from "../components/homepage/HeroSection";
import { BikeShowcaseSection } from "../components/homepage/BikeShowcaseSection";
import { OffersSection } from "../components/homepage/OffersSection";
import { AchievementsSection } from "../components/homepage/AchievementsSection";
import { VideosSection } from "../components/homepage/VideosSection";
import { TestimonialsSection } from "../components/homepage/TestimonialsSection";
import { ContactSection } from "../components/homepage/ContactSection";

// Hardcoded bikes data
const bikesData = [
  {
    id: 1,
    name: "Bajaj Pulsar N160",
    model: "N160",
    price_min: 118000,
    price_max: 125000,
    engine: "160cc, Single Cylinder",
    mileage: "45-50 kmpl",
    torque: "14.6 Nm @ 6500 RPM",
    colors: ["Fiery Red", "Racing Blue", "Charcoal Black"],
    variants: ["Single Disc", "Double Disc"],
    description:
      "The new Pulsar N160 delivers the perfect balance of power and efficiency. Built for the modern rider who demands performance without compromise.",
    key_features: [
      "LED Headlamp",
      "Digital Console",
      "Tubeless Tyres",
      "Single Channel ABS",
    ],
    image_url:
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600",
    brochure_url: "/brochures/pulsar-n160.pdf",
    category: "motorcycle",
  },
  {
    id: 2,
    name: "Bajaj Pulsar NS200",
    model: "NS200",
    price_min: 145000,
    price_max: 155000,
    engine: "199.5cc, Single Cylinder",
    mileage: "35-40 kmpl",
    torque: "18.5 Nm @ 8000 RPM",
    colors: ["Burnt Red", "Fiery Yellow", "Graphite Black"],
    variants: ["Standard", "ABS"],
    description:
      "The naked street fighter that redefined performance biking in India. Raw power meets aggressive styling in this ultimate street machine.",
    key_features: [
      "Liquid Cooling",
      "Triple Spark Technology",
      "Perimeter Frame",
      "Nitrox Suspension",
    ],
    image_url:
      "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600",
    brochure_url: "/brochures/pulsar-ns200.pdf",
    category: "motorcycle",
  },
  {
    id: 3,
    name: "Bajaj Dominar 400",
    model: "D400",
    price_min: 220000,
    price_max: 235000,
    engine: "373.3cc, Single Cylinder",
    mileage: "25-30 kmpl",
    torque: "35 Nm @ 6500 RPM",
    colors: ["Aurora Green", "Vine Black", "Canyon Red"],
    variants: ["Standard", "Touring"],
    description:
      "Built for highways and long rides. The Dominar 400 is your perfect companion for adventure touring with comfort and performance.",
    key_features: [
      "LED Lighting",
      "USD Forks",
      "Dual Channel ABS",
      "Slipper Clutch",
    ],
    image_url:
      "https://images.unsplash.com/photo-1599819177107-2bbe6c0231f0?w=600",
    brochure_url: "/brochures/dominar-400.pdf",
    category: "motorcycle",
  },
  {
    id: 4,
    name: "Bajaj Platina 110",
    model: "H-Gear",
    price_min: 75000,
    price_max: 82000,
    engine: "115.45cc, Single Cylinder",
    mileage: "70-75 kmpl",
    torque: "9.81 Nm @ 5500 RPM",
    colors: ["Ebony Black", "Cocktail Wine Red", "Pearl White"],
    variants: ["Standard", "H-Gear"],
    description:
      "India's most fuel-efficient motorcycle. Perfect for daily commuting with exceptional mileage and comfort.",
    key_features: [
      "ComforTec Technology",
      "LED DRL",
      "Anti-Skid Seat",
      "Long Seat",
    ],
    image_url:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600",
    brochure_url: "/brochures/platina-110.pdf",
    category: "motorcycle",
  },
  {
    id: 5,
    name: "Bajaj CT 125X",
    model: "CT125X",
    price_min: 85000,
    price_max: 92000,
    engine: "124.4cc, Single Cylinder",
    mileage: "65-70 kmpl",
    torque: "10.8 Nm @ 6500 RPM",
    colors: ["Ebony Black", "Lime Green", "Imperial Red"],
    variants: ["Kick Start", "Electric Start"],
    description:
      "The perfect blend of power and efficiency for urban commuting. Rugged design meets modern performance.",
    key_features: [
      "All Terrain Tyres",
      "High Ground Clearance",
      "Robust Build",
      "Maintenance Free Battery",
    ],
    image_url:
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600",
    brochure_url: "/brochures/ct-125x.pdf",
    category: "motorcycle",
  },
  {
    id: 6,
    name: "Bajaj Avenger Street 160",
    model: "Street 160",
    price_min: 115000,
    price_max: 125000,
    engine: "160cc, Single Cylinder",
    mileage: "45-50 kmpl",
    torque: "13.5 Nm @ 6500 RPM",
    colors: ["Spicy Red", "Ebony Black", "Moon White"],
    variants: ["Standard"],
    description:
      "Experience the freedom of cruising with the Avenger Street 160. Designed for comfort on long rides with classic cruiser styling.",
    key_features: [
      "Relaxed Riding Posture",
      "Chrome Exhaust",
      "Backrest",
      "Wide Handlebars",
    ],
    image_url:
      "https://images.unsplash.com/photo-1558440840-13573b1d0de5?w=600",
    brochure_url: "/brochures/avenger-street-160.pdf",
    category: "motorcycle",
  },
];

// Hardcoded testimonials data
const testimonialsData = [
  {
    id: 1,
    customer_name: "Rajesh Kumar",
    rating: 5,
    review_text:
      "Excellent service and genuine parts. Mr. Vinayak and his team made my bike purchase experience smooth and hassle-free. Highly recommended!",
    bike_name: "Pulsar NS200",
    created_at: "2024-01-15",
  },
  {
    id: 2,
    customer_name: "Priya Sharma",
    rating: 5,
    review_text:
      "Best Bajaj showroom in the city! Got my Platina 110 here and the after-sales service is outstanding. Very professional and trustworthy.",
    bike_name: "Platina 110",
    created_at: "2024-02-08",
  },
  {
    id: 3,
    customer_name: "Amit Singh",
    rating: 4,
    review_text:
      "Great experience buying my Dominar 400. The team explained all features clearly and provided excellent financing options. Will definitely recommend to friends.",
    bike_name: "Dominar 400",
    created_at: "2024-02-20",
  },
  {
    id: 4,
    customer_name: "Sneha Patel",
    rating: 5,
    review_text:
      "Amazing customer service! They helped me choose the perfect bike for my daily commute. The test ride was well organized and the delivery was on time.",
    bike_name: "Pulsar N160",
    created_at: "2024-03-05",
  },
  {
    id: 5,
    customer_name: "Vikram Gupta",
    rating: 5,
    review_text:
      "Purchased my CT 125X from here and couldn't be happier. Fair pricing, genuine accessories, and prompt service. Truly a reliable dealership.",
    bike_name: "CT 125X",
    created_at: "2024-03-12",
  },
  {
    id: 6,
    customer_name: "Deepika Jain",
    rating: 4,
    review_text:
      "Very satisfied with my Avenger Street 160 purchase. The showroom staff was knowledgeable and helped me get the best deal. Professional service throughout.",
    bike_name: "Avenger Street 160",
    created_at: "2024-03-18",
  },
];

export default function Homepage() {
  const [compareList, setCompareList] = useState([]);

  const bikes = bikesData;
  const testimonials = testimonialsData;

  const toggleCompare = useCallback((bikeId) => {
    setCompareList((prev) => {
      if (prev.includes(bikeId)) {
        return prev.filter((id) => id !== bikeId);
      } else if (prev.length < 3) {
        return [...prev, bikeId];
      }
      return prev;
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <BikeShowcaseSection
          bikes={bikes}
          compareList={compareList}
          onToggleCompare={toggleCompare}
        />
        <OffersSection />
        <AchievementsSection />
        <VideosSection />
        <TestimonialsSection testimonials={testimonials} />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
