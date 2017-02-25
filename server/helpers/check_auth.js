const calcPasswordHash = require('./calc_password_hash')
const { User } = require('../models')

/**
 * Check userKey and password
 * @param {string} user.userKey
 * @param {string} user.password
 * @return {boolean} ok
 */
async function checkAuth ({ userKey, password }) {
  let user = await User.findOne({ userKey }).exec()
  if (!user) {
    return false
  }
  let passwordHash = calcPasswordHash(password)
  let ok = user.passwordHash === passwordHash
  return ok
}

module.exports = checkAuth
