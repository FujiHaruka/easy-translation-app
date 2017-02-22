import React from 'react'
import { Component } from 'reflux'
import { Store, Actions } from '../store'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import { Link } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

export default class App extends Component {
  constructor () {
    super()
    this.store = Store
  }

  render () {
    const s = this
    console.log(s)
    let { loggedIn } = s.state
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
