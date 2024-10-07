import { useEffect, useRef, useState } from 'react';
import TooltipBody from '../TooltipBody/TooltipBody';

function Tooltip({ message, containerRef }) {
	const [show, setShow] = useState(false);
	const [position, setPosition] = useState('top');

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
		};
	}

	useEffect(() => {
		let container;
		if (containerRef.current) {
			container = containerRef.current;
			container.addEventListener('mousemove', eventRefs.current.onMouseMove);
			container.addEventListener('mouseleave', eventRefs.current.onMouseLeave);
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
