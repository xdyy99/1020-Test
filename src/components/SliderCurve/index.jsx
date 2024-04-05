import { useEffect, useState, useRef } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

import styles from './SliderCurve.module.scss'

export default function SliderCurve(props) {
  const [index, setIndex] = useState(0)
  const slider = useRef(null)


  useEffect(() => {
  }, [index])

  return (
    <Swiper
      className={styles.slider}
      spaceBetween={0}
      slidesPerView={'auto'}
      loop={true}
      centeredSlides={true}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {
        props.slides.map((slide, index) => {
          return (
            <SwiperSlide key={index} className={styles.item}>
              <div className={styles.image}>
                <img src={slide.image} />
              </div>
              <div className={styles.name}> 
                <span>{slide.name}</span>
              </div>
              <div className={styles.description}> 
                <span> {slide.description} </span>
              </div>
            </SwiperSlide>
          )
        })
      }
    </Swiper>
  )
}