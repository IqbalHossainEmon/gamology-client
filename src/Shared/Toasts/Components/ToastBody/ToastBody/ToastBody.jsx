import { useRef, useState } from 'react';
import toastIcon from '../Components/toastIcon/toastIcon';
import ToastTimer from '../Components/ToastTimer/ToastTimer';
import styles from './ToastBody.module.css';

function ToastBody({ fadeIn, handleHide, data }) {
	const [isHover, setIsHover] = useState(false);

	const eventRefs = useRef(null);

	const isHovered = useRef(false);

	if (!eventRefs.current) {
		eventRefs.current = {
			onMouseMove: () => {
				if (isHovered.current) return;
				isHovered.current = true;
				setIsHover(true);
			},
			onMouseLeave: () => {
				if (!isHovered.current) return;
				isHovered.current = false;
				setIsHover(false);
			},
		};
	}

	const { toastTitle, toastMessage, type } = data;
	return (
		<li
			onMouseMove={eventRefs.current.onMouseMove}
			onMouseLeave={eventRefs.current.onMouseLeave}
			className={`${fadeIn ? `${styles.zoomIn} ` : ''} ${styles.toast} ${styles[type]}`}
		>
			<div className={styles.icon}>{toastIcon[type]}</div>
			<div className={styles.content}>
				<h3 className={styles.title}>{toastTitle}</h3>
				<p className={styles.message}>{toastMessage}</p>
			</div>
			<button className={styles.crossBtn} onClick={handleHide} type='button'>
				<span className={styles.cross} />
			</button>
			<ToastTimer type={type} isPaused={isHover} duration={6000} />
		</li>
	);
}

export default ToastBody;
