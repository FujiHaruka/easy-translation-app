import React, { PropTypes as types } from 'react'
import co from 'co'
import { Actions, getState } from 'jumpstate'
import FlatButton from 'material-ui/FlatButton'

/**
 * Edit area for 'one' mode
 */
class EditAreaOne extends React.Component {
  render () {
    const s = this
    let { sentence, styles } = s.props
    let { id, original, translated } = sentence
    return (
      <div>
        <div>
          <FlatButton
            label='Save'
            onClick={s.save.bind(s)}
          />
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
  styles: types.object
}

export default EditAreaOne
