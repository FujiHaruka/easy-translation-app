import React from 'react'
import { connect } from 'react-redux'
import co from 'co'
import { Actions, getState } from 'jumpstate'
import styles from '../css/sentence.css'
import CSSModules from 'react-css-modules'
import FlatButton from 'material-ui/FlatButton'
import Chip from 'material-ui/Chip'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import { pathTo } from '../helpers/util'
import url from '../helpers/url'
import styleObject from '../helpers/style_object'

const TEXTAREA_ID = 'setnence-translate-textarea'

const moveToSentence = (did, sid) => () => {
  Actions.doc.setTargetSentence('')
  document.getElementById(TEXTAREA_ID).value = ''
  pathTo(url.sentencePage(did, sid))()
}

/**
 * Edit area for 'one' mode
 */
class Sentence extends React.Component {
  constructor (props) {
    super(props)
    this.state = { saveTimer: null }
  }

  render () {
    const s = this
    let { sentenceMap, targetSentenceId, targetDoc } = s.props.doc
    let sentence = sentenceMap.get(targetSentenceId)
    if (!sentence) {
      return <div />
    }
    let { suggestion } = s.props
    console.log(suggestion)
    let suggestDisabled = suggestion.length > 0
    let ids = sentenceMap.keySeq().toArray()
    let idIndex = ids.indexOf(sentence.id)
    let prevId = ids[idIndex - 1] || ''
    let nextId = ids[idIndex + 1] || ''
    let { original, translated } = sentence

    return (
      <div styleName='wrap'>
        <div styleName='main'>
          <div>
            <FlatButton
              label='Document'
              icon={<i className='fa fa-chevron-left' />}
              onClick={pathTo(url.docPageOnListView(targetDoc.id))}
            />
          </div>
          <Toolbar style={styleObject.toolbar}>
            <ToolbarGroup>
              <ToolbarTitle text={targetDoc.filename} style={styleObject.toolbarTitle} />
              <FlatButton
                label='機械翻訳'
                disabled={suggestDisabled}
                primary
                icon={<i className='fa fa-language' />}
                onClick={s.translate}
              />
            </ToolbarGroup>
          </Toolbar>
          <div styleName='original-sentence'>
            <Chip style={styleObject.chip}>
              <span styleName='chip'>
                original
              </span>
            </Chip>
            {original}
          </div>
          {
            suggestDisabled &&
            <div styleName='suggestion-sentence'>
              <Chip style={styleObject.chip}>
                <span styleName='chip'>
                  suggestion
                </span>
              </Chip>
              {suggestion}
            </div>
          }
          <div>
            <textarea
              id={TEXTAREA_ID}
              styleName='textarea'
              defaultValue={translated}
              rows={4}
            />
          </div>
          <div styleName='navi-buttons'>
            {
              prevId &&
              <div styleName='left-button'>
                <FlatButton
                  label='Prev'
                  icon={<i className='fa fa-chevron-left' />}
                  onClick={moveToSentence(targetDoc.id, prevId)}
                />
              </div>
            }
            {
              nextId &&
              <div styleName='right-button'>
                <FlatButton
                  label='Next'
                  labelPosition='before'
                  icon={<i className='fa fa-chevron-right' />}
                  onClick={moveToSentence(targetDoc.id, nextId)}
                  />
              </div>
            }
          </div>
        </div>
      </div>
    )
  }

  componentWillReceiveProps (props) {
    const s = this
    let { did, sid } = s.props.params
    let { did: nextDid, sid: nextSid } = props.params
    if (did === nextDid && sid === nextSid) {
      return
    }
    s.updatePage(props)
  }

  componentDidMount () {
    const s = this
    s.updatePage(s.props)
    let saveTimer = setInterval(s.save, 1000)
    s.setState({ saveTimer })
  }

  componentWillUnmount () {
    const s = this
    clearInterval(s.state.saveTimer)
    Actions.doc.setTargetSentence('')
  }

  updatePage (props) {
    let { did, sid } = props.params
    return co(function * () {
      Actions.suggestion.set()
      Actions.doc.setTargetSentence(sid)
      yield Actions.fetchDocById(did)
      yield Actions.fetchSentences(did)
      // Clear textarea 筋悪
      let textarea = document.getElementById(TEXTAREA_ID)
      let { sentenceMap, targetSentenceId } = getState().doc
      let sentence = sentenceMap.get(targetSentenceId)
      if (textarea && sentence) {
        textarea.value = sentence.translated
      }
    }).catch(e => {
      console.error(e)
      pathTo(url.dashboardPage())()
    })
  }

  save () {
    return co(function * () {
      let { targetDoc, sentenceMap, targetSentenceId } = getState().doc
      let sentence = sentenceMap.get(targetSentenceId)
      let { id } = sentence
      let translated = document.getElementById(TEXTAREA_ID).value
      if (translated === sentence.translated) {
        return
      }
      let updateList = [{
        id,
        translated
      }]
      yield Actions.updateTranslations({ did: targetDoc.id, updateList })
    })
  }

  translate () {
    return co(function * () {
      let { sentenceMap, targetSentenceId } = getState().doc
      let sentence = sentenceMap.get(targetSentenceId)
      let { original } = sentence
      yield Actions.suggestTranslate(original)
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
