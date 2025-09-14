import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Products from "../pages/Products";
import Cartpage from "../pages/Cartpage";
import Login from "../pages/Login";
import { ProductDetails } from "../pages/ProductDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={<Cartpage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products/:id" element={<ProductDetails />} />
    </Routes>
  );
};

export default AppRoutes;
