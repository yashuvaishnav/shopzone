import express from "express";
import { protect, admin } from "../middelwares/authMiddelware";
import Product from "../modals/productModel";

const productRouter = express.Router();

// Get all products
productRouter.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Create a product (Admin only)
productRouter.post("/addProduct", protect, admin, async (req, res) => {
  try {
    const { name, description, price, image, category, brand, countInStock } =
      req.body;
    console.log("name", name);

    const product = new Product({
      name,
      description,
      price,
      image,
      category,
      brand,
      countInStock,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default productRouter;
