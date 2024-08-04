// Third-party modules
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Internal modules

// Get the current file name and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../public/images/your-image-path");
    fs.mkdirSync(dir, { recursive: true }); // Ensure the directory exists or create it
    cb(null, dir); // Set the destination directory for uploads
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname); // Get the file extension
    cb(null, `${Date.now()}${extension}`); // Create a unique file name using the current timestamp
  },
});

// Define file filter to accept only JPEG and PNG images
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true); // Accept the file
  } else {
    cb(null, false); // Reject the file
  }
};

// Initialize multer with the defined storage, file size limit, and file filter
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB file size limit
  },
  fileFilter: fileFilter,
});

// Export the configured multer instance
export default upload;
