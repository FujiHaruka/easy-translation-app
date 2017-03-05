import React, { PropTypes as types } from 'react'
import co from 'co'
import { Actions } from 'jumpstate'
import FlatButton from 'material-ui/FlatButton'
import { pathTo } from '../../helpers/util'

/**
 * Edit erea for 'list' view mode
 */
class EditAreaList extends React.Component {
  render () {
    const s = this
    let { sentences, styles, did } = s.props
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
                  onClick={pathTo(`/dashboard/docs/${did}?view=one&s_id=${id}`)}
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
      let { sentences, did } = s.props
      let updateList = sentences.map(({ id, translated }) => ({
        id,
        translated: document.getElementById(`translated-${id}`).value,
        prevTranslated: translated
      })).filter(
        ({translated, prevTranslated}) => translated !== prevTranslated
      ).map(({ id, translated }) => ({ id, translated }))
      yield Actions.updateTranslations({did, updateList})
    })
  }
}

EditAreaList.propTypes = {
  sentences: types.array,
  did: types.string,
  styles: types.object
}

export default EditAreaList
