import { useRef, useState } from 'react';
import useToast from '../../../../../Hooks/useToast';
import toastIcon from '../Components/toastIcon/toastIcon';
import ToastTimer from '../Components/ToastTimer/ToastTimer';
import styles from './ToastBody.module.css';

function ToastBody({ fadeIn: show, data }) {
	const [isHover, setIsHover] = useState(false);

	const eventRefs = useRef(null);

	const isHovered = useRef(false);

	const { hideToast } = useToast();

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
			handleHide: () => {
				hideToast(data.id);
			},
		};
	}

	const { toastTitle, toastMessage, type } = data;
	return (
		<li
			onMouseMove={eventRefs.current.onMouseMove}
			onMouseLeave={eventRefs.current.onMouseLeave}
			className={`${show ? `${styles.show} ` : ''} ${styles.toast} ${styles[type]}`}
		>
			<div className={styles.icon}>{toastIcon[type]}</div>
			<div className={styles.content}>
				<h3 className={styles.title}>{toastTitle}</h3>
				<p className={styles.message}>{toastMessage}</p>
			</div>
			<button
				className={styles.crossBtn}
				onClick={eventRefs.current.handleHide}
				type='button'
			>
				<span className={styles.cross} />
			</button>
			<ToastTimer
				type={type}
				handleHide={eventRefs.current.handleHide}
				isPaused={isHover}
				duration={6000}
			/>
		</li>
	);
}

export default ToastBody;
