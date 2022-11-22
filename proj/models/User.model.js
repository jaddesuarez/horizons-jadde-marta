const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    username: { type: String, required: true },
    password: String,
    name: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      default: ''
    },
    profileImg: {
      type: String,
      default: '',
      set: value => value === '' ? '' : value
    },
    islandName: {
      type: String,
      default: ''
    },
    fruit: {
      type: String,
      default: ''
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER'
    },
    currentVillagers: [{
      type: String
    }],
    favVillagers: [{
      type: String
    }]
  },
  {
    timestamps: true
  }
)


module.exports = model('User', userSchema)
