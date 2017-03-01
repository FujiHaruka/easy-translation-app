import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../css/dashboard.css'
import { connect } from 'react-redux'
import { List } from 'material-ui/List'
import DocListItem from './dashboard/doc_list_item'
import FontIcon from 'material-ui/FontIcon'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

class Dashboard extends React.Component {
  render () {
    const s = this
    return (
      <div styleName='wrap'>
        <div styleName='main'>
          <Toolbar style={{ background: 'white' }}>
            <ToolbarGroup>
              <ToolbarTitle text='Documents' />
              <FontIcon className='fa fa-plus' />
            </ToolbarGroup>
          </Toolbar>
          <List>
            <DocListItem
              name='hoge'
              updateAt={new Date()}
              id='ji'
            />
          </List>
        </div>
      </div>
    )
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
