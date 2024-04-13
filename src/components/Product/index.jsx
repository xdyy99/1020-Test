import styles from './Product.module.scss'

import TextAnimate from '../TextAnimate'
import SliderCurve from '../SliderCurve'

import { CONTENTS, SLIDES } from './CONSTANTS'


export default function Hero() {

  return (
    <section className={styles.product}>
      <div className={styles.content}>
        <h2 className={styles.title}>
          <TextAnimate >
            {CONTENTS.title}
          </TextAnimate>
        </h2>
        <div className={styles.text}>
          <TextAnimate delay={0.05}>
            {CONTENTS.paragraph}
          </TextAnimate>
        </div>
      </div>

      <SliderCurve slides={SLIDES} />
    </section>
  )
}