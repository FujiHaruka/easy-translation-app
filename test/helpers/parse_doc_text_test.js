const assert = require('assert')
const parseDocText = require('../../server/helpers/parse_doc_text')

describe('parseDocText', () => {
  it('parse', () => {
    let did = 'a'
    let text = `
hoge hoge. fuga fuga? fuge fuge! "hoge hoge." I said.
`
    let options = { languages: { original: 'en' } }
    let sentences = parseDocText(did, text, options)
    assert.ok(sentences[0].id)
    assert.ok(sentences[0].did)
    assert.equal(sentences[0].original, 'hoge hoge.')
    assert.equal(sentences[1].original, 'fuga fuga?')
    assert.equal(sentences[2].original, 'fuge fuge!')
    assert.equal(sentences[3].original, '"hoge hoge."')
    assert.equal(sentences[4].original, 'I said.')
  })
})

/* global describe it */
