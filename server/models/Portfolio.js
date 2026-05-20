import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  techStack: [String],
  githubLink: String,
  liveDemo: String,
});

const experienceSchema = new mongoose.Schema({
  company: String,
  role: String,
  duration: String,
  description: String,
});

const portfolioSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[a-z0-9-]+$/,
    },

    fullName: {
      type: String,
      required: true,
    },

    title: String,
    bio: String,
    profileImage: String,
    resumeUrl: String,

    contact: {
      email: String,
      linkedin: String,
      github: String,
      website: String,
    },

    skills: [String],
    projects: [projectSchema],
    experience: [experienceSchema],

    viewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

export default Portfolio;