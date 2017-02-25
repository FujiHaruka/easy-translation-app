const uuid = require('uuid')
const { Token } = require('../models')

/**
 * Generate token info. (Remove old tokens)
 * @param {string} userKey - unique user key
 * @return {Object} - { token, userName, until }
 */
async function genToken (userKey) {
  await Token.remove({ userKey }).exec()
  let tomorrow = new Date(Number(new Date()) + 24 * 60 * 60 * 1000)
  let newToken = {
    token: uuid.v4(),
    userKey,
    until: tomorrow
  }
  await Token(newToken).save()
  return newToken
}

module.exports = genToken
