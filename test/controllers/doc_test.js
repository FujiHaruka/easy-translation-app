const assert = require('assert')
const mongoose = require('mongoose')
const { url } = require('../../env')
const models = require('../../server/models')
const {
  Doc,
  Sentence
} = models
const docCtrl = require('../../server/controllers/doc')

describe('doc controller', function () {
  before(async () => {
    mongoose.connect(url.MONGO)
    await Doc.remove({}).exec()
  })

  after(async () => {
    mongoose.disconnect()
  })

  it('funcs', async () => {
    let doc = {
      filename: 'some.txt',
      text: 'I am who i am. You are not.',
      userKey: 'demo'
    }

    let res = await docCtrl.createDoc(doc)
    assert.ok(res.created)
    assert.ok(res.ok)

    let { id } = res.created
    let found = await Doc.findOne({ id }).exec()
    assert.equal(doc.filename, found.filename)
    assert.equal(doc.userKey, found.userKey)
    let sentences = await Sentence.find({ did: id })
    assert.equal(sentences.length, 2)

    await docCtrl.deleteDoc({ id })
    let notFound = await Doc.findOne({ id }).exec()
    let noSentence = await Sentence.findOne({ did: id })
    assert.ok(!notFound)
    assert.ok(!noSentence)
  })
})

/* global describe before after it */
