import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../css/dashboard.css'
import { connect } from 'react-redux'
import { List } from 'material-ui/List'
import DocListItem from './dashboard/doc_list_item'
import FontIcon from 'material-ui/FontIcon'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'
import { browserHistory } from 'react-router'
import { Actions } from 'jumpstate'
import co from 'co'

class Dashboard extends React.Component {
  render () {
    const s = this
    return (
      <div styleName='wrap'>
        <div styleName='main'>
          <Toolbar style={{ background: 'white' }}>
            <ToolbarGroup>
              <ToolbarTitle text='Documents' />
              <FontIcon className='fa fa-plus' onClick={s.changePath('/dashboard/new')} />
            </ToolbarGroup>
          </Toolbar>
          { s.renderDocList() }
        </div>
      </div>
    )
  }

  renderDocList () {
    const s = this
    let { docs } = s.props.doc
    return (
      <List>
        {
          docs.map(
            doc =>
              <DocListItem
                key={doc.id}
                name={doc.filename}
                updateAt={new Date(doc.updateAt)}
                id={'doc-' + doc.filename} />
          )
        }
      </List>
    )
  }

  changePath (path) {
    return () => {
      browserHistory.push(path)
    }
  }

  componentDidMount () {
    const s = this
    let { api } = s.props.caller
    let { userKey, token } = s.props.user
    return co(function * () {
      let { docs } = yield api.getDocs({ userKey, token })
      Actions.setDocs({
        docs,
        sort: 'recent'
      })
    })
  }
}

export default connect(
  state => state
)(
  CSSModules(
    Dashboard,
    styles,
    { allowMultiple: true }
  )
)
