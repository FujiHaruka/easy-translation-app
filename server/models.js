const Model = require('./helpers/model')

const User = Model('user', {
  userKey: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  }
})

const Token = Model('token', {
  token: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  userKey: {
    type: String,
    required: true
  },
  until: {
    type: Date,
    required: true
  }
})

module.exports = {
  User,
  Token
}
