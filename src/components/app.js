import { h, Component } from 'preact'
import { route } from 'preact-router'
import classNames from 'classnames'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { unboundActions, store, events, connect as ws } from 'onfido-sdk-core'

import Welcome from './Welcome'
import Select from './Select'
import Capture from './Capture'
import Confirm from './Confirm'
import Complete from './Complete'

import screenWidth from './utils/screenWidth'

import styles from '../style/style.css'

class App extends Component {

  componentWillMount () {
    const { token } = this.props.options
    this.socket = ws(token)
  }

  render () {
    const { step } = this.props
    const defaults = {
      prevLink: `/step/${(parseInt(step, 10) - 1 || 1)}/`,
      nextLink: `/step/${(parseInt(step, 10) + 1 || 1)}/`,
      ...this.props
    }
    const steps = [
      // :step/0
      <Welcome {...defaults} />,
      // :step/1
      <Select method='document' {...defaults} />,
      // :step/2
      <Capture method='document' {...defaults} autoCapture={true} socket={this.socket} />,
      // :step/3
      <Capture method='face' {...defaults} autoCapture={false} socket={this.socket} />,
      // :step/4
      <Complete {...defaults} />,
    ]
    const [ first ] = steps
    return (
      <div>
        {step && steps[step] || first}
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    documentCaptures: state.documentCaptures,
    faceCaptures: state.faceCaptures,
    ...state.globals
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(unboundActions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
