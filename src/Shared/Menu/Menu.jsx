import { useEffect, useRef, useState } from 'react';
import styles from './Menu.module.css';

export default function Menu({
	children,
	parentState = true,
	Title,
	titleParams,
	defaultOpen = false,
}) {
	const [height, setHeight] = useState(defaultOpen || 0);
	const [isAuto, setIsAuto] = useState(defaultOpen);

	const containerRef = useRef(null);

	const eventRef = useRef(null);

	const showTimerId = useRef(null);
	const hideTimerId = useRef(null);

	useEffect(() => {
		setHeight(defaultOpen ? containerRef.current.scrollHeight : 0);
	}, [defaultOpen]);

	if (!eventRef.current) {
		eventRef.current = {
			show: () => {
				if (hideTimerId.current) {
					clearTimeout(hideTimerId.current);
					hideTimerId.current = null;
				}
				setHeight(containerRef.current.scrollHeight);
				showTimerId.current = setTimeout(() => {
					setIsAuto(true);
					showTimerId.current = null;
				}, 200);
			},
			hide: () => {
				if (showTimerId.current) {
					clearTimeout(showTimerId.current);
					showTimerId.current = null;
				}
				setIsAuto(false);
				hideTimerId.current = setTimeout(() => {
					setHeight(0);
					hideTimerId.current = null;
				}, 0);
			},
		};
	}

	return (
		<>
			<button
				className={`${styles.outerOption} ${styles.optionButton}`}
				onClick={() => {
					switch (!height) {
						case true:
							eventRef.current.show();
							break;
						default:
							eventRef.current.hide();
							break;
					}
				}}
				type='button'
			>
				<Title {...titleParams} state={!!height} />
			</button>
			<div
				className={styles.innerOptionsContainer}
				ref={containerRef}
				style={{ height: parentState ? (isAuto && height ? 'auto' : height) : 0 }}
			>
				{children}
			</div>
		</>
	);
}
