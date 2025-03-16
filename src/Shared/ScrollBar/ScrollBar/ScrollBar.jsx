import { useRef } from 'react';
import Scroller from '../Components/Scroller/Scroller/Scroller';
import styles from './ScrollBar.module.css';
function ScrollBar({ children, showPath = true, outerClassName, innerClassName }) {
	const outerContainerRef = useRef(null);
	const innerContainerRef = useRef(null);
	return (
		<div
			className={`${styles.outerScrollContainer}${outerClassName ? ` ${outerClassName}` : ''}`}
			ref={element => {
				outerContainerRef.current = element;
			}}
		>
			<div {...(innerClassName && { className: innerClassName })} ref={innerContainerRef}>
				{children}
			</div>
			<Scroller
				innerContainerRef={innerContainerRef}
				outerContainerRef={outerContainerRef}
				showPath={showPath}
			/>
		</div>
	);
}
export default ScrollBar;
