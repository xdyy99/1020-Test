import { useEffect, useState, useRef } from 'react';
import styles from './Menu.module.scss'

export default function Menu(props) {
  const [opened, setOpen] = useState(false)
  const menu = useRef(null)
  const list = useRef(null)

  const ToggleMenu = () => {
    setOpen(!opened)
  }

  const SetMenuHeight = () => {
    menu.current.style.setProperty('--menu-height', `${list.current.scrollHeight - list.current.clientHeight}px`);
  }

  useEffect(() => {
    SetMenuHeight()
    
    opened ? 
    menu.current.classList.add(styles.opened) :
    menu.current.classList.remove(styles.opened)
  }, [opened])



  return (
   <div className={styles.menu}  ref={menu}>
     <ul className={styles.list} ref={list}>
      {
        props.menu.map((item, index) => {
          return (
            <li key={index} className={styles.item}>
              <a href={item.url}>{item.name}</a>
            </li>
          )}
        )
      }
     </ul>

     <button 
      className={styles.button}
      onClick={ToggleMenu}
     >
      <div></div>
      <div></div>
      <div></div>
     </button>
   </div>
  )
}