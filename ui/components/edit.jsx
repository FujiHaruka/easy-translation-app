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
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import url from '../helpers/url'

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
            <div>
              <IconButton
                iconClassName='fa fa-chevron-left'
                tooltip='Dashboard'
                onClick={s.moveToDashbord}
                />
            </div>
            <h2>{ targetDoc.filename }</h2>
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
        return <EditAreaList
          sentences={sentenceMap.toArray()}
          styles={styles}
          did={did}
          />
      case 'one':
        {
          let sentence = sentenceMap.get(targetSentenceId)
          let ids = sentenceMap.keySeq().toArray()
          let idIndex = ids.indexOf(sentence.id)
          let prevId = ids[idIndex - 1] || ''
          let nextId = ids[idIndex + 1] || ''
          return <EditAreaOne
            sentence={sentence}
            styles={styles}
            did={did}
            prevId={prevId}
            nextId={nextId}
            />
        }
    }
  }

  editAreaOneMode () {
    return null
  }

  moveToDashbord () {
    Actions.editting.reset()
    pathTo(url.dashboardPage())()
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
