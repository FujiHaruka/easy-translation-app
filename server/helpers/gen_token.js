const uuid = require('uuid')
const co = require('co')
const { Token } = require('../models')

/**
 * Generate token info. (Remove old tokens)
 * @param {string} userKey - unique user key
 * @return {Object} - { token, userName, until }
 */
function genToken (userKey) {
  return co(function * () {
    yield Token.remove({ userKey }).exec()
    let tomorrow = new Date(Number(new Date()) + 24 * 60 * 60 * 1000)
    let newToken = {
      token: uuid.v4(),
      userKey,
      until: tomorrow
    }
    yield Token(newToken).save()
    return newToken
  })
}

module.exports = genToken
