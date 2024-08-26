import { useRef } from 'react';
import useAppearDisappear from '../../../../../../../Hooks/useAppearDisappear';
import ToggleSwitch from '../../../../../../ToggleSwitch/ToggleSwitch';
import styles from './VideoPlayerToggleSwitch.module.css';

function VideoPlayerToggleSwitch({
	show: state,
	event,
	autoplay,
	setAutoplay,
	timerId,
	mouseUpEvent,
}) {
	const { show, fadeIn } = useAppearDisappear(state);

	const eventRef = useRef(null);

	if (!eventRef.current) {
		eventRef.current = {
			handleMouseDownTimer: () => {
				if (timerId.current) {
					clearTimeout(timerId.current);
					timerId.current = null;
				}
			},
		};
	}
	return (
		show && (
			<div className={`${styles.menuContainer}${fadeIn ? ` ${styles.zoomIn}` : ''}`}>
				<button
					className={styles.menu}
					onMouseDown={() => document.addEventListener('mouseup', event, { once: true })}
					type="button"
				>
					<div className={styles.textContainer}>
						<h5>Autoplay</h5>
						<p>Applies to all videos</p>
					</div>

					<div className={styles.toggleSwitchContainer}>
						<ToggleSwitch
							event={event}
							mouseDownEvent={eventRef.current.handleMouseDownTimer}
							mouseUpEvent={mouseUpEvent}
							name="autoplay"
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
