import React from 'react'
import { connect } from 'react-redux'
import co from 'co'
import { Actions, getState } from 'jumpstate'
import styles from '../css/sentence.css'
import CSSModules from 'react-css-modules'
import FlatButton from 'material-ui/FlatButton'
import { pathTo } from '../helpers/util'
import url from '../helpers/url'

/**
 * Edit area for 'one' mode
 */
class Sentence extends React.Component {
  render () {
    const s = this
    let { sentenceMap, targetSentenceId, targetDoc } = s.props.doc
    let sentence = sentenceMap.get(targetSentenceId)
    if (!sentence) {
      return <div />
    }
    let ids = sentenceMap.keySeq().toArray()
    let idIndex = ids.indexOf(sentence.id)
    let prevId = ids[idIndex - 1] || ''
    let nextId = ids[idIndex + 1] || ''
    let { id, original, translated } = sentence

    return (
      <div styleName='wrap'>
        <div styleName='main'>
          <div>
            <FlatButton
              label='Back to list'
              onClick={pathTo(url.docPageOnListView(targetDoc.id))}
          />
            <FlatButton
              label='Save'
              onClick={s.save.bind(s)}
          />
            {
            nextId && <FlatButton label='Next' onClick={pathTo(url.sentencePage(targetDoc.id, nextId))} />
          }
            {
            prevId && <FlatButton label='Prev' onClick={pathTo(url.sentencePage(targetDoc.id, prevId))} />
          }
          </div>
          <div>
            {original}
          </div>
          <div>
            <textarea
              id={`translated-one-${id}`}
              styleName='textarea'
              defaultValue={translated}
              rows={3}
          />
          </div>
        </div>
      </div>
    )
  }

  componentWillReceiveProps (props) {
    // 筋悪
    let textareaId = `translated-one-${props.params.sid}`
    let textarea = document.getElementById(textareaId)
    let { sentenceMap, targetSentenceId } = props.doc
    let sentence = sentenceMap.get(targetSentenceId)
    if (textarea && sentence) {
      textarea.value = sentence.translated
    }
  }

  componentDidMount () {
    const s = this
    let { did, sid } = s.props.params
    return co(function * () {
      Actions.doc.setTargetSentence(sid)
      yield Actions.fetchDocById(did)
      yield Actions.fetchSentences(did)
    }).catch(e => {
      console.error(e)
      pathTo(url.dashboardPage())()
    })
  }

  save () {
    const s = this
    return co(function * () {
      let { targetDoc, sentenceMap, targetSentenceId } = s.props.doc
      let sentence = sentenceMap.get(targetSentenceId)
      let { id } = sentence
      let translated = document.getElementById(`translated-one-${id}`).value
      let updateList = [{
        id,
        translated
      }]
      yield Actions.updateTranslations({ did: targetDoc.id, updateList })
    })
  }
}

export default connect(
  state => state
)(
  CSSModules(
    Sentence,
    styles,
    { allowMultiple: true }
  )
)
