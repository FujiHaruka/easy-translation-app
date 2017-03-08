const uuid = require('uuid')
const assert = require('assert')
const parseDocText = require('../helpers/parse_doc_text')
const { OK, ERR } = require('../constants')
const omitUnderscore = require('../helpers/omit_underscore')
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
      translated: 'ja'
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
    return {
      ok: true,
      created: doc
    }
  },

  deleteDoc: async ({ id }) => {
    let doc = await Doc.findOne({ id }).exec()
    if (!doc) {
      return ERR('Not found document')
    }
    await Doc.remove({ id }).exec()
    await Sentence.remove({ did: id })
    return OK
  },

  updateDocName: async ({ id, filename }) => {
    let doc = await Doc.findOne({ id }).exec()
    if (!doc) {
      return ERR('Not found document')
    }
    await Doc.findOneAndUpdate({ id }, { filename }).exec()
    return OK
  },

  getDocs: async ({ userKey }) => {
    let docs = await Doc.find({ userKey }).exec()
    docs = docs.map(doc => omitUnderscore(doc))
    return {
      docs
    }
  },

  getDocById: async ({ userKey, id }) => {
    let doc = await Doc.findOne({ id }).exec()
    if (!doc || doc.userKey !== userKey) {
      return ERR('Not Found')
    }
    doc = omitUnderscore(doc)
    return {
      ok: true,
      doc
    }
  }
}
