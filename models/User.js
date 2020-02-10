const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const autoIncrement = require('mongoose-auto-increment');
// add {cfg}
const connection = mongoose.createConnection("mongodb+srv://antondexy:1gdy54ff@cluster0-comih.mongodb.net/myapi");

autoIncrement.initialize(connection);

const UserSchema = new Schema(
  {
    nickname: {
      type: String,
      // unique: true,
      required: false
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password: {
      type: String,
      required: true
    },
    dateOfRegitration: {
      type: Date,
      default: Date.now()
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    imgUrl: {
      type: String,
      default: undefined
    },
    addedCategories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]
  },
  { collection: 'users' }
)


UserSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'userId' });
const Book = connection.model('User', UserSchema);


UserSchema.methods.generateHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

// Check if passport is valud
UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = User = mongoose.model('User', UserSchema)
