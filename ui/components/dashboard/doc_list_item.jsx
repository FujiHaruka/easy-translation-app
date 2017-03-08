import React, { PropTypes as types } from 'react'
import { ListItem } from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import Dialog from 'material-ui/Dialog'
import { grey400 } from 'material-ui/styles/colors'
import moment from 'moment'
import { pathTo } from '../../helpers/util'
import styles from '../../css/doc_list_item.css'
import url from '../../helpers/url'
import co from 'co'
import { getState, Actions } from 'jumpstate'

class DocListItem extends React.Component {
  constructor () {
    super()
    const s = this
    s.changeName = s.changeName.bind(s)
    s.deleteFile = s.deleteFile.bind(s)
    s.openChangeNameDialog = s.openChangeNameDialog.bind(s)
    s.openDeleteDialog = s.openDeleteDialog.bind(s)
    s.closeChangeNameDialog = s.closeChangeNameDialog.bind(s)
    s.closeDeleteDialog = s.closeDeleteDialog.bind(s)
    s.deleteActions = [
      <FlatButton
        label='Cancel'
        onTouchTap={s.closeDeleteDialog}
      />,
      <FlatButton
        label='Delete'
        primary
        onTouchTap={s.deleteFile}
      />
    ]
    s.changeNameActions = [
      <FlatButton
        label='Cancel'
        onTouchTap={s.closeChangeNameDialog}
      />,
      <FlatButton
        label='OK'
        primary
        onTouchTap={s.changeName}
      />
    ]
    s.state = {
      isOpenDeleteDialog: false,
      isOpenChangeNameDialog: false
    }
  }

  render () {
    const s = this
    let {
      name,
      did,
      updatedAt
    } = s.props
    let {
      isOpenDeleteDialog,
      isOpenChangeNameDialog
    } = s.state
    let update = moment(updatedAt).format('YYYY-MM-DD HH:mm')
    let secondaryText = `Last update: ${update}`
    return (
      <Paper zDepth={1} className={styles.paper}>
        <ListItem
          primaryText={name}
          secondaryText={secondaryText}
          secondaryTextLines={1}
          rightIconButton={s.menu()}
          onTouchTap={pathTo(url.docPageOnListView(did))}
          />

        <Dialog
          title='Confirmation'
          actions={s.deleteActions}
          modal={false}
          open={isOpenDeleteDialog}
          onRequestClose={s.closeDeleteDialog}
          >
          Are you sure to delete the file?
        </Dialog>

        <Dialog
          title='Change the file name'
          actions={s.changeNameActions}
          modal={false}
          open={isOpenChangeNameDialog}
          onRequestClose={s.openChangeNameDialog}
          >
          <TextField
            defaultValue={name}
            id={`doc-list-item-change-${name}`}
          />
        </Dialog>
      </Paper>
    )
  }

  menu () {
    const s = this
    return (
      <IconMenu
        iconButtonElement={s.iconButtonElement()}>
        <MenuItem onTouchTap={s.openChangeNameDialog}>Change file name</MenuItem>
        <MenuItem onTouchTap={s.openDeleteDialog}>Delete file</MenuItem>
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

  changeName () {
    const s = this
    let filename = document.getElementById(`doc-list-item-change-${s.props.name}`).value
    if (!filename) {
      console.error('Text field empty.')
      return
    }
    return co(function * () {
      let state = getState()
      let { api } = state.caller
      let { userKey, token } = state.user
      let id = s.props.did
      yield api.updateDocName({ userKey, token, id, filename })
      s.closeChangeNameDialog()
      yield Actions.fetchDocs()
    })
  }

  deleteFile () {
    const s = this
    return co(function * () {
      let state = getState()
      let { api } = state.caller
      let { userKey, token } = state.user
      let id = s.props.did
      yield api.deleteDoc({ userKey, token, id })
      s.closeDeleteDialog()
      yield Actions.fetchDocs()
    })
  }

  openDeleteDialog () {
    this.setState({ isOpenDeleteDialog: true })
  }

  openChangeNameDialog () {
    this.setState({ isOpenChangeNameDialog: true })
  }

  closeDeleteDialog () {
    this.setState({ isOpenDeleteDialog: false })
  }

  closeChangeNameDialog () {
    this.setState({ isOpenChangeNameDialog: false })
  }
}

DocListItem.propTypes = {
  name: types.string,
  did: types.string,
  updatedAt: types.object
}

export default DocListItem
