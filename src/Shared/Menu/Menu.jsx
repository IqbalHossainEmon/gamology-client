import { useRef, useState } from 'react';
import useScreenWidth from '../../Utils/Hooks/useScreenWidth';
import styles from './Menu.module.css';

export default function Menu({ children, parentState = true, Title, titleParams }) {
	useScreenWidth();
	const [height, setHeight] = useState(0);

	const containerRef = useRef(null);

	return (
		<>
			<button
				className={`${styles.outerOption} ${styles.optionButton}`}
				onClick={() => {
					if (!height) {
						setHeight(containerRef.current.scrollHeight);
					} else {
						setHeight(0);
					}
				}}
				type='button'
			>
				<Title {...titleParams} state={!!height} />
			</button>
			<div
				className={styles.innerOptionsContainer}
				ref={containerRef}
				style={{ height: parentState ? height : 0 }}
			>
				{children}
			</div>
		</>
	);
}
