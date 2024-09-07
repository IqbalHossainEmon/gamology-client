import { useEffect, useRef, useState } from 'react';
import useScreenWidth from '../../../../../../Hooks/useScreenWidth';
import RotateArrow from '../../../../../../Shared/RotateArrow/RotateArrow';
import styles from './DrawerOptions.module.css';

function DrawerOptions({ option, parentState }) {
	const { screenWidth } = useScreenWidth();
	const [show, setShow] = useState({ show: false, height: NaN });
	const containerRef = useRef(null);

	useEffect(() => {
		setShow(prev => ({ ...prev, height: containerRef.current?.scrollHeight }));
	}, [screenWidth]);

	return option.subDrawer ? (
		<li className={styles.outerOptionContainer}>
			<button
				className={`${parentState ? `${styles.outerOptionCollapse} ` : ''}${styles.outerOption} ${styles.optionButton}`}
				onClick={() =>
					setShow(prev => ({
						...prev,
						show: !prev.show,
					}))
				}
				type='button'
			>
				<span className={styles.iconContainer}>{option.icon}</span>

				{option.name}

				<div
					className={`${parentState ? `${styles.btnBottom} ` : ''}${styles.arrowButton}`}
				>
					<RotateArrow state={show.show} />
				</div>
			</button>
			<ul
				className={styles.innerOptionsContainer}
				ref={containerRef}
				style={show.show ? { height: `${show.height}px` } : { height: '0px' }}
			>
				{option.subDrawer.map(subOption => (
					<li className={styles.innerOptionContainer} key={subOption.id}>
						<p className={styles.innerOption}>
							<span className={styles.iconContainer}>{subOption.icon}</span>

							{subOption.name}
						</p>
					</li>
				))}
			</ul>
		</li>
	) : (
		<li className={styles.outerOptionContainer}>
			<p className={styles.outerOption}>
				<span className={styles.iconContainer}>{option.icon}</span>

				{option.name}
			</p>
		</li>
	);
}
export default DrawerOptions;
