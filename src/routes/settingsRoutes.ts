import express, { Router } from 'express'
import settingsControllers from '../controllers/settingsControllers'
import JwtGuard from '../middleware/Guards/JwtGuard'
const router: Router = express.Router()

// const multer  = require('multer')
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname.replace(' ', '_') + '-' + Date.now())
//   }
// })

// const upload = multer({ storage: storage })

// http://localhost:3000/api/settings/single-file
// router.post('/single-file', upload.single('file'), settingsControllers.singleFile)

export default router
