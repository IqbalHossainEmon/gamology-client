import { useEffect, useRef, useState } from 'react';

export default function useToastLogics() {
	const [show, setShow] = useState(false);

	const [message, setMessage] = useState('');

	const showRef = useRef(show);
	showRef.current = show;

	const containerRef = useRef(null);
	const eventRefs = useRef(null);
	const listenerAdded = useRef(false);

	const timerId = useRef(null);

	if (!eventRefs.current) {
		eventRefs.current = {
			onMouseMove: e => {
				if (!showRef.current && !timerId.current) {
					timerId.current = setTimeout(() => {
						setShow(true);
					}, 200);
					containerRef.current = e.currentTarget;
				}
			},

			onMouseLeave: () => {
				if (timerId.current) {
					clearTimeout(timerId.current);
					timerId.current = null;
				}
				if (showRef.current) {
					setShow(false);
					containerRef.current = null;
				}
			},

			contextEvents: (element, msg, elementId) => {
				if (element && msg && !listenerAdded.current) {
					setMessage(msg);
					element.addEventListener('mousemove', eventRefs.current.onMouseMove);
					element.addEventListener('mouseleave', eventRefs.current.onMouseLeave);

					listenerAdded.current = true;
				} else if (element && !msg && listenerAdded.current) {
					if (showRef.current) {
						setShow(false);
					}

					setMessage('');
					element.removeEventListener('mousemove', eventRefs.current.onMouseMove);
					element.removeEventListener('mouseleave', eventRefs.current.onMouseLeave);
					if (elementId) {
						document
							.getElementById(elementId)
							.removeEventListener('scroll', eventRefs.current.onMouseLeave);
					}

					listenerAdded.current = false;
				}
			},
		};
	}

	useEffect(
		() => () => {
			if (containerRef.current) {
				containerRef.current.removeEventListener(
					'mousemove',
					eventRefs.current.onMouseMove
				);
				containerRef.current.removeEventListener(
					'mouseleave',
					eventRefs.current.onMouseLeave
				);
			}
		},
		[]
	);

	return { show, message, containerRef, eventRefs };
}
