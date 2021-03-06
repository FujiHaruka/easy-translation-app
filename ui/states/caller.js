import { State, Effect, Actions, getState } from 'jumpstate'
import sugoCaller from 'sugo-caller'
import co from 'co'

const caller = State('caller', {
  initial: {
    connected: false,
    api: null
  },
  setApi (state, api) {
    return {
      connected: true,
      api
    }
  }
})

Effect('connectCaller', () => co(function * () {
  let { protocol, host } = window.location
  let c = sugoCaller({
    protocol,
    host
  })
  let actor = yield c.connect('actor')
  let api = actor.get('api')
  caller.setApi(api)
}))

export default caller
