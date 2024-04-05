import styles from './Hero.module.scss'

import SliderFull from '../SliderFull'

import { CONTENTS, SLIDES } from './CONSTANTS'


export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.subtitle}>
          {CONTENTS.subtitle}
        </div>
        <h1 className={styles.title}>
          {CONTENTS.title}
        </h1>
      </div>

      <SliderFull slides={SLIDES} />
    </section>
  )
}