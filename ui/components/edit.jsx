import React from 'react'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'
import styles from '../css/edit.css'
import { Actions, getState } from 'jumpstate'
import co from 'co'
import { pathTo } from '../helpers/util'
import { Tabs, Tab } from 'material-ui/Tabs'
import FlatButton from 'material-ui/FlatButton'

const redirectToDashboard = pathTo('/dashboard')

class Edit extends React.Component {
  render () {
    const s = this
    let { editting } = s.props
    return (
      <div styleName='wrap'>
        <div styleName='main'>
          <section styleName='header'>
            {s.renderHeader()}
          </section>

          <section styleName='tabs-wrap'>
            <div styleName='tabs'>
              <Tabs value={editting.mode} onChange={Actions.changeEdittingMode}>
                <Tab label='All mode' value='all' />
                <Tab label='One mode' value='one' />
              </Tabs>
            </div>
          </section>

          <section styleName='edit-area'>
            { s.renderEditArea() }
          </section>
        </div>
      </div>
    )
  }

  componentDidMount () {
    const s = this
    let { did: id } = s.props.params
    return co(function * () {
      yield Actions.fetchDocById(id)
      yield Actions.fetchSentences(id)
    }).catch(e => {
      console.error(e)
      redirectToDashboard()
    })
  }

  renderHeader () {
    const s = this
    let { targetDoc } = s.props.editting
    return (
      <h2>{ targetDoc.filename }</h2>
    )
  }

  renderEditArea () {
    const s = this
    let { mode } = s.props.editting
    switch (mode) {
      case 'all':
        return s.editAreaAllMode()
      case 'one':
        return s.editAreaOneMode()
    }
  }

  editAreaOneMode () {
    return null
  }

  editAreaAllMode () {
    const s = this
    let { sentenceMap } = s.props.editting
    return (
      <div>
        <FlatButton
          label='Save'
          primary
          onClick={s.saveAll.bind(s)}
        />
        {
          sentenceMap.toArray().map(({id, original, translated}) =>
            <div key={id}>
              <div>
                {original}
              </div>
              <div>
                <textarea
                  id={`translated-${id}`}
                  styleName='translated-textarea-mode-all'
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

  saveAll () {
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

export default connect(
  state => state
)(
  CSSModules(
    Edit,
    styles,
    { allowMultiple: true }
  )
)
