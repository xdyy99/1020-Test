import styles from './Product.module.scss'

import SliderCurve from '../SliderCurve'

import { CONTENTS, SLIDES } from './CONSTANTS'


export default function Hero() {
  return (
    <section className={styles.product}>
      <div className={styles.content}>
        <h2 className={styles.title}>
          {CONTENTS.title}
        </h2>
        <div className={styles.text}>
          {CONTENTS.paragraph}
        </div>
      </div>

      <SliderCurve slides={SLIDES} />
    </section>
  )
}