import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Project name is required"],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  techStack: [String],
  githubLink: String,
  liveDemo: String
});

const experienceSchema = new mongoose.Schema({
  company: String,
  role: String,
  duration: String,
  description: String
});

const portfolioSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9-]+$/, "Username can only use lowercase letters, numbers, and hyphens"]
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true
    },
    title: String,
    bio: String,
    profileImage: String,
    resumeUrl: String,
    theme: {
      type: String,
      enum: ["default", "dark", "minimal", "emerald"],
      default: "default"
    },
    contact: {
      email: String,
      linkedin: String,
      github: String,
      website: String
    },
    skills: [String],
    projects: [projectSchema],
    experience: [experienceSchema],
    viewCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

export default Portfolio;
