import { useContext, useEffect } from 'react'
import { Context } from '../../Provider'
import config from '../../config'
import server from '../../utilities/Server'
import store from '../../utilities/Store'
import styles from './dropdown.module.css'

export default () => {
  const [context, dispatch] = useContext(Context)

  const handleEdit = () => {}

  const handleDelete = async event => {
    if (!window.confirm('Permanently delete message?')) {
      return
    }
    const id = Number(event.target.closest('article').id)
    const response = await server.remove(`${config.api.remove.message}/${id}`)
    if (response.error !== undefined) {
      return alert(response.error.message)
    }
    const data = context.filter(obj => obj.id !== id)
    dispatch({ type: 'feed', payload: data })

    // doesnt updating dispatch automatically close the menu?
    // test without the following
    const menu = document.querySelector('[open=true]')
    menu.lastChild.style.display = 'none'
    menu.removeAttribute('open')
  }

  const toggleMenu = event => {
    document.querySelectorAll('[type=dropdown]').forEach(x => {
      if (event.currentTarget.parentElement.id !== x.id) { 
        x.lastChild.style.display = 'none'
      }
    })
    const menu = event.currentTarget.nextElementSibling
    if (menu.style.display !== 'block') {
      menu.style.display = 'block' 
      menu.parentElement.setAttribute('open', 'true')
    } else {
      menu.style.display = 'none'
      menu.parentElement.removeAttribute('open')
    }
  }

  const closeMenu = event => {
    if (event.target.closest('[type=dropdown]') === null && document.querySelector('[open=true]') !== null) {
      const menu = document.querySelector('[open=true]')
      menu.lastChild.style.display = 'none'
      menu.removeAttribute('open')
    }
  }

  useEffect(() => {
    window.addEventListener('click', closeMenu)
    return () => {
      window.removeEventListener('click', closeMenu)
    }
  }, [])

  return (
    <div className={styles.dropdown} type="dropdown">
      <button onClick={toggleMenu}>
        <i className="fa fa-ellipsis-vertical"></i>
      </button>
      <div>
        <button onClick={handleEdit}>
          <i className="fa fa-pen-to-square"></i>
          <span>Edit</span>
          </button>
        <button onClick={handleDelete}>
          <i className="fa fa-trash-can"></i>
          <span>Delete</span>
        </button>
      </div>
    </div>
  )
}