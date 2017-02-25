const calcPasswordHash = require('./calc_password_hash')
const { User } = require('../models')
const co = require('co')

/**
 * Check userKey and password
 * @param {string} user.userKey
 * @param {string} user.password
 * @return {boolean} ok
 */
function checkAuth ({ userKey, password }) {
  return co(function * () {
    let user = yield User.findOne({ userKey }).exec()
    if (!user) {
      return false
    }
    let passwordHash = calcPasswordHash(password)
    let ok = user.passwordHash === passwordHash
    return ok
  })
}

module.exports = checkAuth
