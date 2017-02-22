import Reflux from 'reflux'

let initState = {
  // auth
  loggedIn: false,
  token: ''
}

export const Actions = Reflux.createActions([
  'updateAuth'
])

export class Store extends Reflux.Store {
  constructor () {
    super()
    const s = this
    s.state = initState
    s.listenTo(Actions.updateAuth, s.onUpdateAuth) // actions
  }

  onUpdateAuth ({ loggedIn, token }) {
    this.setState({ loggedIn, token })
  }
}

// Singleton instance
export const store = Reflux.initStore(Store)

export default Store
