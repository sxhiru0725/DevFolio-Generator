import Portfolio from "../models/Portfolio.js";

const cleanArray = (arr) => {
    if (!Array.isArray(arr)) return [];
    return arr.map((item) => String(item).trim()).filter(Boolean);
};

const normalisePortfolioData = (data) => {
    return {
        username: String(data.username || "").toLowerCase().trim(),
        fullName: String(data.fullName || "").trim(),
        title: String(data.title || "").trim(),
        bio: String(data.bio || "").trim(),
        profileImage: String(data.profileImage || "").trim(),
        contact: {
            email: String(data.contact?.email || "").trim(),
            linkedin: String(data.contact?.linkedin || "").trim(),
            github: String(data.contact?.github || "").trim(),
            website: String(data.contact?.website || "").trim(),
        },
        skills: cleanArray(data.skills),
        projects: Array.isArray(data.projects)
            ? data.projects
                .filter((project) => project.name || project.description)
                .map((project) => ({
                    name: String(project.name || "").trim(),
                    description: String(project.description || "").trim(),
                    techStack: cleanArray(project.techStack),
                    githubLink: String(project.githubLink || "").trim(),
                    liveDemo: String(project.liveDemo || "").trim(),
                }))
            : [],
        experience: Array.isArray(data.experience)
            ? data.experience
                .filter((item) => item.company || item.role || item.description)
                .map((item) => ({
                    company: String(item.company || "").trim(),
                    role: String(item.role || "").trim(),
                    duration: String(item.duration || "").trim(),
                    description: String(item.description || "").trim(),
                }))
            : [],
    };
};

export const createPortfolio = async (req, res) => {
    try {
        const data = normalisePortfolioData(req.body);

        const existingPortfolio = await Portfolio.findOne({ username: data.username });

        if (existingPortfolio) {
            return res.status(409).json({ message: "Username already exists" });
        }

        const portfolio = await Portfolio.create(data);

        return res.status(201).json({
            message: "Portfolio created successfully",
            portfolio,
        });
    } catch (error) {
        return res.status(400).json({
            message: "Failed to create portfolio",
            error: error.message,
        });
    }
};

export const getPortfolio = async (req, res) => {
    try {
        const { username } = req.params;

        const portfolio = await Portfolio.findOneAndUpdate(
            { username: username.toLowerCase() },
            { $inc: { viewCount: 1 } },
            { new: true }
        );

        if (!portfolio) {
            return res.status(404).json({ message: "Portfolio not found" });
        }

        return res.status(200).json(portfolio);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch portfolio",
            error: error.message,
        });
    }
};

export const updatePortfolio = async (req, res) => {
    try {
        const { username } = req.params;
        const data = normalisePortfolioData(req.body);

        delete data.username;

        const updatedPortfolio = await Portfolio.findOneAndUpdate(
            { username: username.toLowerCase() },
            data,
            {
                returnDocument: "after",
                runValidators: true,
            }
        );

        if (!updatedPortfolio) {
            return res.status(404).json({ message: "Portfolio not found" });
        }

        return res.status(200).json({
            message: "Portfolio updated successfully",
            portfolio: updatedPortfolio,
        });
    } catch (error) {
        return res.status(400).json({
            message: "Failed to update portfolio",
            error: error.message,
        });
    }
};

export const deletePortfolio = async (req, res) => {
    try {
        const { username } = req.params;

        const deletedPortfolio = await Portfolio.findOneAndDelete({
            username: username.toLowerCase(),
        });

        if (!deletedPortfolio) {
            return res.status(404).json({ message: "Portfolio not found" });
        }

        return res.status(200).json({ message: "Portfolio deleted successfully" });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to delete portfolio",
            error: error.message,
        });
    }
};
