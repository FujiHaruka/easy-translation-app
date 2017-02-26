const checkAuth = require('../helpers/check_auth')
const genToken = require('../helpers/gen_token')
const { OK, ERR } = require('../constants')
const {
  Token
} = require('../models')

module.exports = {
  requestToken: async ({ userKey, password }) => {
    let ok = await checkAuth({ userKey, password })
    if (!ok) {
      return ERR('Invalid user name or password')
    }
    let tokenInfo = genToken(userKey)
    return tokenInfo
  },

  deleteToken: async ({ userKey, token }) => {
    let data = await Token.findOne({ token }).exec()
    let invalid = !data || userKey !== data.userKey
    if (!invalid) {
      return ERR('Invalid token')
    }
    await Token.remove({ token })
    return OK
  },

  validateToken: async ({ userKey, token, safe = true }) => {
    let data = await Token.findOne({ token }).exec()
    let now = new Date()
    let invalid = !data || userKey !== data.userKey || now > data.until
    if (invalid) {
      return ERR('Invalid token')
    }
    return OK
  }
}
