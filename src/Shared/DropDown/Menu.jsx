import { useEffect, useRef, useState } from 'react';
import useScreenWidth from '../../Utils/Hooks/useScreenWidth';
import styles from './Menu.module.css';

export default function Menu({ children, parentState, title }) {
	const { screenWidth } = useScreenWidth();
	const [show, setShow] = useState({ show: false, height: NaN });
	const containerRef = useRef(null);

	useEffect(() => {
		setShow(prev => ({ ...prev, height: containerRef.current?.scrollHeight }));
	}, [screenWidth]);

	return (
		<>
			<button
				className={`${styles.outerOption} ${styles.optionButton}`}
				onClick={() =>
					setShow(prev => ({
						...prev,
						show: !prev.show,
					}))
				}
				type='button'
			>
				{title}
			</button>
			<div
				className={styles.innerOptionsContainer}
				ref={containerRef}
				style={show.show ? { height: `${show.height}px` } : { height: '0px' }}
			>
				{children}
			</div>
		</>
	);
}
