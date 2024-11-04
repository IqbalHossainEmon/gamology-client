import { useRef } from 'react';
import Scroller from '../Components/Scroller/Scroller/Scroller';
import ScrollPath from '../Components/Scroller/ScrollPath/ScrollPath';
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
				<ScrollPath container={outerContainerRef.current} />
			</div>
			<Scroller innerContainerRef={innerContainerRef} outerContainerRef={outerContainerRef} />
		</div>
	);
}

export default ScrollBar;
