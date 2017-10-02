import { h } from 'preact'

import theme from '../../Theme/style.css'
import style from './style.css'
import {preventDefaultOnClick} from '../../utils'

const MobileConnected = ({message, submessage, back}) => {
  return (
    <div className={theme.step}>
      <h1 className={`${theme.title} ${theme.center}`}>{message}</h1>
      <p className={style.submessage}>{submessage}</p>
      <span className={`${theme.icon} ${style.icon}`}></span>
      <div className={theme.header}>Tips</div>
      <div className={`${style.help} ${theme.help}`}>
        <ul className={theme.helpList}>
          <li>Keep this window open while using your mobile</li>
          <li>Your mobile link will expire in one hour</li>
          <li>Don't refresh this page</li>
        </ul>
      </div>
      <div href='#' className={style.cancel}
         onClick={preventDefaultOnClick(back)}>Cancel</div>
    </div>
  )
}

MobileConnected.defaultProps =  {
  message: 'Connected to your mobile',
  submessage: "Once you've finished we'll take you to the next step"
}

//TODO add screen tracking
export default MobileConnected