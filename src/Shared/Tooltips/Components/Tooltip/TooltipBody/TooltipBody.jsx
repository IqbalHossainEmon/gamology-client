import { useEffect, useRef, useState } from 'react';
import useTooltip from '../../../../../Utils/Hooks/useTooltip';
import styles from './TooltipBody.module.css';

const getTooltipPosition = (targetElementBounds, tooltipDimensions, scrollY, preferPosition) => {
	const { top, left, width, height } = targetElementBounds;
	const { height: tooltipHeight, width: tooltipWidth } = tooltipDimensions;

	const positions = {
		left: {
			top: top + Math.abs(scrollY) + height / 2 - tooltipHeight / 2,
			left: left - tooltipWidth - 10,
			arrowOn: 'right',
			isValid: () => left - (tooltipWidth + 20) > 0,
		},
		right: {
			top: top + Math.abs(scrollY) + height / 2 - tooltipHeight / 2,
			left: left + width + 10,
			arrowOn: 'left',
			isValid: () => window.innerWidth - left - width - 20 > tooltipWidth + 20,
		},
		top: {
			top: top + Math.abs(scrollY) - tooltipHeight - 10,
			left: left + width / 2 - tooltipWidth / 2,
			arrowOn: 'bottom',
			isValid: () => top - (tooltipHeight + 20) > 0,
		},
		bottom: {
			top: top + Math.abs(scrollY) + height + 10,
			left: left + width / 2 - tooltipWidth / 2,
			arrowOn: 'top',
			isValid: () => window.innerHeight - top - height - 20 > tooltipHeight,
		},
	};

	const fallbackOrder = {
		left: ['left', 'right', 'top', 'bottom'],
		right: ['right', 'left', 'top', 'bottom'],
		top: ['top', 'bottom', 'left', 'right'],
		bottom: ['bottom', 'top', 'left', 'right'],
	};

	const preferOrder = fallbackOrder[preferPosition] || ['left', 'right', 'top', 'bottom'];

	return positions[preferOrder.find(pos => positions[pos].isValid())];
};

function TooltipBody({ fadeIn, data }) {
	const { container, message, preferPosition } = data;

	const [position, setPosition] = useState({ top: 0, left: 0, arrowOn: '' });

	const tooltipRef = useRef(null);

	const setTooltip = useTooltip();

	const eventRefs = useRef(null);

	if (!eventRefs.current) {
		eventRefs.current = {
			onMouseOver: () => {
				eventRefs.current.hide = setTooltip({ current: data });
			},
			onMouseLeave: () => {
				if (eventRefs.current.hide) {
					eventRefs.current.hide(container);
					delete eventRefs.current.hide;
				}
			},
		};
	}

	useEffect(() => {
		const tooltip = tooltipRef.current;

		if (container && tooltip) {
			tooltip.addEventListener('mouseover', eventRefs.current.onMouseOver);
			tooltip.addEventListener('mouseleave', eventRefs.current.onMouseLeave);
			tooltip.toolTipElement = true;

			let scrollY = 0;

			scrollY = document.getElementById('root').scrollTop;

			setPosition(
				getTooltipPosition(
					container.getBoundingClientRect(),
					tooltip.getBoundingClientRect(),
					scrollY,
					preferPosition
				)
			);
			return () => {
				tooltip.removeEventListener('mouseover', eventRefs.current.onMouseOver);
				tooltip.removeEventListener('mouseleave', eventRefs.current.onMouseLeave);
			};
		}
	}, [container, preferPosition]);

	return (
		<div
			className={`${styles.toolTips}${fadeIn ? ` ${styles.fadeIn}` : ''} ${styles[position.arrowOn]}`}
			style={{ left: `${position.left}px`, top: `${position.top}px` }}
			ref={tooltipRef}
		>
			<p>{message}</p>
		</div>
	);
}
export default TooltipBody;
