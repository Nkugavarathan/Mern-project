import multer from "multer"
import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"

// Handle __dirname in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Set storage destination and filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads")) // ✅ Save to uploads folder
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname)
    cb(null, `${Date.now()}${ext}`) // Optional: prefix with timestamp
  },
})

// Setup multer with file size limit
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // ✅ Max 5MB
  },
})

export default upload // ✅ ES module export
