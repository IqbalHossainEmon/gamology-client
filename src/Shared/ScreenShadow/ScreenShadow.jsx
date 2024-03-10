import styles from './ScreenShadow.module.css';

export default function ScreenShadow({ show }) {
  return <div className={styles.shadowPage} id={show ? styles.ShadowShow : styles.ShadowHide} />;
}
