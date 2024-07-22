import useHideShowFadeInOut from '../../Hooks/useHideShowFadeInOut';
import styles from './ScreenShadow.module.css';

export default function ScreenShadow({ show: state }) {
    const { show, fadeIn } = useHideShowFadeInOut(state);

    return show && <div className={styles.shadowPage} id={fadeIn ? styles.ShadowShow : styles.ShadowHide} />;
}
