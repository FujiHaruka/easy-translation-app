import React, { PropTypes as types } from 'react'
import co from 'co'
import { Actions } from 'jumpstate'
import FlatButton from 'material-ui/FlatButton'
import { List, ListItem } from 'material-ui/List'
import { pathTo } from '../../helpers/util'
import styles from '../../css/doc.css'
import url from '../../helpers/url'

const listItem = (original, translated, showOriginal) => (
  <div>
    {
      showOriginal &&
      <div className={styles['list-view-original']}>{ original }</div>
    }
    <div className={styles['list-view-translated']}>{ translated }</div>
  </div>
)

/**
 * 'list_view' mode
 */
class ListView extends React.Component {
  render () {
    const s = this
    let { sentences, did, showOriginal } = s.props
    return (
      <div>
        <List>
          {
            sentences.map(({id, original, translated}) =>
              <div key={id} className={styles['list-view-item-wrap']}>
                <ListItem
                  primaryText={listItem(original, translated, showOriginal)}
                  onClick={pathTo(url.sentencePage(did, id))}
                />
              </div>
            )
          }
        </List>
      </div>
    )
  }
}

ListView.propTypes = {
  sentences: types.array,
  did: types.string
}

export default ListView
