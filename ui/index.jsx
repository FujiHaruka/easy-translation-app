import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import App from './components/app'
import Home from './components/home'
import Login from './components/login'
import Dashboard from './components/dashboard'
import NewDoc from './components/new_doc'
import Doc from './components/doc'
import store from './store'
import { Actions } from 'jumpstate'
import co from 'co'

function requireAuth (nextState, replace) {
  let { loggedIn } = store.getState().user
  if (!loggedIn) {
    replace('/login')
  }
}

const Index = (
  <Router history={browserHistory}>
    <Route component={App} className='root'>
      <Route path='/' component={Home} />
      <Route path='/login' component={Login} />
      <Route path='/dashboard' component={Dashboard} onEnter={requireAuth} />
      <Route path='/dashboard/docs/new' component={NewDoc} onEnter={requireAuth} />
      <Route path='/dashboard/docs/:did' component={Doc} onEnter={requireAuth} />
    </Route>
  </Router>
)

document.addEventListener('DOMContentLoaded', co(function * () {
  yield Actions.connectCaller()
  yield Actions.attemptLoginFromStorage()
  render(
    Index,
    document.getElementById('site')
  )
}).catch(e => {
  window.alert(e.message)
}))
