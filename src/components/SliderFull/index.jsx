import { useEffect, useState, useRef } from 'react';
import styles from './SliderFull.module.scss'

const TIME = 5000
const DISTANCE = 1000 - 630
const DELAY = TIME / DISTANCE

let Timer = null
let Loader = null

export default function SliderFull(props) {
  const [index, setIndex] = useState(0)
  const slider = useRef(null)

  const nextSlide = () =>{
    if(index == props.slides.length - 1) {
      setIndex(0)
    } else {
      setIndex(index + 1)
    }
  } 

  const formatNumber = (number) => {
    const num = '0' + number
    return num.slice(-2)
  }

  const updateIndex = (number) => {
    const indexWrap = slider.current.querySelector(`.${styles.actived}`)
    indexWrap.innerHTML = formatNumber(number + 1)
  }

  const changeSlide = () => {
    const slides = slider.current.querySelectorAll(`.${styles.item}`)
    const thumbs = slider.current.querySelectorAll(`.${styles.thumbnail}`)

    const prev = index === 0 ? props.slides.length - 1 : index - 1
    const next = index + 1 === props.slides.length ? 0 : index + 1
    
    slides.forEach((slide, i) => {
      i === index ?
      slide.classList.add(styles.active)
      : slide.classList.remove(styles.active)
      
      i === prev?
      slide.classList.add(styles.prev)
      : slide.classList.remove(styles.prev)
    })

    thumbs.forEach((thumb, i) => {
      i === index ?
      thumb.classList.add(styles.active)
      : thumb.classList.remove(styles.active)
      
      i === next?
      thumb.classList.add(styles.next)
      : thumb.classList.remove(styles.next)
    
    })
  }

  const setAutoPlay = () => {
    clearTimeout(Timer)
    
    Timer = setTimeout(() => {
      nextSlide()
    }, TIME)
  }

  const setLoading = () => {
    clearInterval(Loader)
    let current = 1000

    Loader = setInterval(() => {
      current = current - 1 
      slider.current.style.setProperty('--loading',  current);
    }, DELAY)
  }



  useEffect(() => {
    changeSlide()
    updateIndex(index)
    setAutoPlay()
    setLoading()
  }, [index])

  return (
    <div className={styles.slider} ref={slider}>
      <div className={styles.wrapper} >
      {
        props.slides.map((slide, index) => {
          return (
            <div key={index} className={styles.item}>
              <img src={slide.image} />
            </div>
          )
        })
      }
      </div>
      <div className={styles.navigation}>
          <div className={styles.square}>
            <div className={styles.button} onClick={nextSlide} >
              <span >
                Next
              </span>

              {
                props.slides.map((slide, index) => {
                  return (
                    <div key={index} className={styles.thumbnail}>
                      <img src={slide.thumb} />
                    </div>
                  )
                })
              }
            </div> 

            <div className={styles.bar}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width='100' height='100'>
                <path
                  fill="transparent"
                  stroke="#fff"
                  strokeWidth="8px"
                  strokeDashoffset="100"
                  strokeDasharray="1000"
                  d="M50 4 H96 V96 H4 V4 z"
                ></path>
              </svg>
            </div>
          </div>

          <div className={styles.number}>
              <div className={styles.actived}></div>
              <div className={styles.line}></div> 
              <div>
              {formatNumber(props.slides.length)}
              </div>
          </div>
      </div>
    </div>
  )
}