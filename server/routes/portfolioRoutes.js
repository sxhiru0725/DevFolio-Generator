import express from "express";

import {
  createPortfolio,
  getPortfolioByUsername,
  updatePortfolio,
  deletePortfolio,
  getMyPortfolios
} from "../controllers/portfolioController.js";

import { protectOptional, protectRequired } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me/list", protectRequired, getMyPortfolios);
router.post("/", protectOptional, createPortfolio);
router.get("/:username", getPortfolioByUsername);
router.put("/:username", protectOptional, updatePortfolio);
router.delete("/:username", protectOptional, deletePortfolio);

export default router;
