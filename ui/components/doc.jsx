import React from 'react'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'
import styles from '../css/doc.css'
import { Actions } from 'jumpstate'
import co from 'co'
import { pathTo } from '../helpers/util'
import ListView from './doc/list_view'
import _ from 'lodash'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import url from '../helpers/url'

const redirectToDashboard = pathTo(url.dashboardPage())

/**
 * Change view mode by url query
 * @param {string} query.mode - view_list
 */
const viewModeFrom = (query = {}) => {
  let {
    mode = 'view_list'
  } = query
  Actions.doc.changeViewMode({
    viewMode: mode
  })
}

class Doc extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showOriginal: true
    }
  }

  componentWillReceiveProps (props) {
    let { query } = props.location
    if (!_.isEqual(this.props.location.query, query)) {
      viewModeFrom(query)
    }
  }

  render () {
    const s = this
    let { targetDoc } = s.props.doc
    let { showOriginal } = s.state
    return (
      <div styleName='wrap'>
        <div styleName='main'>
          <section styleName='header'>
            <div>
              <FlatButton
                label='Dashboard'
                icon={<i className='fa fa-chevron-left' />}
                onClick={s.moveToDashbord}
                />
            </div>
            <Toolbar style={{ background: 'white' }}>
              <ToolbarGroup>
                <ToolbarTitle text={targetDoc.filename} />
                <FlatButton
                  label='Download'
                  icon={<i className='fa fa-download' />}
                  />
                <FlatButton
                  label={showOriginal ? 'Hide English' : 'Show English'}
                  icon={<i className='fa fa-filter' />}
                  onClick={() => s.setState({ showOriginal: !showOriginal })}
                />
              </ToolbarGroup>
            </Toolbar>
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
    let { showOriginal } = s.state
    let { viewMode, sentenceMap, targetDoc } = s.props.doc
    switch (viewMode) {
      case 'view_list':
        return (
          <ListView
            sentences={sentenceMap.toArray()}
            did={targetDoc.id}
            showOriginal={showOriginal}
          />
        )
      case 'view_parallel':
        return null
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
