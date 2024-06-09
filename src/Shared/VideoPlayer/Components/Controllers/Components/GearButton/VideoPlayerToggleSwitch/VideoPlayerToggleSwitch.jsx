import useAppearDisappear from '../../../../../../../Hooks/useAppearDisappear';
import ToggleSwitch from '../../../../../../ToggleSwitch/ToggleSwitch';
import styles from './VideoPlayerToggleSwitch.module.css';

const VideoPlayerToggleSwitch = ({ show: state, event, autoplay, setAutoplay }) => {
    const { show, fadeIn } = useAppearDisappear(state);

    return (
        show && (
            <div className={`${styles.menuContainer}${fadeIn ? ` ${styles.zoomIn}` : ''}`}>
                <button
                    className={styles.menu}
                    type="button"
                    onMouseDown={() => document.addEventListener('mouseup', event, { once: true })}
                >
                    <div className={styles.textContainer}>
                        <h5>Autoplay</h5>
                        <p>Applies to all videos</p>
                    </div>
                    <div className={styles.toggleSwitchContainer}>
                        <ToggleSwitch name="autoplay" state={autoplay} setState={setAutoplay} event={event} />
                    </div>
                </button>
            </div>
        )
    );
};
export default VideoPlayerToggleSwitch;
