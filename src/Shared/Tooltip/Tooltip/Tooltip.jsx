import { useEffect, useRef, useState } from 'react';
import useScreenWidth from '../../../Utils/Hooks/useScreenWidth';
import TooltipBody from '../TooltipBody/TooltipBody';

function Tooltip({ message, containerRef }) {
	const [show, setShow] = useState(false);
	const [position, setPosition] = useState({ x: 0, y: 0, position: 'left' });

	const showRef = useRef(show);
	showRef.current = show;

	const eventRefs = useRef(null);

	if (!eventRefs.current) {
		eventRefs.current = {
			onMouseMove: () => {
				if (!showRef.current) {
					setShow(true);
				}
			},
			onMouseLeave: () => {
				if (showRef.current) {
					setShow(false);
				}
			},
			calculatePosition: () => {
				const container = containerRef.current;
				const { x, y, width } = container.getBoundingClientRect();
				const { innerWidth } = window;

				const top = y;
				const left = x;
				const right = innerWidth - x - width;

				if (left >= 250) {
					setPosition('left');
				} else if (right >= 250) {
					setPosition('right');
				} else if (top >= 100) {
					setPosition('top');
				} else {
					setPosition('bottom');
				}
			},
		};
	}

	const screenWidth = useScreenWidth();

	useEffect(() => {
		eventRefs.current.calculatePosition();
	}, [screenWidth]);

	useEffect(() => {
		let container;
		if (containerRef.current) {
			container = containerRef.current;
			container.addEventListener('mousemove', eventRefs.current.onMouseMove);
			container.addEventListener('mouseleave', eventRefs.current.onMouseLeave);
			window.addEventListener('scroll', eventRefs.current.calculatePosition);
		}
		return () => {
			if (container) {
				container.removeEventListener('mousemove', eventRefs.current.onMouseMove);
				container.removeEventListener('mouseleave', eventRefs.current.onMouseLeave);
			}
		};
	}, [containerRef]);

	return <TooltipBody message={message} state={show} position={position} />;
}
export default Tooltip;
