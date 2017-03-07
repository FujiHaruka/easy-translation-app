const googleTranslate = require('google-translate')
const co = require('co')

const API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY
const translator = googleTranslate(API_KEY)

const translate = (sentence, languages = {}) => new Promise((resolve, reject) => {
  translator.translate(
    sentence,
    languages.original || 'en',
    languages.translated || 'ja',
    (err, translation) => {
      if (err) {
        reject(err)
        return
      }
      let { translatedText } = translation
      resolve(translatedText)
    })
})

module.exports = {
  translate ({ text, languages }) {
    return co(function * () {
      // TODO 多言語対応
      languages = {
        original: 'en',
        translated: 'ja'
      }
      let translatedText = translate(text, languages)
      return translatedText
    })
  }
}
