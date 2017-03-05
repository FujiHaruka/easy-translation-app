import { State, Effect, getState } from 'jumpstate'
import co from 'co'
import { getApi } from '../helpers/store_util'
import * as Im from 'immutable'
import _ from 'lodash'

const doc = State('doc', {
  initial: {
    // OrderedMap by id
    docMap: Im.OrderedMap({})
  },

  set (state, payload) {
    let { docs } = payload
    let docMap = Im.OrderedMap(_.keyBy(docs, 'id'))
    // TODO enable to sort other way
    docMap = docMap.sortBy(doc => (-1) * new Date(doc.updateAt))
    return {
      docMap
    }
  }
})

/**
 * Fetch docs through api and set.
 */
Effect('fetchDocs', () => co(function * () {
  let api = getApi()
  let state = getState()
  let { userKey, token } = state.user
  let { docs } = yield api.getDocs({ userKey, token })
  doc.set({ docs })
}))

export default doc
