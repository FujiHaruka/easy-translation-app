import React from 'react'
import { Component } from 'reflux'
import { Store, Actions } from '../store'

export default class Dashboard extends Component {
  constructor () {
    super()
    this.store = Store
  }

  render () {
    const s = this
    return (
      <div>
        Dashboard
      </div>
    )
  }
}