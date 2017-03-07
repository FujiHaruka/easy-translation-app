import React, { PropTypes as types } from 'react'
import styles from '../../css/sentence.css'

const wordPattern = /^(\W?)(\w+)(\W?)$/
const dictionaryLink = (word) => `http://ejje.weblio.jp/content/${word}`

/**
 * 英文テキストを単語で区切って、英和辞書サイトへのリンクつきにする
 */
class WordLinkedText extends React.Component {
  render () {
    const s = this
    let { text } = s.props
    let words = text.split(' ')
    return (
      <div>
        {
          words.map(
            (word, i) => <span key={i}>{s.linked(word)}</span>
          )
        }
      </div>
    )
  }

  linked (word) {
    let match = word.match(wordPattern)
    if (!match) {
      return word + ' '
    }
    let [_, startChar, pureWord, endChar] = match
    return (
      <span>
        {startChar}
        <a
          className={styles['word-link']}
          href={dictionaryLink(pureWord)}
          target='_blank'>
          {pureWord}
        </a>
        {endChar + ' '}
      </span>
    )
  }
}

WordLinkedText.propTypes = {
  text: types.string
}

export default WordLinkedText
