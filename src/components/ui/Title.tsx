import styles from './../../../styles/ItemList.module.css'

export const Title = ({ children }: { children: any }) => (
  <h1 className={styles.index}>{children}</h1>
)
