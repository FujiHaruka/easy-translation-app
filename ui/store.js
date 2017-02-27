import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { CreateJumpstateMiddleware } from 'jumpstate'
import reducers from './states'

let jumpMW = CreateJumpstateMiddleware()
let composition = process.env.NODE_ENV === 'production'
  ? compose(applyMiddleware(jumpMW))
  : compose(
      applyMiddleware(jumpMW),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )

const store = createStore(
  combineReducers(reducers),
  composition
)

export default store
