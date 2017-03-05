import React from 'react'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'
import styles from '../css/edit.css'
import { Actions, getState } from 'jumpstate'
import co from 'co'
import { pathTo } from '../helpers/util'
import { Tabs, Tab } from 'material-ui/Tabs'
import EditAreaList from './edit/edit_area_list'
import EditAreaOne from './edit/edit_area_one'
import _ from 'lodash'

const redirectToDashboard = pathTo('/dashboard')

class Edit extends React.Component {
  componentWillReceiveProps (props) {
    let { query } = props.location
    if (!_.isEqual(this.props.location.query, query)) {
      this.viewModeFrom(query)
    }
  }

  viewModeFrom (query) {
    let {
      view = 'list',
      s_id = ''
    } = query
    Actions.editting.changeViewMode({
      viewMode: view,
      targetSentenceId: s_id
    })
  }

  render () {
    const s = this
    let { targetDoc, viewMode } = s.props.editting
    return (
      <div styleName='wrap'>
        <div styleName='main'>
          <section styleName='header'>
            <h2>{ targetDoc.filename }</h2>
          </section>

          {/* <section styleName='tabs-wrap'>
            <div styleName='tabs'>
              <Tabs value={mode}>
                <Tab label='All mode' value='all' />
                <Tab label='One mode' value='one' />
              </Tabs>
            </div>
          </section> */}

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
      s.viewModeFrom(s.props.location.query)
    }).catch(e => {
      console.error(e)
      redirectToDashboard()
    })
  }

  renderEditArea () {
    const s = this
    let { viewMode, sentenceMap, targetSentenceId, targetDoc } = s.props.editting
    let did = targetDoc.id
    switch (viewMode) {
      case 'list':
        return <EditAreaList sentences={sentenceMap.toArray()} styles={styles} did={did} />
      case 'one':
        let sentence = sentenceMap.get(targetSentenceId)
        return <EditAreaOne sentence={sentence} styles={styles} did={did} />
    }
  }

  editAreaOneMode () {
    return null
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
