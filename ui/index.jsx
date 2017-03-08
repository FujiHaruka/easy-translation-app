import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Redirect, browserHistory } from 'react-router'
import App from './components/app'
import Login from './components/login'
import Dashboard from './components/dashboard'
import NewDoc from './components/new_doc'
import Doc from './components/doc'
import Sentence from './components/sentence'
import NotFound from './components/not_found'
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
      <Redirect from='/' to='/dashboard' />
      <Route path='/login' component={Login} />
      <Route path='/dashboard' component={Dashboard} onEnter={requireAuth} />
      <Route path='/dashboard/docs/new' component={NewDoc} onEnter={requireAuth} />
      <Route path='/dashboard/docs/:did' component={Doc} onEnter={requireAuth} />
      <Route path='/dashboard/docs/:did/:sid' component={Sentence} onEnter={requireAuth} />
      <Route path='*' component={NotFound} />
    </Route>
  </Router>
)

document.addEventListener('DOMContentLoaded', co(function * () {
  let clipboard = new Clipboard('.copy') // clipboard.js
  yield Actions.connectCaller()
  yield Actions.attemptLoginFromStorage()
  render(
    Index,
    document.getElementById('site')
  )
}).catch(e => {
  window.alert(e.message)
}))

/* global Clipboard */
