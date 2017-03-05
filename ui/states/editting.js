import { State, Effect, getState, Actions } from 'jumpstate'
import co from 'co'
import _ from 'lodash'
import * as Im from 'immutable'
import { getApi } from '../helpers/store_util'

const editting = State('editting', {
  initial: {
    targetDoc: {},
    // OrderedMap by id
    sentenceMap: Im.OrderedMap({}),
    mode: 'all' // all or one
  },

  setTargetDoc (state, targetDoc) {
    return _.assign({}, state, { targetDoc })
  },

  setSentences (state, sentences) {
    let sentenceMap = Im.OrderedMap(_.keyBy(sentences, 'id'))
    sentenceMap = sentenceMap.sortBy(s => s.order)
    return _.assign({}, state, { sentenceMap })
  },

  changeMode (state, mode) {
    return _.assign({}, state, { mode })
  }
})

Effect('fetchDocById', (id) => co(function * () {
  let api = getApi()
  let { userKey, token } = getState().user
  let { doc, err } = yield api.getDocById({ id, userKey, token })
  if (err) {
    throw err
  }
  editting.setTargetDoc(doc)
}))

Effect('fetchSentences', (did) => co(function * () {
  let api = getApi()
  let { userKey, token } = getState().user
  let { sentences, err } = yield api.getSentences({ did, userKey, token })
  if (err) {
    throw err
  }
  editting.setSentences(sentences)
}))

Effect('updateTranslations', ({did, updateList}) => co(function * () {
  let api = getApi()
  let { userKey, token } = getState().user
  for (let updated of updateList) {
    let {id, translated} = updated
    yield api.updateSentenceTranslation({id, translated, userKey, token})
  }
  yield Actions.fetchSentences(did)
}))

export default editting
