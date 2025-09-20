"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Star, ArrowRight, Timer, Shield, Headphones, Truck } from "lucide-react";

// Dummy products
const products = [
  { id: 1, name: "Smart Watch", price: "$199", img: "https://picsum.photos/300/200?1" },
  { id: 2, name: "Wireless Headphones", price: "$149", img: "https://picsum.photos/300/200?2" },
  { id: 3, name: "Gaming Mouse", price: "$59", img: "https://picsum.photos/300/200?3" },
  { id: 4, name: "Smartphone", price: "$599", img: "https://picsum.photos/300/200?4" },
];

// Categories
const categories = [
  { id: 1, name: "Electronics", img: "https://picsum.photos/200/200?11" },
  { id: 2, name: "Fashion", img: "https://picsum.photos/200/200?12" },
  { id: 3, name: "Home", img: "https://picsum.photos/200/200?13" },
  { id: 4, name: "Fitness", img: "https://picsum.photos/200/200?14" },
];

// Slider images
const slides = [
  "https://picsum.photos/1200/500?5",
  "https://picsum.photos/1200/500?6",
  "https://picsum.photos/1200/500?7",
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

      {/* Categories Section */}
      <section className="py-12 px-6">
        <motion.h2
          className="text-3xl font-bold text-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Shop by Category
        </motion.h2>
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              className="bg-white shadow-md rounded-xl overflow-hidden cursor-pointer hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <img src={cat.img} alt={cat.name} className="w-full h-32 object-cover" />
              <h3 className="text-center py-3 font-semibold">{cat.name}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Deal of the Day */}
      <section className="bg-red-600 text-white py-12 text-center">
        <motion.h2
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Deal of the Day 🎉
        </motion.h2>
        <p className="mb-6">Get the <span className="font-semibold">Smart Watch</span> for only <span className="font-bold">$149</span></p>
        <div className="flex justify-center items-center gap-6 text-lg font-mono">
          <Timer /> <span>02 : 15 : 43 left</span>
        </div>
        <button className="mt-6 px-6 py-2 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100">
          Shop Now
        </button>
      </section>

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

      {/* Why Choose Us */}
      <section className="bg-gray-100 py-12 px-6">
        <motion.h2
          className="text-3xl font-bold text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Why Shop With Us?
        </motion.h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-center">
          {[
            { icon: <Truck size={40} />, title: "Free Shipping" },
            { icon: <Shield size={40} />, title: "Secure Payments" },
            { icon: <Headphones size={40} />, title: "24/7 Support" },
            { icon: <Star size={40} />, title: "Top Quality" },
          ].map((f, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-xl shadow-md"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <div className="flex justify-center text-blue-600 mb-3">{f.icon}</div>
              <h3 className="font-semibold">{f.title}</h3>
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

      {/* Footer */}
      
    </div>
  );
}
