import { useRef } from 'react';
import Scroller from '../Scroller/Scroller';
import styles from './ScrollBar.module.css';

function ScrollBar({ children }) {
	const outerContainerRef = useRef(null);
	const innerContainerRef = useRef(null);

	return (
		<div className={styles.outerScrollContainer} ref={outerContainerRef}>
			<div className={styles.scrollContainer} ref={innerContainerRef}>
				{children}
				<Scroller
					innerContainerRef={innerContainerRef}
					outerContainerRef={outerContainerRef}
				/>
			</div>
		</div>
	);
}

export default ScrollBar;
