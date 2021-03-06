import { useState, useEffect } from 'react'
import styles from './button.module.css'
import Emoji from '../emoji/Emoji'

export default () => {
  const [state, setState] = useState({ emoji: false })

  const handleEmojiList = () => {
    setState({ emoji: !state.emoji })
  }

  const closeModal = event => {
    (state.emoji && event.target.closest('#emoji') === null)
      && setState({ ...state, emoji: false })
  }

  useEffect(() => {
    window.addEventListener('click', closeModal)
    return () => {
      window.removeEventListener('click', closeModal)
    }
  }, [state.emoji])

  return (
    <>
      {state.emoji ? <Emoji /> : <></>}
      <button type="button" className={styles.tooltip} onClick={handleEmojiList}>
        <i className="fa fa-face-smile"></i>
        <span className={styles.tooltiptext}>Emoji</span>
      </button>
    </>
  )
}