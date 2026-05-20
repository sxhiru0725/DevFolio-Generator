import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "dev_secret_key", {
    expiresIn: "7d"
  });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required."
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "An account with this email already exists."
      });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password
    });

    res.status(201).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email?.toLowerCase() });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user
  });
};
