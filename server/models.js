const Model = require('./helpers/model')

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
  Token
}
