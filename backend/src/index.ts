import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRouter from "./routes/auth";
import productRouter from "./routes/productRoute";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/user", authRouter);
app.use("/products", productRouter);

if(!process.env.MONGO_URL){
  throw new Error("Mongo URL is missing")
}

// COMPASS_URL
// MONGO_URL

mongoose
  .connect(process.env.COMPASS_URL!)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
  })
  .catch((err) => console.error(err));