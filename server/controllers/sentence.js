const uuid = require('uuid')
const assert = require('assert')
const { OK, ERR } = require('../constants')
const {
  Sentence
} = require('../models')

const assertStr = (...values) => {
  for (let value of values) {
    assert.equal(typeof value, 'string')
  }
}

module.exports = {
  updateSentenceTranslation: async ({ id, translated }) => {
    assertStr(id, translated)
    await Sentence.update({ id }, { translated }).exec()
    return OK
  }
}
