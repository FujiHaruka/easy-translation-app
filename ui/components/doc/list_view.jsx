import React, { PropTypes as types } from 'react'
import co from 'co'
import { Actions } from 'jumpstate'
import FlatButton from 'material-ui/FlatButton'
import { List, ListItem } from 'material-ui/List'
import { pathTo } from '../../helpers/util'
import url from '../../helpers/url'

const twoText = (first, second) => (
  <div>
    <div>{ first }</div>
    <div>{ second }</div>
  </div>
)

/**
 * 'list_view' mode
 */
class ListView extends React.Component {
  render () {
    const s = this
    let { sentences, styles, did } = s.props
    return (
      <div>
        <List>
          {
            sentences.map(({id, original, translated}) =>
              <div key={id}>
                <ListItem
                  primaryText={twoText(original, translated)}
                  onClick={pathTo(url.docPageOnEdit(did, id))}
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
  did: types.string,
  styles: types.object
}

export default ListView
