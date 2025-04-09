import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  res.json(
    { message: "User created successfully" },
    { token: generateToken(user._id), user }
  );
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password)))
    return res.status(400).json({ message: "Invalid credentials" });

  res.json({
    message: "User logged in successfully",
    token: generateToken(user._id),
    user,
  });
};
