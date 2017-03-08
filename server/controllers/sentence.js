const uuid = require('uuid')
const assert = require('assert')
const { OK, ERR } = require('../constants')
const {
  Sentence,
  Doc
} = require('../models')
const toObj = require('../helpers/to_obj')

const assertStr = (...values) => {
  for (let value of values) {
    assert.equal(typeof value, 'string')
  }
}

module.exports = {
  getSentences: async ({ did }) => {
    assertStr(did)
    let sentences = await Sentence.find({ did }).exec()
    sentences.sort((s1, s2) => s1.order - s2.order)
    return {
      ok: true,
      sentences: toObj(sentences)
    }
  },

  updateSentenceTranslation: async ({ did, id, translated }) => {
    assertStr(id, translated)
    await Sentence.update({ id }, { translated }).exec()
    await Doc.update({ id: did }, { updatedAt: new Date() }).exec()
    return OK
  }
}
