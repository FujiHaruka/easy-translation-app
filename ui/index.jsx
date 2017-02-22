import * as React from 'react'
import { render } from 'react-dom'
import { store } from './store'
import {Router, Route, browserHistory} from 'react-router'
import App from './components/app'
import Home from './components/home'
import Login from './components/login'
import Dashboard from './components/dashboard'

function requireAuth (nextState, replace) {
  let { loggedIn } = store.getState()
  if (!loggedIn) {
    replace('/login')
  }
}

const Index = (
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path='/' component={Home} />
      <Route path='/login' component={Login} />
      <Route path='/dashboard' component={Dashboard} />
    </Route>
  </Router>
)

document.addEventListener('DOMContentLoaded', () => {
  render(
    Index,
    document.getElementById('site')
  )
})
