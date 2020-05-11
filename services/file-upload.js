const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

aws.config.update({
  secretAccessKey: 'woPHeRx+S1JPoZrGClvKews5i3ZRVY1HuSSY72yo',
  accessKeyId: 'AKIAJQL7MW466X7DJBXA',
  region: 'us-east-1'
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(new Error ('Invalid Mime Type, oncly JPEG and PNG'), false)
  }
}

const s3 = new aws.S3()

const upload = multer({
  fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: 'easy-lern-imgs',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

module.exports = upload