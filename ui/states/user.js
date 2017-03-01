import { State, Effect, Actions, getState } from 'jumpstate'
import co from 'co'

const user = State({
  initial: {
    loggedIn: false,
    userKey: '',
    token: ''
  },

  setUser (state, user) {
    return user
  }
})

Effect('requestToken', ({ userKey, password }) => co(function * () {
  let { api } = getState().caller
  let { token, err } = yield api.requestToken({ userKey, password })
  if (err) {
    return {
      ok: false,
      err
    }
  }
  user.setUser({ loggedIn: true, userKey, token })
  if (window.localStorage) {
    let storage = window.localStorage
    storage.setItem('userKey', userKey)
    storage.setItem('token', token)
  }
  return { ok: true }
}))

/**
 * Set user info if saved in localStorage.
 */
Effect('attemptUserFromStorage', () => co(function * () {
  if (!window.localStorage) {
    return { ok: false }
  }
  let storage = window.localStorage
  let userKey = storage.getItem('userKey')
  let token = storage.getItem('token')
  if (!userKey || !token) {
    return { ok: false }
  }
  let { api } = getState().caller
  let { ok } = yield api.validateToken({ userKey, token })
  if (!ok) {
    storage.removeItem('userKey')
    storage.removeItem('token')
    return { ok: false }
  }
  user.setUser({ loggedIn: true, userKey, token })
  return { ok: true }
}))

Effect('logOutUser', () => co(function * () {
  if (window.localStorage) {
    let storage = window.localStorage
    storage.removeItem('userKey')
    storage.removeItem('token')
  }
  let { userKey, token } = getState().user
  if (userKey && token) {
    try {
      let { api } = getState().caller
      let { err } = yield api.deleteToken({ userKey, token })
      if (err) {
        console.error(err)
      }
    } catch (e) {
      console.error(e)
    }
  }
  return {
    loggedIn: false,
    userKey: '',
    token: ''
  }
}))

export default user
