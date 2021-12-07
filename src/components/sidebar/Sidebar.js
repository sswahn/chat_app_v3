import { useContext } from 'react'
import { Context } from '../../Provider'
import styles from './sidebar.module.css'

export default () => {
  const [context, dispatch] = useContext(Context)

  const createChat = event => {
    // 5 chat limit, make conditional check in form:
    dispatch({ type: 'modal', payload: 'create-chat' })
  }

  return (
    <aside id="header" className={styles.sidebar}>
      <button type="button" onClick={createChat}>
        <i className="fas fa-plus"></i>
        <span>Create</span>
      </button>
    </aside>
  )
}