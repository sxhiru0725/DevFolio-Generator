import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadResume = async (req, res) => {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      return res.status(500).json({
        success: false,
        message:
          "Cloudinary is not configured. Add Cloudinary keys to server .env."
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF file."
      });
    }

    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({
        success: false,
        message: "Only PDF files are allowed."
      });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "devfolio/resumes",
        resource_type: "raw",
        public_id: `${Date.now()}-${req.file.originalname.replace(/\s+/g, "-")}`
      },
      (error, result) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: error.message
          });
        }

        res.status(200).json({
          success: true,
          message: "Resume uploaded successfully",
          data: {
            url: result.secure_url,
            publicId: result.public_id
          }
        });
      }
    );

    uploadStream.end(req.file.buffer);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
