"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Star, ArrowRight } from "lucide-react";

// Dummy products
const products = [
  { id: 1, name: "Smart Watch", price: "$199", img: "https://picsum.photos/300/200?1" },
  { id: 2, name: "Wireless Headphones", price: "$149", img: "https://picsum.photos/300/200?2" },
  { id: 3, name: "Gaming Mouse", price: "$59", img: "https://picsum.photos/300/200?3" },
  { id: 4, name: "Smartphone", price: "$599", img: "https://picsum.photos/300/200?4" },
];

// Slider images
const slides = [
  // Fashion / Clothes
  
  // Smartphones
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80",
  
  // Laptop
  "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80",
  
  // Watch
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      {/* Slider Section */}
      <div className="relative w-full h-[500px] overflow-hidden">
        {slides.map((slide, index) => (
          <motion.img
            key={index}
            src={slide}
            alt={`slide-${index}`}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            transition={{ duration: 1 }}
          />
        ))}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === currentSlide ? "bg-white" : "bg-gray-400"
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Products Section */}
      <section className="py-12 px-6">
        <motion.h2
          className="text-3xl font-bold text-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Featured Products
        </motion.h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              className="bg-white shadow-lg rounded-2xl p-4 hover:shadow-xl cursor-pointer"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <img src={p.img} alt={p.name} className="w-full h-40 object-cover rounded-lg" />
              <h3 className="mt-3 text-lg font-semibold">{p.name}</h3>
              <p className="text-gray-600">{p.price}</p>
              <button className="mt-3 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <ShoppingCart size={18} /> Add to Cart
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-100 py-12 px-6">
        <motion.h2
          className="text-3xl font-bold text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          What Our Customers Say
        </motion.h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {["Amazing quality!", "Fast delivery!", "Great customer service!"].map((text, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-xl shadow-md"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <div className="flex text-yellow-400 mb-2">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} size={18} />
                ))}
              </div>
              <p className="text-gray-700 italic">"{text}"</p>
              <p className="mt-2 font-semibold">- Customer {i + 1}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 px-6 bg-blue-600 text-white text-center">
        <motion.h2
          className="text-3xl font-bold mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Stay Updated!
        </motion.h2>
        <p className="mb-6">Subscribe to our newsletter for the latest deals.</p>
        <div className="flex justify-center gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-lg w-64 text-black"
          />
          <button className="flex items-center gap-2 px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-200">
            Subscribe <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}
