import Portfolio from "../models/Portfolio.js";

export const createPortfolio = async (req, res) => {
  try {
    const username = req.body.username.toLowerCase().trim();

    const existingPortfolio = await Portfolio.findOne({ username });

    if (existingPortfolio) {
      return res.status(400).json({
        success: false,
        message: "Username already exists. Please choose another username.",
      });
    }

    const portfolio = await Portfolio.create({
      ...req.body,
      username,
    });

    res.status(201).json({
      success: true,
      message: "Portfolio created successfully",
      data: portfolio,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPortfolioByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const portfolio = await Portfolio.findOneAndUpdate(
      { username: username.toLowerCase() },
      { $inc: { viewCount: 1 } },
      { returnDocument: "after" }
    );

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    res.status(200).json({
      success: true,
      data: portfolio,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updatePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      { username: req.params.username.toLowerCase() },
      req.body,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Portfolio updated successfully",
      data: portfolio,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOneAndDelete({
      username: req.params.username.toLowerCase(),
    });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Portfolio deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};