import styles from '../../../styles/FormStyles.module.css';
function Title ({ title }) {
  return (
    <div className={styles.h1}>
      <h1>{title}</h1>
    </div>
  )
}

export default Title;