const crypto = require('crypto')

/**
 * Calculate password hash
 * @param {string} password
 * @return {string} passwordHash
 */
function calcPasswordHash (password) {
  let sha256 = crypto.createHash('sha256')
  sha256.update(password)
  let passwordHash = sha256.digest('base64')
  return passwordHash
}

module.exports = calcPasswordHash
