import { State } from 'jumpstate'
import _ from 'lodash'

const config = State('config', {
  initial: {
    dictLink: true
  },
  toggleDictLink (state, payload) {
    let { dictLink } = state
    return _.assign({}, state, { dictLink: !dictLink })
  }
})

export default config
