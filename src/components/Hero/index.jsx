import styles from './Hero.module.scss'

import TextAnimate from '../TextAnimate'
import SliderFull from '../SliderFull'

import { CONTENTS, SLIDES } from './CONSTANTS'


export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.subtitle}>
        <TextAnimate>  
          {CONTENTS.subtitle}
        </TextAnimate>
        </div>
        <h1 className={styles.title}>
          <TextAnimate>
            {CONTENTS.title}
          </TextAnimate>
        </h1>
      </div>

      <SliderFull slides={SLIDES} />
    </section>
  )
}