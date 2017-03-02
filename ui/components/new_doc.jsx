import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../css/new_doc.css'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import { browserHistory } from 'react-router'

class NewDoc extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      errs: []
    }
  }
  render () {
    const s = this
    let errs = s.state.errs.reduce((obj, err) => Object.assign(obj, { [err[0]]: err[1] }), {})
    return (
      <div styleName='wrap'>
        <div styleName='main'>
          <h2>New Document</h2>
          <div>
            <TextField
              id='newdoc-name'
              hintText='document name'
              errorText={errs.emptyName}
              style={{ color: '#666' }}
          />
          </div>
          <div>
            <textarea
              id='newdoc-text'
              styleName='textarea'
              rows={30}
              placeholder='Write text.'
            />
          </div>
          <div styleName='err'>
            {errs.emptyText}
          </div>
          <div>
            <div styleName='err'>
              {errs.createFailed}
            </div>
            <div styleName='submit-wrap'>
              <FlatButton
                label='Primary'
                primary
                onClick={s.submit.bind(s)}
            />
            </div>
          </div>
        </div>
      </div>
    )
  }

  submit () {
    const s = this
    let filename = document.getElementById('newdoc-name').value
    let text = document.getElementById('newdoc-text').value
    let errs = []
    if (!filename) {
      errs.push(['emptyName', 'Name field is required.'])
    }
    if (!text) {
      errs.push(['emptyText', 'Text field is required'])
    }
    if (errs.length > 0) {
      window.alert(errs[0][1])
      s.setState({ errs })
      return
    }
    let { api } = s.props.caller
    let { userKey, token } = s.props.user
    api.createDoc({ text, filename, userKey, token })
      .then(() => {
        // TODO /doc/:name/edit に行くべき
        browserHistory.push('/dashboard')
      })
      .catch(e => {
        let errs = [['createFailed', e.message]]
        s.setState({
          errs
        })
      })
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
