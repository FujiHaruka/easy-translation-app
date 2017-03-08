import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../css/dashboard.css'
import { connect } from 'react-redux'
import { List } from 'material-ui/List'
import DocListItem from './dashboard/doc_list_item'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'
import FlatButton from 'material-ui/FlatButton'
import { Actions } from 'jumpstate'
import co from 'co'
import { pathTo } from '../helpers/util'
import styleObject from '../helpers/style_object'
import url from '../helpers/url.js'

class Dashboard extends React.Component {
  render () {
    const s = this
    return (
      <div styleName='wrap'>
        <div styleName='main'>
          <Toolbar style={{ background: 'white' }}>
            <ToolbarGroup>
              <ToolbarTitle text='Documents' style={styleObject.toolbarTitle} />
              <FlatButton
                label='New'
                icon={<i className='fa fa-plus' />}
                primary
                onClick={pathTo(url.newDocPage())}
              />
            </ToolbarGroup>
          </Toolbar>
          { s.renderDocList() }
        </div>
      </div>
    )
  }

  renderDocList () {
    const s = this
    let { docMap } = s.props.doc
    return (
      <List>
        {
          docMap.toArray().map(
            doc =>
              <DocListItem
                key={doc.id}
                name={doc.filename}
                updatedAt={new Date(doc.updatedAt)}
                did={doc.id} />
          )
        }
      </List>
    )
  }

  componentDidMount () {
    return co(function * () {
      yield Actions.fetchDocs()
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
