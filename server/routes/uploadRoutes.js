import express from "express";
import multer from "multer";
import { uploadResume } from "../controllers/uploadController.js";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

router.post("/resume", upload.single("resume"), uploadResume);

export default router;
