import styles from './Navbar.module.scss'

import Button from '../Button'
import Menu from '../Menu'
import DATAMENU from './CONSTANTS'

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Menu menu={DATAMENU} />

      <Button url="#Contact">
        Contact us
      </Button>
    </nav>
  )
}