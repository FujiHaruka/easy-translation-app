import { State, Effect, getState, Actions } from 'jumpstate'
import co from 'co'
import { getApi } from '../helpers/store_util'
import * as Im from 'immutable'
import _ from 'lodash'

const doc = State('doc', {
  initial: {
    // OrderedMap by id
    docMap: Im.OrderedMap({}),
    // View this doc
    targetDoc: {},
    // On one view mode
    targetSentenceId: '',
    // OrderedMap by id
    sentenceMap: Im.OrderedMap({}),
    // list, one
    viewMode: 'list'
  },

  setDocs (state, { docs }) {
    let docMap = Im.OrderedMap(_.keyBy(docs, 'id'))
    // TODO enable to sort other way
    docMap = docMap.sortBy(doc => (-1) * new Date(doc.updateAt))
    return _.assign({}, state, { docMap })
  },

  setTargetDoc (state, targetDoc) {
    return _.assign({}, state, { targetDoc })
  },

  setSentences (state, sentences) {
    let sentenceMap = Im.OrderedMap(_.keyBy(sentences, 'id'))
    sentenceMap = sentenceMap.sortBy(s => s.order)
    return _.assign({}, state, { sentenceMap })
  },

  changeViewMode (state, options) {
    let { viewMode } = options
    switch (viewMode) {
      case 'list':
        return _.assign({}, state, { viewMode })
      case 'one':
        let { targetSentenceId } = options
        return _.assign({}, state, { viewMode, targetSentenceId })
    }
  },

  resetTargetDoc (state) {
    let reset = {
      targetDoc: {},
      targetSentenceId: '',
      sentenceMap: Im.OrderedMap({}),
      viewMode: 'list'
    }
    return _.assign({}, state, reset)
  }
})

/**
 * Fetch docs through api and set docs.
 */
Effect('fetchDocs', () => co(function * () {
  let api = getApi()
  let state = getState()
  let { userKey, token } = state.user
  let { docs } = yield api.getDocs({ userKey, token })
  doc.setDocs({ docs })
}))

/**
 * Fetch doc by id and set target doc.
 */
Effect('fetchDocById', (id) => co(function * () {
  let api = getApi()
  let { userKey, token } = getState().user
  let { doc: _doc, err } = yield api.getDocById({ id, userKey, token })
  if (err) {
    throw err
  }
  doc.setTargetDoc(_doc)
}))

/**
 * Fetch sentences by doc id and set sentences.
 */
Effect('fetchSentences', (did) => co(function * () {
  let api = getApi()
  let { userKey, token } = getState().user
  let { sentences, err } = yield api.getSentences({ did, userKey, token })
  if (err) {
    throw err
  }
  doc.setSentences(sentences)
}))

/**
 * Update translated sentences
 */
Effect('updateTranslations', ({did, updateList}) => co(function * () {
  let api = getApi()
  let { userKey, token } = getState().user
  for (let updated of updateList) {
    let {id, translated} = updated
    yield api.updateSentenceTranslation({id, translated, userKey, token})
  }
  yield Actions.fetchSentences(did)
}))

export default doc
