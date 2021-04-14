const express = require('express')
// const passport = require('passport')
const controller = require('../controllers/settingsControllers')
const router = express.Router()

const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(' ', '_') + '-' + Date.now())
  }
})

const upload = multer({ storage: storage })

// passport не дает выполнять корректно fetch запросы axios. 
// перепроверить как работает паспорт и вообще авторизация и перенастроить . поправить все

// http://localhost:3000/api/settings/single-file
router.post('/single-file', upload.single('file'), controller.singleFile)

module.exports = router
