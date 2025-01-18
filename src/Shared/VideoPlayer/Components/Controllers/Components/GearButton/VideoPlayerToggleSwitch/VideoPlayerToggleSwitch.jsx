import { useRef } from 'react';
import useAppearDisappear from '../../../../../../../Utils/Hooks/useAppearDisappear';
import ToggleSwitch from '../../../../../../ToggleSwitch/ToggleSwitch';
import styles from './VideoPlayerToggleSwitch.module.css';

function VideoPlayerToggleSwitch({ show: state, onClick, autoplay, setAutoplay }) {
	const [show, fadeIn] = useAppearDisappear(state);

	const eventRef = useRef(null);

	if (!eventRef.current) {
		eventRef.current = {
			onMouseDown: () => {
				document.addEventListener('mouseup', onClick);
			},
			handleOnMove: () => {
				document.removeEventListener('mouseup', onClick);
			},
		};
	}
	return (
		show && (
			<div className={`${styles.menuContainer}${fadeIn ? ` ${styles.zoomIn}` : ''}`}>
				<button
					className={styles.menu}
					onMouseDown={eventRef.current.onMouseDown}
					type='button'
				>
					<div className={styles.textContainer}>
						<h5>Autoplay</h5>
						<p>Applies to all videos</p>
					</div>

					<div className={styles.toggleSwitchContainer}>
						<ToggleSwitch
							onSwitchMove={eventRef.current.handleOnMove}
							mouseDownEvent={eventRef.current.handleMouseDownTimer}
							name='autoplay'
							setState={setAutoplay}
							state={autoplay}
						/>
					</div>
				</button>
			</div>
		)
	);
}
export default VideoPlayerToggleSwitch;
