import ArrowIcon from '../../../public/assets/images/icons/ArrowIcon';
import styles from './RotateArrow.module.css';

export default function RotateArrow({ state }) {
  return <ArrowIcon className={styles.rotateArrow} id={state ? styles.arrowDown : styles.arrowUp} />;
}
