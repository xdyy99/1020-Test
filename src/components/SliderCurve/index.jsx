import { useEffect, useState, useRef } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

import styles from './SliderCurve.module.scss'

const cursor = {
  x: 0,
  y: 0,
  targetX: 0,
  targetY: 0,
  speed: 0.2
}

export default function SliderCurve(props) {

  const slider = useRef(null)

  const [count, setCount] = useState(0)

  useAnimationFrame(deltaTime => {
    // Pass on a function to the setter of the state
    // to make sure we always have the latest state
    setCount(prevCount => (prevCount + deltaTime * 0.01) % 100)

    if (slider.current) {
      animateSlide()
      animateCursor()
    }

  })

  const animateSlide = () => {
    const wrappers = slider.current.querySelectorAll(`.${styles.image}`)
    const images = slider.current.querySelectorAll(`.${styles.image} img`)
    const isDesktop = window.innerWidth > 900

    wrappers.forEach((el, i) => {
      const position = el.getBoundingClientRect().left + el.offsetWidth / 2 - window.innerWidth / 2 
      const angle = isDesktop ? position / 50 : position / 20
      const offsetY = isDesktop ? Math.abs(position / 8) : Math.abs(position / 12)
      const offsetX = isDesktop ? position / 8 : position / 16


      images[i].style.transform = `rotate(${angle}deg) translate(${offsetX}px, ${offsetY}px)`
    });
  }

  const animateCursor = () => {
    cursor.x = lerp(cursor.x, cursor.targetX, cursor.speed)
    cursor.y = lerp(cursor.y, cursor.targetY, cursor.speed)

    const cursorEl = slider.current.querySelector(`.${styles.cursor}`)
    cursorEl.style.left = `${cursor.x}px`
    cursorEl.style.top = `${cursor.y}px`
  }

  const setActiveSlide = (index) => {
    if (!slider.current) return
    const infos = slider.current.querySelectorAll(`.${styles.infoItem}`)
    infos.forEach((el, i) => {
      el.classList.remove(styles.infoActive)
      if (i === index) {
        el.classList.add(styles.infoActive)
      }
    });
  }

  const updateCoords = (e) => {
    cursor.targetX = e.pageX - slider.current.offsetLeft
    cursor.targetY = e.pageY - slider.current.offsetTop
  }

  return (
    <div ref={slider}>
      <div className={styles.sliderWrap}
        onMouseMove={(e) => updateCoords(e)}
      >
        <Swiper
          className={styles.slider}
          spaceBetween={0}
          slidesPerView={'auto'}
          loop={true}
          centeredSlides={true}
          onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
          onSwiper={(swiper) => setActiveSlide(swiper.realIndex)}
        >
          {
            props.slides.map((slide, index) => {
              return (
                <SwiperSlide key={index} className={styles.item}>
                  <div className={styles.image}>
                    <img src={slide.image} />
                  </div>
                </SwiperSlide>
              )
            })
          }
        </Swiper>

        <div className={styles.cursor}>
          Drag
        </div>
      </div>

    <div className={styles.infoWrap}>
      {
        props.slides.map((slide, index) => {
          return (
            <div className={styles.infoItem} key={index}>
              <div className={styles.name}> 
                <span>{slide.name}</span>
              </div>
              <div className={styles.description}> 
                <span> {slide.description} </span>
              </div>
            </div>
          )
        })
      }
    </div>

    </div>
  )
}

const useAnimationFrame = callback => {
  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef = useRef();
  const previousTimeRef = useRef();
  
  const animate = time => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      callback(deltaTime)
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }
  
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // Make sure the effect runs only once
}

const lerp = (start, end, t) => {
  return start * (1 - t) + end * t;
}