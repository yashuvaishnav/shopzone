import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/slices/cartSlice"; // ✅ Import action
import type { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";

export const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector((state: RootState) =>
    state.products.products.find((p) => p._id === id)
  );
  const navigate = useNavigate();

  if (!product) return <p>Product not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      {/* Back Button */}
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition"
        >
          {/* Left Arrow Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>
      </div>

      {/* Image */}
      <div className="flex justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-72 h-72 object-cover rounded-lg shadow"
        />
      </div>

      {/* Product Info */}
      <div className="mt-6">
        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
        <p className="text-gray-600 mt-2">{product.description}</p>

        <div className="mt-4 space-y-1">
          <p className="text-lg font-medium text-gray-700">
            Brand: <span className="text-gray-900">{product.brand}</span>
          </p>
          {product.category === "clothing" && (
            <p className="text-lg font-medium text-gray-700">
              Gender: <span className="text-gray-900">{product.gender}</span>
            </p>
          )}
          <p className="text-2xl font-bold text-green-600 mt-2">
            ₹{product.price}
          </p>
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-8 border-t pt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Product Details
        </h2>
        <ul className="list-disc pl-5 space-y-1 text-gray-600">
          <li>Fabric type: 95% Rayon, 5% Spandex</li>
          <li>Care instructions: Machine Wash</li>
          <li>Origin: Imported</li>
          <li>Closure type: Pull On</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex space-x-4">
        <button
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
          onClick={(e) => dispatch(addToCart(product))}
        >
          Add to Cart
        </button>
        <button className="px-6 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg shadow hover:bg-gray-300 transition">
          Buy Now
        </button>
      </div>
    </div>
  );
};
