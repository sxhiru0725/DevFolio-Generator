import express from "express";

import {
    createPortfolio,
    getPortfolioByUsername,
    updatePortfolio,
    deletePortfolio,
} from "../controllers/portfolioController.js";

const router = express.Router();

router.post("/", createPortfolio);
router.get("/:username", getPortfolioByUsername);
router.put("/:username", updatePortfolio);
router.delete("/:username", deletePortfolio);

export default router;