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
  let { caller } = getState()
  let { api, connected } = caller
  if (!connected) {
    throw new Error(`Api caller is not connected.`)
  }
  let { token, err } = yield api.requestToken({ userKey, password })
  if (err) {
    throw err
  }
  user.setUser({ loggedIn: true, userKey, token })
}))

export default user
