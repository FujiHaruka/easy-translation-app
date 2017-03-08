import React, { PropTypes as types } from 'react'
import { ListItem } from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Paper from 'material-ui/Paper'
import { grey400 } from 'material-ui/styles/colors'
import moment from 'moment'
import { pathTo } from '../../helpers/util'

const paperStyle = {
  margin: '1em'
}

class DocListItem extends React.Component {
  render () {
    const s = this
    let {
      name,
      did,
      updatedAt
    } = s.props
    let update = moment(updatedAt).format('YYYY-MM-DD HH:mm')
    let secondaryText = `Last update: ${update}`
    return (
      <Paper zDepth={1} style={paperStyle}>
        <ListItem
          rightIconButton={s.menu()}
          primaryText={name}
          secondaryText={secondaryText}
          secondaryTextLines={1}
          onClick={pathTo(`/dashboard/docs/${did}`)}
      />
      </Paper>
    )
  }

  menu () {
    const s = this
    return (
      <IconMenu iconButtonElement={s.iconButtonElement()}>
        <MenuItem>Change name</MenuItem>
        <MenuItem>Delete</MenuItem>
      </IconMenu>
    )
  }

  iconButtonElement () {
    return (
      <IconButton
        touch
        tooltip='more'
        tooltipPosition='bottom-left'
        >
        <MoreVertIcon color={grey400} />
      </IconButton>
    )
  }
}

DocListItem.propTypes = {
  name: types.string,
  id: types.string,
  updatedAt: types.object
}

export default DocListItem
