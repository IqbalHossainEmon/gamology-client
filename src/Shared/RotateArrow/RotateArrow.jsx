import { useEffect, useRef, useState } from 'react';
import ArrowIcon from '../Icons/ArrowIcon/ArrowIcon';
import styles from './RotateArrow.module.css';

export default function RotateArrow({ state, toggleBtnRef }) {
	const [isTop, setIsTop] = useState(false);

	const eventRef = useRef(null);

	if (toggleBtnRef && !eventRef.current) {
		eventRef.current = () => {
			setIsTop(prevState => !prevState);
		};
	}

	useEffect(() => {
		const btnRef = toggleBtnRef?.current;

		if (btnRef) {
			btnRef.addEventListener('click', eventRef.current);
		}
		return () => {
			if (btnRef) {
				btnRef.removeEventListener('click', eventRef.current);
			}
		};
	}, [isTop, toggleBtnRef]);

	return (
		<ArrowIcon
			className={styles.rotateArrow}
			id={state || isTop ? styles.arrowUp : styles.arrowDown}
		/>
	);
}
