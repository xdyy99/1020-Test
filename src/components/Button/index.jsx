import styles from './Button.module.scss'

export default function Button(props) {
  return (
    <a href={props.url} className={styles.button}>
      {props.children}
      <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 8L1 8M19 8L12.25 15M19 8L12.25 1" stroke="#221F20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </a>
  )
}