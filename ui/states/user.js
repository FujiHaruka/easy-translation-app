import { State, Effect, Actions, getState } from 'jumpstate'
import co from 'co'

const user = State('user', {
  initial: {
    loggedIn: false,
    userKey: '',
    token: ''
  },

  set (state, user) {
    return user
  }
})

Effect('login', ({ userKey, password }) => co(function * () {
  let { api } = getState().caller
  let { token, err } = yield api.requestToken({ userKey, password })
  if (err) {
    return {
      ok: false,
      err
    }
  }
  user.set({ loggedIn: true, userKey, token })
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
Effect('attemptLoginFromStorage', () => co(function * () {
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
  user.set({ loggedIn: true, userKey, token })
  return { ok: true }
}))

Effect('logout', () => co(function * () {
  if (window.localStorage) {
    let storage = window.localStorage
    storage.removeItem('userKey')
    storage.removeItem('token')
  }

  user.set({
    loggedIn: false,
    userKey: '',
    token: ''
  })

  let { userKey, token } = getState().user
  if (!userKey || !token) {
    return
  }
  let { api } = getState().caller
  if (!api) {
    throw new Error('Not connect API caller')
  }
  let { err } = yield api.deleteToken({ userKey, token })
  if (err) {
    throw err
  }
  return { ok: true }
}))

export default user
