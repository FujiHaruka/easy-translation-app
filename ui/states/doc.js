import { State, Effect, Actions, getState } from 'jumpstate'
import co from 'co'

const doc = State({
  initial: {
    docs: [],
    sort: 'recent'
  },

  setDocs (state, payload) {
    let { docs, sort } = payload
    // TODO sort
    docs.sort((a, b) => {
      return new Date(b.updateAt) - new Date(a.updateAt)
    })
    return {
      docs,
      sort
    }
  }
})

export default doc
