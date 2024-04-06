import styles from './TextAnimate.module.scss'
import { useEffect, useRef } from 'react';

export default function TextAnimate(props) {
  const el = useRef(null)

  useEffect(() => {
    setTimeout(() => {
      animate()
    }, 1000)

    window.addEventListener('scroll', () => {
      const pos = el.current.getBoundingClientRect().top
      const start = window.innerHeight * 0.5
      if (pos < start) {
        el.current.classList.add(styles.active)
      }
    })
  }, [])

  const animate = () => {
    const pos = el.current.getBoundingClientRect().top
    const start = window.innerHeight * 0.5
    if (pos < start) {
      el.current.classList.add(styles.active)
    }
  }

  const formatString = (string) => {
    const line = string.split('\n')
    return line.map((item, index) => {
      return (
        <div key={index}>
          {formatWord(item)}
        </div>
      )
    })


  }
  
  const formatWord = (string) => {
    return string.split(' ').map((word, index) => {
      const time = props.delay || 0.1
      const delay = {
        transitionDelay: `${index * time}s`
      }
      return (
        <span key={index} className={styles.wrap}>
          <span className={styles.inner} style={delay}>
            {word}
          </span>
        </span>
      )
    })
  }
  

  return (
    <div ref={el} className={styles.line}>
      {formatString(props.children)}
    </div>
  )
}