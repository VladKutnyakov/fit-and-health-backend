const multer = require('multer')
const moment = require('moment')

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'uploads/')
  },
  filename(req, file, collback) {
    const date = moment().format('DDMMYYYY-HHmmss_SSS')
    callback(null, `${date}-${file.originalname}`)
  }
})

const fileFilter = (req, file, collback) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    callback(null, true)
  } else {
    collback(null, false)
  }
}

const limits = {
  fileSize: 1024 * 1024 *5
}

module.exports = multer({
  storage,
  fileFilter,
  limits
})
