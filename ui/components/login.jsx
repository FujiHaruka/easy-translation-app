import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import CSSModules from 'react-css-modules'
import styles from '../css/login.css'
import FlatButton from 'material-ui/FlatButton'
import { Actions } from 'jumpstate'
import { browserHistory } from 'react-router'
import co from 'co'
import c from 'classnames'

class Login extends React.Component {
  constructor () {
    super()
    this.state = {
      err: null,
      shaking: false
    }
  }

  render () {
    const s = this
    let { err, shaking } = s.state
    return (
      <div styleName='wrap'>
        <Card styleName={c('card', shaking ? 'shake' : '')}>
          <form onSubmit={s.submit.bind(s)}>
            <CardHeader
              title='Sign in'
              titleStyle={{ fontSize: '1.5em' }}
          />
            <TextField
              hintText='User name'
              id='eta-login-user'
          /><br />
            <TextField
              hintText='Password'
              type='password'
              id='eta-login-password'
          />
            {
            err ? <CardText style={{ color: 'red' }}>{ err.message }</CardText> : ''
          }
            <div styleName='submit'>
              <FlatButton
                label='Sign in'
                primary
                type='submit'
            />
            </div>
          </form>
        </Card>
      </div>
    )
  }

  submit (e) {
    const s = this
    e.preventDefault()
    let userKey = document.getElementById('eta-login-user').value
    let password = document.getElementById('eta-login-password').value
    return co(function * () {
      let { err } = yield Actions.requestToken({ userKey, password })
      if (err) {
        s.setState({ err })
        s.shake()
        return
      }
      browserHistory.push('/dashboard')
    })
  }

  shake () {
    const s = this
    s.setState({ shaking: true })
    setTimeout(() => {
      s.setState({ shaking: false })
    }, 200)
  }
}

export default CSSModules(Login, styles, { allowMultiple: true })
