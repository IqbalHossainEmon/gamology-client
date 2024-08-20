import ArrowIcon from '../ArrowIcon/ArrowIcon';
import styles from './RotateArrow.module.css';

export default function RotateArrow({ state }) {
    return (<ArrowIcon
        className={styles.rotateArrow}
        id={state ? styles.arrowUp : styles.arrowDown}
            />);
}
