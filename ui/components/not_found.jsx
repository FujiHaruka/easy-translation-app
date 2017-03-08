import React from 'react'

let style = {
  marginTop: '3em',
  fontSize: '1.5em',
  color: '#999',
  width: '100%',
  textAlign: 'center'
}

export default class NotFound extends React.Component {
  render () {
    return (
      <div style={style}>
        Page Not Found.
      </div>
    )
  }
}
