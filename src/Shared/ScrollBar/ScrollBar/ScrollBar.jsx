import { useRef } from 'react';
import Scroller from '../Components/Scroller/Components/Scroller/Scroller';
import styles from './ScrollBar.module.css';

function ScrollBar({ children, scrollContainer }) {
	const outerContainerRef = useRef(null);
	const innerContainerRef = useRef(null);

	return (
		<div
			className={styles.outerScrollContainer}
			ref={element => {
				outerContainerRef.current = element;
				if (scrollContainer.current === null) scrollContainer.current = element;
			}}
		>
			<div className={styles.scrollContainer} ref={innerContainerRef}>
				{children}
			</div>
			<Scroller innerContainerRef={innerContainerRef} outerContainerRef={outerContainerRef} />
		</div>
	);
}

export default ScrollBar;
