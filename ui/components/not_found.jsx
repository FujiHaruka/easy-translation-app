import React from 'react'
import { Component } from 'reflux'
import { Store, Actions } from '../store'

export default class NotFound extends Component {
  constructor () {
    super()
    this.store = Store
  }

  render () {
    const s = this
    return (
      <div>
        NotFound
      </div>
    )
  }
}
