import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import { Link } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { getState, Actions } from 'jumpstate'
injectTapEventPlugin()

export default class App extends React.Component {
  render () {
    const s = this
    let { loggedIn } = getState().user
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title='Easy Translation'
            showMenuIconButton={false}
            iconElementRight={s.signButton(loggedIn)}
            />
          { s.props.children}
        </div>
      </MuiThemeProvider>
    )
  }

  signButton (loggedIn) {
    return (
      <FlatButton
        onClick={() => { Actions.logOutUser() }}
        >
        <Link
          to='/login'
          style={{ color: 'white' }}>
          { loggedIn ? 'Sign out' : 'Sign in' }
        </Link>
      </FlatButton>
    )
  }
}
