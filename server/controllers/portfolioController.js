import Portfolio from "../models/Portfolio.js";

const cleanPortfolioBody = (body) => {
  const username = body.username?.toLowerCase().trim();

  return {
    ...body,
    username,
    skills: Array.isArray(body.skills) ? body.skills.filter(Boolean) : [],
    projects: Array.isArray(body.projects) ? body.projects : [],
    experience: Array.isArray(body.experience) ? body.experience : []
  };
};

export const createPortfolio = async (req, res) => {
  try {
    const cleanedBody = cleanPortfolioBody(req.body);

    const existingPortfolio = await Portfolio.findOne({
      username: cleanedBody.username
    });

    if (existingPortfolio) {
      return res.status(400).json({
        success: false,
        message: "Username already exists. Please choose another username."
      });
    }

    const portfolio = await Portfolio.create({
      ...cleanedBody,
      owner: req.user?._id || undefined
    });

    res.status(201).json({
      success: true,
      message: "Portfolio created successfully",
      data: portfolio
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
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
        message: "Portfolio not found"
      });
    }

    res.status(200).json({
      success: true,
      data: portfolio
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updatePortfolio = async (req, res) => {
  try {
    const cleanedBody = cleanPortfolioBody(req.body);

    const existing = await Portfolio.findOne({
      username: req.params.username.toLowerCase()
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found"
      });
    }

    if (existing.owner && (!req.user || existing.owner.toString() !== req.user._id.toString())) {
      return res.status(403).json({
        success: false,
        message: "You are not authorised to modify this portfolio."
      });
    }

    if (cleanedBody.username && cleanedBody.username !== req.params.username.toLowerCase()) {
      const existingWithNewName = await Portfolio.findOne({
        username: cleanedBody.username
      });

      if (existingWithNewName) {
        return res.status(400).json({
          success: false,
          message: "Username already exists. Please choose another username."
        });
      }
    }

    const portfolio = await Portfolio.findOneAndUpdate(
      { username: req.params.username.toLowerCase() },
      cleanedBody,
      {
        returnDocument: "after",
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: "Portfolio updated successfully",
      data: portfolio
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const deletePortfolio = async (req, res) => {
  try {
    const existing = await Portfolio.findOne({
      username: req.params.username.toLowerCase()
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found"
      });
    }

    if (existing.owner && (!req.user || existing.owner.toString() !== req.user._id.toString())) {
      return res.status(403).json({
        success: false,
        message: "You are not authorised to delete this portfolio."
      });
    }

    await Portfolio.deleteOne({
      username: req.params.username.toLowerCase()
    });

    res.status(200).json({
      success: true,
      message: "Portfolio deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getMyPortfolios = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(200).json({
        success: true,
        data: []
      });
    }

    const portfolios = await Portfolio.find({ owner: req.user._id }).sort({
      createdAt: -1
    });

    res.status(200).json({
      success: true,
      data: portfolios
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
