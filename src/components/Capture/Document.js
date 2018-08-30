import { h, Component } from 'preact'
import { appendToTracking } from '../../Tracker'
import { AutoShot } from '../Photo'
import Uploader from '../Uploader'
import withCameraDetection from './withCameraDetection'
import withFlowChangeOnDisconnectCamera from './withFlowChangeOnDisconnectCamera'
import compose from '../utils/func'
import randomId from '../utils/randomString'

const defaultPayload = {
  method: 'document',
}

class Document extends Component {
  static defaultProps {
    side: 'front',
  }

  handleCapture = payload => {
    const { documentType, actions, side, nextStep } = this.props

    actions.setCapture({
      ...defaultPayload,
      ...payload,
      documentType: documentType === 'poa' ? 'unknown' : documentType,
      side,
      id: payload.id || randomId(),
    })
    nextStep()
  }

  handleImage = (blob, base64) => this.handleCapture({ blob, base64 })

  handleValidAutoShot = (blob, base64, id) => this.handleCapture({ blob, base64, id })

  handleError = () => this.props.actions.deleteCapture('document')

  render() {
    const { useWebcam, hasCamera, documentType, side } = this.props
    const copyNamespace = `capture.${documentType}.${side}`
    const title = i18n.t(`${copyNamespace}.title`)
    const uploadTitle = i18n.t(`${copyNamespace}.upload_title`) || title
    const instructions = i18n.t(`${copyNamespace}.instructions`)
    const parentheses = i18n.t('capture_parentheses')
    const moreProps = { ...this.props, title, onError: this.handleError }

    return useWebcam && hasCamera ? 
      <AutoShot {...moreProps} onValidShot={ this.handleValidAutoShot } /> :
      <Uploader
        onUpload={ this.handleImage }
        {...moreProps}
        {...{parentheses, instructions, title: uploadTitle }}
      />
  }
}

export default compose(
  appendToTracking,
  withCameraDetection,
  withFlowChangeOnDisconnectCamera,
)(Document)