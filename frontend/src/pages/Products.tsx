import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { fetchProducts } from "../redux/slices/productSlice";
import { addToCart } from "../redux/slices/cartSlice"; // ✅ Import action
import { useNavigate } from "react-router-dom";

const Products: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p className="text-center mt-10">Loading products...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg transition"
            onClick={() => navigate(`/products/${product._id}`)}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-32 h-32 object-cover mb-4"
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600 text-sm">{product.category}</p>
            <p className="text-gray-800 font-bold mt-2">₹{product.price}</p>

            {/* ✅ Add to Cart button works now */}
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
    </div>
  );
};

export default Products;
