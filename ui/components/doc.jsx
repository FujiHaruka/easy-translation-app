import React from 'react'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'
import styles from '../css/doc.css'
import { Actions, getState } from 'jumpstate'
import co from 'co'
import { pathTo } from '../helpers/util'
import { Tabs, Tab } from 'material-ui/Tabs'
import ListView from './doc/list_view'
import EditAreaOne from './doc/edit_area_one'
import _ from 'lodash'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import url from '../helpers/url'

const redirectToDashboard = pathTo(url.dashboardPage())

/**
 * Change view mode by url query
 * @param {string} query.mode - view_list || view_parallel || edit
 * @param {string} query.s_id - sentence id
 */
const viewModeFrom = (query = {}) => {
  let {
    mode = 'view_list',
    sid = ''
  } = query
  Actions.doc.changeViewMode({
    viewMode: mode,
    targetSentenceId: sid
  })
}

class Doc extends React.Component {
  componentWillReceiveProps (props) {
    let { query } = props.location
    if (!_.isEqual(this.props.location.query, query)) {
      viewModeFrom(query)
    }
  }

  render () {
    const s = this
    let { targetDoc } = s.props.doc
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
          <section styleName='content'>
            { s.renderContent() }
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
      viewModeFrom(s.props.location.query)
    }).catch(e => {
      console.error(e)
      redirectToDashboard()
    })
  }

  renderContent () {
    const s = this
    let { viewMode, sentenceMap, targetSentenceId, targetDoc } = s.props.doc
    let did = targetDoc.id
    switch (viewMode) {
      case 'view_list':
        return (
          <ListView
            sentences={sentenceMap.toArray()}
            did={targetDoc.id}
            styles={{}}
          />
        )
      case 'view_parallel':
        return null
      case 'edit':
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

  moveToDashbord () {
    Actions.doc.resetTargetDoc()
    redirectToDashboard()
  }
}

export default connect(
  state => state
)(
  CSSModules(
    Doc,
    styles,
    { allowMultiple: true }
  )
)
