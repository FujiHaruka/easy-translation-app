const { matchCaptureGroupAll } = require('match-index')
const uuid = require('uuid')

/**
 * Parse document text into sentences of Sentence Model
 * @param {string} did - document id
 * @param {string} text - document content
 * @return {Array} sentences
 */
function parseDocText (did, text, options) {
  let { languages } = options
  if (languages.original !== 'en') {
    throw new Error(`Not support language '${languages.original}'`)
  }

  let separator = /([.!?]"?)/
  let matches = matchCaptureGroupAll(text, separator)
  let sentences = []
  for (let i = -1; i < matches.length; i++) {
    let start
    let end
    if (i === -1) {
      start = 0
      end = matches[0].index + matches[0].text.length
    } else if (i === matches.length - 1) {
      start = matches[i].index + matches[i].text.length
      end = null
    } else {
      start = matches[i].index + matches[i].text.length
      end = matches[i + 1].index + matches[i + 1].text.length
    }
    let original = text.slice(start, end).trim()
    if (original.length > 0) {
      sentences.push({
        original,
        did,
        id: uuid.v4(),
        order: i,
        translated: ''
      })
    }
  }
  return sentences
}

module.exports = parseDocText
