import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Project name is required"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Project description is required"],
            trim: true,
        },
        techStack: {
            type: [String],
            default: [],
        },
        githubLink: {
            type: String,
            trim: true,
            default: "",
        },
        liveDemo: {
            type: String,
            trim: true,
            default: "",
        },
    },
    { _id: false }
);

const experienceSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            trim: true,
            default: "",
        },
        role: {
            type: String,
            trim: true,
            default: "",
        },
        duration: {
            type: String,
            trim: true,
            default: "",
        },
        description: {
            type: String,
            trim: true,
            default: "",
        },
    },
    { _id: false }
);

const portfolioSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^[a-z0-9-]+$/, "Username must be URL-safe"],
        },
        fullName: {
            type: String,
            required: [true, "Full name is required"],
            trim: true,
        },
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        bio: {
            type: String,
            required: [true, "Bio is required"],
            trim: true,
        },
        profileImage: {
            type: String,
            trim: true,
            default: "",
        },
        contact: {
            email: { type: String, trim: true, default: "" },
            linkedin: { type: String, trim: true, default: "" },
            github: { type: String, trim: true, default: "" },
            website: { type: String, trim: true, default: "" },
        },
        skills: {
            type: [String],
            default: [],
        },
        projects: {
            type: [projectSchema],
            default: [],
        },
        experience: {
            type: [experienceSchema],
            default: [],
        },
        viewCount: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

export default Portfolio;
