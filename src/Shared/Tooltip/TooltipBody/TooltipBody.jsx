import { useEffect, useRef, useState } from 'react';
import styles from './TooltipBody.module.css';

function TooltipBody({ message, containerRef, fadeIn, scrollElementId, extra = 0 }) {
	const [position, setPosition] = useState({ top: 0, left: 0, arrowOn: '' });

	const tooltipRef = useRef(null);

	useEffect(() => {
		if (containerRef.current) {
			const { top, left, width, height } = containerRef.current.getBoundingClientRect();
			const { height: tooltipHeight, width: tooltipWidth } =
				tooltipRef.current.getBoundingClientRect();

			let scrollY = 0;

			if (scrollElementId) {
				scrollY = document.getElementById(scrollElementId).getBoundingClientRect().top;
			}

			if (left - (tooltipHeight + 20) > 0) {
				setPosition({
					top: top + Math.abs(scrollY) + extra + height / 2 - tooltipHeight / 2,
					left: left - tooltipWidth - 10,
					arrowOn: 'right',
				});
			} else if (window.innerWidth - left - width - 20 > tooltipWidth + 20) {
				setPosition({
					top: top + height / 2 - tooltipHeight / 2,
					left: left + width + 10,
					arrowOn: 'left',
				});
			} else if (top - (tooltipHeight + 20) > 0) {
				setPosition({
					top: top - tooltipHeight - 10,
					left: left + width / 2 - tooltipWidth / 2,
					arrowOn: 'bottom',
				});
			} else {
				setPosition({
					top: top + height + 10,
					left: left + width / 2 - tooltipWidth / 2,
					arrowOn: 'top',
				});
			}
		}
	}, [containerRef, extra, fadeIn, scrollElementId]);

	return (
		<div
			className={`${styles.toolTips}${fadeIn ? ` ${styles.fadeIn}` : ''} ${styles[position.arrowOn]}`}
			style={{ translate: `${position.left}px ${position.top}px` }}
		>
			<p ref={tooltipRef}>{message}</p>
		</div>
	);
}
export default TooltipBody;
