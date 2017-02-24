/**
 * Check auth
 * @param {string} userKey
 * @param {password} password
 * @return {boolean}
 */
function auth (userKey, password) {
  // TODO Implement
  let valid = userKey === 'demo' && password === 'demo'
  return valid
}

module.exports = auth
