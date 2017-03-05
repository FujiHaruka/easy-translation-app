import React, { PropTypes as types } from 'react'
import co from 'co'
import { Actions } from 'jumpstate'
import FlatButton from 'material-ui/FlatButton'

/**
 * Edit erea for 'list' view mode
 */
class EditAreaList extends React.Component {
  render () {
    const s = this
    let { sentences, styles } = s.props
    return (
      <div>
        <FlatButton
          label='Save'
          primary
          onClick={s.save.bind(s)}
        />
        {
          sentences.map(({id, original, translated}) =>
            <div key={id}>
              <div>
                <FlatButton
                  label='Edit'
                  onClick={() => Actions.editting.changeViewMode({ viewMode: 'one', targetSentenceId: id })}
                />
              </div>
              <div>
                {original}
              </div>
              <div>
                <textarea
                  id={`translated-${id}`}
                  className={styles['edit-area-all-textarea']}
                  defaultValue={translated}
                  rows={3}
                  />
              </div>
            </div>
        )
        }
      </div>
    )
  }

  save () {
    const s = this
    return co(function * () {
      let { sentenceMap, targetDoc } = s.props.editting
      let ids = sentenceMap.toArray().map(s => s.id)
      let updateList = ids.map(id => ({
        id,
        translated: document.getElementById(`translated-${id}`).value
      })).filter(
        ({id, translated}) => translated !== sentenceMap.get(id).translated
      )
      yield Actions.updateTranslations({did: targetDoc.id, updateList})
    })
  }
}

EditAreaList.propTypes = {
  sentences: types.array
}

export default EditAreaList
