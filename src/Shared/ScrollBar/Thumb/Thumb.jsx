import { useRef } from 'react';
import useDragStartStop from '../../../Utils/Hooks/useDragStartStop';
import styles from './Thumb.module.css';

function Thumb({ style, container, show }) {
	const { factor, height } = style;

	const eventRefs = useRef(null);

	const startingPosition = useRef(null);
	const factorRef = useRef(factor);
	factorRef.current = factor;

	if (!eventRefs.current) {
		const root = document.getElementById('root');
		eventRefs.current = {
			onMove: e => {
				if (startingPosition.current === null) return;
				const clientY = e.clientY || e.clientY === 0 ? e.clientY : e.touches[0].clientY;
				container.scrollTop += (clientY - startingPosition.current) / factorRef.current;

				startingPosition.current = clientY;
			},
			onMouseDown: e => {
				startingPosition.current =
					e.clientY || e.clientY === 0 ? e.clientY : e.touches[0].clientY;
				root.style.userSelect = 'none';
				root.style.pointerEvents = 'none';
			},
			onMouseUp: () => {
				startingPosition.current = null;
				root.removeAttribute('style');
			},
		};
	}

	const onStart = useDragStartStop(
		eventRefs.current.onMove,
		eventRefs.current.onMouseUp,
		eventRefs.current.onMouseDown
	);

	return (
		<div
			className={`${styles.thumb} ${show ? styles.show : styles.hide}`}
			onMouseDown={onStart}
			style={{
				height,
				transform: `
                    matrix3d(
                        1, 0, 0, 0,
                        0, 1, 0, 0,
                        0, 0, 1, 0,
                        0, 0, 0, -1
                    )
                    scale(${1 / factor})
                    translateZ(${1 - 1 / factor - 2}px)
                `,
			}}
			role='scrollbar'
			aria-controls='scrollContainer'
			aria-valuenow={0}
			aria-orientation='vertical'
			aria-valuemax='100'
			aria-valuemin='0'
			aria-valuetext='0'
			tabIndex='0'
		/>
	);
}
export default Thumb;
