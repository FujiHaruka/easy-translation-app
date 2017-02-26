const uuid = require('uuid')
const assert = require('assert')
const parseDocText = require('../helpers/parse_doc_text')
const { OK, ERR } = require('../constants')
const {
  Doc,
  Sentence
} = require('../models')

const assertStr = (...values) => {
  for (let value of values) {
    assert.equal(typeof value, 'string')
  }
}

module.exports = {
  createDoc: async ({ filename, text, userKey }) => {
    assertStr(filename, text, userKey)
    assert.ok(filename.length > 0)

    let id = uuid.v4()
    // TODO Enable set languages. Now, only allowed 'en/ja'.
    let languages = {
      original: 'en',
      japanese: 'ja'
    }
    let doc = {
      id,
      userKey,
      languages,
      filename
    }
    let sentences = parseDocText(id, text, { languages })
    await Doc(doc).save()
    await sentences.map(s => Sentence(s).save())
    return OK
  },

  deleteDoc: async ({ id }) => {
    let doc = await Doc.findOne({ id }).exec()
    if (!doc) {
      return ERR('Not found document')
    }
    await Doc.remove({ id }).exec()
    return OK
  },

  updateDocName: async ({ id, filename }) => {
    let doc = await Doc.findOne({ id }).exec()
    if (!doc) {
      return ERR('Not found document')
    }
    await Doc.findOneAndUpdate({ id }, { filename }).exec()
    return OK
  }
}
