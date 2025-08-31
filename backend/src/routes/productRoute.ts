import express from "express";
import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productControllar";
import { protect, admin } from "../middelwares/authMiddelware"; // assuming you already made these

const productRouter = express.Router();

// Public routes
productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);

// Admin routes
productRouter.post("/addProduct", protect, admin, addProduct);
productRouter.put("/:id", protect, admin, updateProduct);
productRouter.delete("/:id", protect, admin, deleteProduct);

export default productRouter;
