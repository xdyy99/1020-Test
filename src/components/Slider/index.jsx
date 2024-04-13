import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

import styles from './Slider.module.scss'

function Slider({ slides }) {
  const slider = useRef(null)

  // Scale default value
  const SCALE = {
    default: 1,
    value: 0.4,
    range: window.innerWidth * 0.2,
    start: window.innerWidth * 0.5,
    center: window.innerWidth * 0.7,
    end: window.innerWidth * 0.9,
  }

  // Opacity default value
  const OPACITY = {
    default: 1,
    value: -1,
    range: window.innerWidth * 0.1,
    start: window.innerWidth * 0.7,
  }

  // Slider active default value
  const SLIDER = {
    active: 0,
    offset: 3,
    total: slides.length,
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useAnimationFrame(() => {
    if (slider.current) {
      animateSlide()
    }
  })

  const handleResize = () => {
    if (slider.current) {
      if (window.innerWidth >= 1025) {
        // Desktop
        // Scale animation range 50% => 70% => 90%
        SCALE.default = 1
        SCALE.range = window.innerWidth * 0.2
        SCALE.start = window.innerWidth * 0.5
        SCALE.center = window.innerWidth * 0.7
        SCALE.end = window.innerWidth * 0.9

        // Opacity animation range 70% => 80%
        OPACITY.start = window.innerWidth * 0.7

        // Slider active value
        SLIDER.offset = 3
      } else if (window.innerWidth >= 769) {
        // Tablet
        // Scale animation range 50% => 62.5% =>  75%
        SCALE.default = 1
        SCALE.range = window.innerWidth * 0.125
        SCALE.start = window.innerWidth * 0.5
        SCALE.center = window.innerWidth * 0.625
        SCALE.end = window.innerWidth * 0.75

        // Opacity animation range 62.5% => 72.5%
        OPACITY.start = window.innerWidth * 0.625

        // Slider active value
        SLIDER.offset = 2
      } else {
        // Mobile
        // Scale animation range 0% => 50% =>  100%
        SCALE.default = 1.3
        SCALE.range = window.innerWidth * 0.5
        SCALE.start = 0
        SCALE.center = window.innerWidth * 0.5
        SCALE.end = window.innerWidth

        // Opacity animation range 200% (no opacity change)
        OPACITY.start = window.innerWidth * 2

        // Slider active value
        SLIDER.offset = 1
      }
    }

    setActiveSlide(0)
  }

  const animateSlide = () => {
    if (!slider.current) return
    const wrappers = slider.current.querySelectorAll(`.${styles.slider_image}`)
    const images = slider.current.querySelectorAll(
      `.${styles.slider_image} img`
    )

    wrappers.forEach((wrap, i) => {
      // Image position
      const position = wrap.getBoundingClientRect().left + wrap.offsetWidth / 2

      // Calculate scale
      let scalePercent = 0
      if (position > SCALE.start && position < SCALE.end) {
        scalePercent =
          1 - Math.min(Math.abs(position - SCALE.center) / SCALE.range, 1)
      }
      const scale = SCALE.default + scalePercent * SCALE.value

      // Calculate opacity
      let percentOpacity = 0
      if (position > OPACITY.start) {
        percentOpacity = Math.min(
          Math.abs(position - OPACITY.start) / OPACITY.range,
          1
        )
      }
      const opacity = OPACITY.default + percentOpacity * OPACITY.value

      // Apply scale and opacity
      images[i].style.transform = `scale(${scale})`
      images[i].style.opacity = opacity
    })
  }

  const setActiveSlide = (index) => {
    if (!slider.current) return
    SLIDER.active = index
    const activeIndex = (SLIDER.active + SLIDER.offset) % SLIDER.total

    const items = slider.current.querySelectorAll(`.${styles.info_item}`)
    items.forEach((item, i) => {
      i === activeIndex
        ? item.classList.add(styles.active)
        : item.classList.remove(styles.active)
    })
  }

  return (
    <div ref={slider} className={styles.slider}>
      <div className={styles.slider_wrapper}>
        <Swiper
          className={styles.slider_container}
          modules={[Navigation]}
          spaceBetween={0}
          slidesPerView={'auto'}
          loop={true}
          navigation
          onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
          onSwiper={(swiper) => setActiveSlide(swiper.realIndex)}
        >
          {slides.map((slide) => {
            return (
              <SwiperSlide
                key={slide.key}
                className={`${styles.slider_item} ${slide.name.replace(' ', '-')}`}
              >
                <div className={styles.slider_image}>
                  <img src={slide.image} />
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>

      <div className={styles.info_wrapper}>
        {slides.map((slide) => {
          return (
            <div className={styles.info_item} key={slide.key}>
              <div className={styles.info_name}>
                <span>{slide.name}</span>
              </div>
              <div className={styles.info_position}>
                <span> {slide.position} </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const useAnimationFrame = (callback) => {
  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef = useRef()
  const previousTimeRef = useRef()

  const animate = (time) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current
      callback(deltaTime)
    }
    previousTimeRef.current = time
    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current)
  }, []) // Make sure the effect runs only once
}

Slider.propTypes = {
  slides: PropTypes.array.isRequired,
}

export default Slider
