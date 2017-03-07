import { State, Effect, getState } from 'jumpstate'
import { getApi } from '../helpers/store_util'
import co from 'co'

const suggestion = State('suggestion', {
  initial: '',
  set (state, payload = '') {
    return payload
  }
})

Effect('suggestTranslate', (text) => co(function * () {
  let api = getApi()
  let { userKey, token } = getState().user
  let translatedText = yield api.translate({ text, userKey, token })
  suggestion.set(translatedText)
}))

export default suggestion
