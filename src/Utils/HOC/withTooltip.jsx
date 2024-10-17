import { useEffect, useRef, useState } from 'react';
import Tooltip from '../../Shared/Tooltip/Tooltip/Tooltip';

const withTooltip = (Component, Context, scrollElementId, extra) =>
	function InnerComponent(props) {
		const [show, setShow] = useState(false);

		const [message, setMessage] = useState('');

		const showRef = useRef(show);
		showRef.current = show;

		const containerRef = useRef(null);
		const eventRefs = useRef(null);

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
					if (element && msg) {
						setMessage(msg);
						element.addEventListener('mousemove', eventRefs.current.onMouseMove);
						element.addEventListener('mouseleave', eventRefs.current.onMouseLeave);
					} else if (element && !msg) {
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

		return (
			<Context.Provider value={eventRefs.current.contextEvents}>
				<Component {...props} />
				<Tooltip
					message={message}
					containerRef={containerRef}
					state={show}
					extra={extra}
					scrollElementId={scrollElementId}
				/>
			</Context.Provider>
		);
	};

export default withTooltip;
