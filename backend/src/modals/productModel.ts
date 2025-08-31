import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string; // e.g. "clothing", "electronics"
  brand: string;
  countInStock: number;
  gender?: string;
  size?: string; 
  ageGroup?: string;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["clothing", "electronics", "other"],
    },
    brand: {
      type: String,
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },

    // Clothing-specific fields (optional)
    gender: {
      type: String,
      enum: ["male", "female", "unisex"],
      required:false
    },
    size: {
      type: String,
      enum: ["XS", "S", "M", "L", "XL", "XXL"],
      required:false
    },
    ageGroup: {
      type: String,
      enum: ["kids", "teens", "adults"],
      required:false
    },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", productSchema);



