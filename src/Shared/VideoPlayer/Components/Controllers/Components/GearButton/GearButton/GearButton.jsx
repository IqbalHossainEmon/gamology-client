import { useCallback, useEffect, useRef, useState } from 'react';
import useDropDownHide from '../../../../../../../Hooks/useDropDownHide';
import VideoPlayerToggleSwitch from '../VideoPlayerToggleSwitch/VideoPlayerToggleSwitch';
import styles from './GearButton.module.css';

function GearButton({ gearRef }) {
	const [autoplay, setAutoplay] = useState({ autoplay: false });
	const [show, setShow] = useState(false);
	const showRef = useRef(show);
	showRef.current = show;

	const eventRef = useRef({
		handleClick: () => {},
	});
	const { showMenu, setElement, stopMenu } = useDropDownHide(setShow);
	const timerId = useRef(null);
	const handleSwitchShowTimer = useCallback(() => {
		if (timerId.current) {
			clearTimeout(timerId.current);
			timerId.current = null;
		}
		timerId.current = setTimeout(() => {
			timerId.current = null;
			setShow(false);
			stopMenu();
		}, 5000);
	}, [stopMenu]);

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
		if (showRef.current) {
			handleSwitchShowTimer();
		}
	}, [autoplay, handleSwitchShowTimer]);

	eventRef.current.handleClick = useCallback(() => {
		setAutoplay(prev => ({
			autoplay: !prev.autoplay,
		}));
	}, []);

	return (
		<>
			<button
				className={styles.gearButton}
				onClick={() =>
					setShow(prev => {
						if (prev) {
							stopMenu();
							clearTimeout(timerId.current);
						} else {
							showMenu();
							handleSwitchShowTimer();
						}
						return !prev;
					})
				}
				type="button"
			>
				<span>
					<svg viewBox="0 0 10 10">
						<title>Settings</title>

						<path
							d="M3.587 6.413C3.977 6.804 4.449 7 5 7s1.022-.196 1.413-.587C6.804 6.023 7 5.551 7 5s-.196-1.022-.587-1.413A1.926 1.926 0 0 0 5 3c-.551 0-1.022.196-1.413.587A1.926 1.926 0 0 0 3 5c0 .551.196 1.022.587 1.413zm5.234-.92l1.08.822c.113.078.129.187.049.328L8.917 8.38c-.064.11-.169.141-.313.094l-1.273-.493c-.337.235-.625.4-.865.493L6.274 9.79c-.033.14-.113.211-.24.211H3.966c-.128 0-.208-.07-.24-.211l-.193-1.315a3.956 3.956 0 0 1-.865-.493l-1.273.493c-.144.047-.249.016-.313-.094L.05 6.643c-.08-.14-.064-.25.048-.328l1.081-.822A3.706 3.706 0 0 1 1.155 5c0-.22.008-.383.024-.493L.1 3.685c-.113-.078-.129-.187-.049-.328L1.083 1.62c.064-.11.169-.141.313-.094l1.273.493c.337-.235.625-.4.865-.493L3.726.21C3.76.071 3.84 0 3.966 0h2.067c.128 0 .208.07.24.211l.193 1.315c.304.125.592.29.865.493l1.273-.493c.144-.047.249-.016.313.094L9.95 3.357c.08.14.064.25-.048.328l-1.081.822c.016.11.024.274.024.493 0 .22-.008.383-.024.493z"
							fill="white"
							fillRule="evenodd"
						/>
					</svg>
				</span>
			</button>

			<VideoPlayerToggleSwitch
				autoplay={autoplay.autoplay}
				event={eventRef.current.handleClick}
				mouseUpEvent={handleSwitchShowTimer}
				setAutoplay={setAutoplay}
				show={show}
				timerId={timerId}
			/>
		</>
	);
}

export default GearButton;
