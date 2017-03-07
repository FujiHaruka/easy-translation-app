import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../css/new_doc.css'
import { connect } from 'react-redux'
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import { browserHistory } from 'react-router'
import styleObject from '../helpers/style_object'
import { pathTo } from '../helpers/util'
import url from '../helpers/url'

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
          <div>
            <FlatButton
              label='Dashboard'
              icon={<i className='fa fa-chevron-left' />}
              onClick={pathTo(url.dashboardPage())}
              />
          </div>
          <Toolbar style={{ background: 'white' }}>
            <ToolbarTitle text='New Document' style={styleObject.toolbarTitle} />
          </Toolbar>
          <div styleName='submit-wrap'>
            <FlatButton
              label='Create Document'
              primary
              onClick={s.submit.bind(s)}
              />
          </div>
          <div styleName='err'>
            {errs.createFailed}
          </div>
          <div>
            <TextField
              id='newdoc-name'
              hintText='document name'
              errorText={errs.emptyName}
              style={{ color: '#666' }}
          />
          </div>
          <div styleName='err'>
            {errs.emptyText}
          </div>
          <div>
            <textarea
              id='newdoc-text'
              styleName='textarea'
              rows={30}
              placeholder='Write text.'
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
