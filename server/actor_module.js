/**
 * Local actor module
 */
const co = require('co')
const { Module } = require('sugo-actor')
const auth = require('./helpers/auth')
const genToken = require('./helpers/gen_token')
const {
  Token
} = require('./models')

const actorModule = new Module({
  requestToken ({ userKey, password }) {
    let ok = auth(userKey, password)
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
  validateToken ({ userKey, token }) {
    return co(function * () {
      let data = yield Token.findOne({ token }).exec()
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
    })
  }
})

module.exports = actorModule
