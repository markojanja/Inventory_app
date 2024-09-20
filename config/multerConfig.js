import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "public", "uploads")); // Folder to store the files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

// Initialize Multer
export const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 12 }, // Limit file size to 12MB
  fileFilter: function (req, file, cb) {
    const fileTypes = /jpeg|jpg|png|gif|svg/;
    const extName = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extName) {
      return cb(null, true);
    } else {
      cb(new Error("Error: Images only!"));
    }
  },
});
