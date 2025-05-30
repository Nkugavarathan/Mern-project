import multer from "multer"
import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"

// Needed to handle __dirname in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads")) // adjust if needed
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname)
    cb(null, Date.now() + ext)
  },
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // max 5MB
  },
})

export default upload
