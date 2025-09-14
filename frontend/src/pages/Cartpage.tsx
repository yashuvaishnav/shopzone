import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { addToCart, removeFromCart, clearCart } from "../redux/slices/cartSlice";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);

  // Calculate total
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.qty, 0);

  if (items.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-semibold">Your cart is empty 🛒</h2>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg"
            />

            {/* Product Info */}
            <div className="flex-1 ml-4">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-500">₹{item.price}</p>
              <p className="text-gray-400 text-sm">Qty: {item.qty}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                className="px-2 py-1 bg-gray-200 rounded"
                onClick={() => dispatch(addToCart(item))}
              >
                ➕
              </button>
              <button
                className="px-2 py-1 bg-red-200 rounded"
                onClick={() => dispatch(removeFromCart(item._id))}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-6 flex justify-between items-center">
        <h3 className="text-xl font-bold">Total: ₹{totalPrice.toFixed(2)}</h3>
        <button
          className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
          onClick={() => alert("Proceeding to Checkout...")}
        >
          Checkout
        </button>
      </div>

      {/* Clear Cart */}
      <div className="mt-4 text-right">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
          onClick={() => dispatch(clearCart())}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
