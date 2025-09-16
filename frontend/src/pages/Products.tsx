import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { fetchProducts } from "../redux/slices/productSlice";
import { addToCart } from "../redux/slices/cartSlice"; // ✅ Import action
import { useNavigate } from "react-router-dom";
import ElectoricBanner from "../assets/ElectronicBanner.jpg";
import GirlCasualFashionImage from "../assets/GirlCasualFashionImage.webp";
import GirlsFashionImage from "../assets/GirlsFashionImage.jpg";
import Headphone from "../assets/Headphone.jpg";
import { Footer } from "../components/Footer";

const bannerImages = [
  GirlCasualFashionImage,
  GirlsFashionImage,
  Headphone,
  ElectoricBanner,
];

const Products: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p className="text-center mt-10">Loading products...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Products</h1>

      {/* ✅ Banner Slider */}
      <div className="relative w-full max-w-5xl mx-auto mb-8 overflow-hidden rounded-lg shadow-lg">
        <div
          className="flex transition-transform duration-700"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {bannerImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Banner ${idx + 1}`}
              className="w-full h-[180px] md:h-[220px] lg:h-[280px] flex-shrink-0 object-fill"
            />
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={() =>
            setCurrentSlide(
              (prev) => (prev - 1 + bannerImages.length) % bannerImages.length
            )
          }
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
        >
          ❮
        </button>

        <button
          onClick={() =>
            setCurrentSlide((prev) => (prev + 1) % bannerImages.length)
          }
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
        >
          ❯
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
          {bannerImages.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                currentSlide === idx ? "bg-white" : "bg-gray-400"
              }`}
              onClick={() => setCurrentSlide(idx)}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full max-w-4xl mx-auto border border-gray-200 rounded-lg px-4 py-3 bg-white shadow">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search Product"
          className="flex-1 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        {/* Category Dropdown */}
        <select className="ml-0 md:ml-3 border border-gray-200 rounded-md px-2 py-2 text-sm text-gray-700 cursor-pointer hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
          <option value="">Filter Category</option>
          <option value="clothing">Clothing</option>
          <option value="electronics">Electronics</option>
          <option value="others">Others</option>
        </select>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="relative border rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-xl hover:-translate-y-1 transition transform bg-white hover:cursor-pointer"
            onClick={() => navigate(`/products/${product._id}`)}
          >
            {/* Wishlist button */}
            <button
              className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-red-500 transition"
              onClick={(e) => {
                e.stopPropagation(); // prevents navigating to product details
                // dispatch(addToWishlist(product)); // ✅ Redux action
              }}
            >
              ♥
            </button>

            {/* Product image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-32 h-32 object-contain mb-4"
            />

            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600 text-sm">{product.category}</p>
            <p className="text-gray-800 font-bold mt-2">₹{product.price}</p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(addToCart(product));
              }}
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Products;
