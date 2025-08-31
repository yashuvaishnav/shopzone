import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-2xl font-bold text-indigo-600">
            <Link to="/">ShopNow</Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-indigo-600">
              Home
            </Link>
            <Link
              to="/products"
              className="text-gray-700 hover:text-indigo-600"
            >
              Products
            </Link>
            <Link to="/cart" className="text-gray-700 hover:text-indigo-600">
              Cart
            </Link>
            <Link to="/login" className="text-gray-700 hover:text-indigo-600">
              Login / Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none text-2xl"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pb-4 space-y-2">
          <Link to="/" className="block text-gray-700 hover:text-indigo-600">
            Home
          </Link>
          <Link
            to="/products"
            className="block text-gray-700 hover:text-indigo-600"
          >
            Products
          </Link>
          <Link
            to="/cart"
            className="block text-gray-700 hover:text-indigo-600"
          >
            Cart
          </Link>
          <Link
            to="/login"
            className="block text-gray-700 hover:text-indigo-600"
          >
            Login / Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
