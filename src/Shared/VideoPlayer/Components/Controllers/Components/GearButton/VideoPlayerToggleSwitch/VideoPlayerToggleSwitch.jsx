import { useEffect, useRef, useState } from 'react';
import useAppearDisappear from '../../../../../../../Utils/Hooks/useAppearDisappear';
import ToggleSwitch from '../../../../../../ToggleSwitch/ToggleSwitch';
import styles from './VideoPlayerToggleSwitch.module.css';

function VideoPlayerToggleSwitch({ show: state, setElement, gearRef }) {
	const [autoplay, setAutoplay] = useState({ autoplay: false });

	const [show, fadeIn] = useAppearDisappear(state);

	useEffect(() => {
		setElement(gearRef.current);
		if (localStorage.getItem('autoplay')) {
			setAutoplay({ autoplay: true });
		}
	}, [gearRef, setElement]);

	useEffect(() => {
		//   Change in local storage
		if (autoplay.autoplay) {
			localStorage.setItem('autoplay', 'true');
		} else {
			localStorage.removeItem('autoplay');
		}
	}, [autoplay]);

	const eventRef = useRef(null);
	if (!eventRef.current) {
		eventRef.current = {
			handleToggle: () => {
				setAutoplay(prev => ({ autoplay: !prev.autoplay }));
				document.removeEventListener('mouseup', eventRef.current.handleToggle);
			},
			onMouseDown: () => {
				document.addEventListener('mouseup', eventRef.current.handleToggle);
			},
			handleOnMove: () => {
				document.removeEventListener('mouseup', eventRef.current.handleToggle);
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
							state={autoplay.autoplay}
						/>
					</div>
				</button>
			</div>
		)
	);
}
export default VideoPlayerToggleSwitch;
