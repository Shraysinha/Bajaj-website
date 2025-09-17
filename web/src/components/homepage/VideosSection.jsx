import { Youtube, Instagram } from "lucide-react";

export function VideosSection() {
  return (
    <section id="videos" className="py-16 lg:py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Latest Videos
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Watch our latest bike reviews, test rides, and showroom updates.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="relative rounded-xl overflow-hidden shadow-lg group">
            <iframe
              width="100%"
              height="300"
              src="https://www.youtube.com/embed/UxYcRwwIXG0"
              title="Bajaj Latest Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full"
            ></iframe>
          </div>
          <div className="relative rounded-xl overflow-hidden shadow-lg group">
            <iframe
              width="100%"
              height="300"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Showroom Tour"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full"
            ></iframe>
          </div>
        </div>
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://youtube.com/@bajaj"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[#FF0000] hover:bg-[#CC0000] text-white px-6 py-3 rounded-full font-semibold transition-colors duration-200"
            >
              <Youtube size={20} className="mr-2" />
              Visit our YouTube Channel
            </a>
            <a
              href="https://instagram.com/shrivinayakbajaj"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gradient-to-r from-[#F56565] to-[#FC8181] hover:from-[#E53E3E] hover:to-[#FC8181] text-white px-6 py-3 rounded-full font-semibold transition-colors duration-200"
            >
              <Instagram size={20} className="mr-2" />
              Follow on Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
