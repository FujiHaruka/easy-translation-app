import React, { PropTypes as types } from 'react'
import co from 'co'
import { Actions, getState } from 'jumpstate'
import FlatButton from 'material-ui/FlatButton'
import { pathTo } from '../../helpers/util'
import url from '../../helpers/url'

/**
 * Edit area for 'one' mode
 */
class EditAreaOne extends React.Component {
  render () {
    const s = this
    let { sentence, styles, did, nextId, prevId } = s.props
    let { id, original, translated } = sentence
    return (
      <div>
        <div>
          <FlatButton
            label='Back to list'
            onClick={pathTo(url.editPageListMode(did))}
          />
          <FlatButton
            label='Save'
            onClick={s.save.bind(s)}
          />
          {
            nextId && <FlatButton label='Next' onClick={pathTo(url.editPageOneMode(did, nextId))} />
          }
          {
            prevId && <FlatButton label='Prev' onClick={pathTo(url.editPageOneMode(did, prevId))} />
          }
        </div>
        <div>
          {original}
        </div>
        <div>
          <textarea
            id={`translated-one-${id}`}
            className={styles['edit-area-one-textarea']}
            defaultValue={translated}
            rows={3}
          />
        </div>
      </div>
    )
  }

  componentWillReceiveProps (props) {
    // 筋悪
    let textareaId = `translated-one-${this.props.sentence.id}`
    document.getElementById(textareaId).value = props.sentence.translated
  }

  save () {
    const s = this
    return co(function * () {
      let { id } = s.props.sentence
      let translated = document.getElementById(`translated-one-${id}`).value
      let did = getState().editting.targetDoc.id
      let updateList = [{
        id,
        translated
      }]
      yield Actions.updateTranslations({ did, updateList })
    })
  }
}

EditAreaOne.propTypes = {
  sentence: types.object,
  nextId: types.string,
  prevId: types.string,
  styles: types.object,
  did: types.string
}

export default EditAreaOne
