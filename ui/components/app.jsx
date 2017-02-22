import React from 'react'
import { Component } from 'reflux'
import { Store, Actions } from '../store'
import { Navbar, NavItem } from 'react-materialize'

export default class App extends Component {
  constructor () {
    super()
    this.store = Store
  }

  render () {
    const s = this
    let { loggedIn } = s.state
    return (
      <div>
        <Navbar brand='Easy Translation' right>
          <NavItem href='/dashboard'>Dashboard</NavItem>
          {
            loggedIn
            ? <NavItem href='/login'>Sign out</NavItem>
            : <NavItem href='/login'>Sign in</NavItem>
          }
        </Navbar>
        { s.props.children}
      </div>
    )
  }
}
