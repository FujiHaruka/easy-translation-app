/**
 * Local actor module
 */
const { Module } = require('sugo-actor')
const checkAuth = require('./helpers/check_auth')
const genToken = require('./helpers/gen_token')
const {
  Token
} = require('./models')

const actorModule = new Module({
  requestToken: async ({ userKey, password }) => {
    let ok = await checkAuth({ userKey, password })
    if (!ok) {
      return {
        err: {
          message: `Invalid user name or password`
        }
      }
    }
    let tokenInfo = genToken(userKey)
    return tokenInfo
  },
  validateToken: async ({ userKey, token }) => {
    let data = await Token.findOne({ token }).exec()
    let now = new Date()
    let invalid = !data || userKey !== data.userKey || now > data.until
    if (invalid) {
      return {
        err: {
          message: 'Invalid token'
        }
      }
    }
    return {
      ok: true
    }
  }
})

module.exports = actorModule
