const dotenv = require('dotenv')
const path = require('path')

const root = path.join.bind(this, __dirname, '../../')

dotenv.config({ path: root('.env') })

module.exports = {
  mongoURI: process.env.MONGO_URI,
  url: process.env.URL,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET
}