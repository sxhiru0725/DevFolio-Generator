import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Developer Portfolio Generator API is running",
    endpoints: {
      auth: "/api/auth",
      portfolio: "/api/portfolio",
      upload: "/api/upload"
    }
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/upload", uploadRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
