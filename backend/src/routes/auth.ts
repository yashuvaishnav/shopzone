import express from "express";
import bcrypt from "bcrypt";
import User from "../modals/userModel";
import jwt from "jsonwebtoken";

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }
    const extraSecure = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, extraSecure);
    const user = new User({
      name,
      email,
      password : hashedPassword,
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist)
      return res.status(400).json({ message: "Email does not exist" });

    const isMatchPassword = await bcrypt.compare(password, userExist.password);
    if (!isMatchPassword)
      return res.status(400).json({ message: "Wrong Password" });

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in .env file");
    }

    const token = jwt.sign(
      { id: userExist._id, email: userExist.email, isAdmin: userExist.isAdmin },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default authRouter;
