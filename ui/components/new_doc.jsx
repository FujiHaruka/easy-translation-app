import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../css/new_doc.css'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import { Actions } from 'jumpstate'

class NewDoc extends React.Component {
  render () {
    const s = this
    return (
      <div styleName='wrap'>
        <div styleName='main'>
          <h2>New Document</h2>
          <div>
            <TextField
              id='newdoc-name'
              hintText='document name'
              errorText='This field is required'
          />
          </div>
          <div>
            <textarea
              id='newdoc-text'
              styleName='textarea'
              rows={50}
              placeholder='Write text.'
            />
          </div>
          <div>
            <FlatButton
              label='Primary'
              primary
              onClick={s.submit}
            />
          </div>
        </div>
      </div>
    )
  }

  submit () {
    const s = this
    let filename = document.getElementById('newdoc-name').value
    let text = document.getElementById('newdoc-text').value
    if (!filename) {
      window.alert('Name field is required.')
      return
    }
    if (!text) {
      window.alert('Text field is required.')
      return
    }
    // TODO 実装
    Actions.createDoc({ text, filename })
  }
}

export default connect(
  state => state
)(
  CSSModules(
    NewDoc,
    styles,
    { allowMultiple: true }
  )
)
