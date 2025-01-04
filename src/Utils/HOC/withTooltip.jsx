import { useEffect, useRef, useState } from 'react';
import Tooltip from '../../Shared/Tooltip/Tooltip/Tooltip';
import SetTooltipContext from '../Contexts/TooltipContext';

const withTooltip = Component =>
	function InnerComponent(props) {
		const [show, setShow] = useState(false);

		const [message, setMessage] = useState('');

		const showRef = useRef(show);
		showRef.current = show;

		const containerRef = useRef(null);

		const eventRefs = useRef(null);

		const hoverTimerRef = useRef(null);
		const leaveTimerRef = useRef(null);

		if (!eventRefs.current) {
			eventRefs.current = {
				onMouseOver: e => {
					if (leaveTimerRef.current) {
						clearTimeout(leaveTimerRef.current);
						leaveTimerRef.current = null;
						return;
					}

					if (
						showRef.current &&
						containerRef.current !== e.currentTarget &&
						!e.target.toolTipElement
					) {
						setShow(false);
					}
					if (!showRef.current && !hoverTimerRef.current) {
						hoverTimerRef.current = setTimeout(() => {
							setMessage(e.target.toolTipMsg);
							setShow(true);
							hoverTimerRef.current = null;
						}, 200);
						containerRef.current = e.currentTarget;
					}
				},
				onMouseLeave: () => {
					if (hoverTimerRef.current) {
						clearTimeout(hoverTimerRef.current);
						hoverTimerRef.current = null;
						return;
					}
					if (showRef.current) {
						leaveTimerRef.current = setTimeout(() => {
							setShow(false);
							leaveTimerRef.current = null;
							containerRef.current = null;
						}, 200);
					}
				},
				contextEvents: (element, msg) => {
					if (element && msg) {
						element.addEventListener('mouseover', eventRefs.current.onMouseOver);
						element.toolTipMsg = msg;
						element.addEventListener('mouseout', eventRefs.current.onMouseLeave);
					} else if (element && !msg) {
						if (showRef.current) {
							setShow(false);
						}
						setMessage('');
						element.removeEventListener('mouseover', eventRefs.current.onMouseOver);
						delete element.toolTipMsg;
						element.removeEventListener('mouseout', eventRefs.current.onMouseLeave);
					}
				},
			};
		}

		useEffect(
			() => () => {
				if (containerRef.current) {
					containerRef.current.removeEventListener(
						'mouseover',
						eventRefs.current.onMouseOver
					);
					containerRef.current.removeEventListener(
						'mouseout',
						eventRefs.current.onMouseLeave
					);
				}
			},
			[]
		);

		return (
			<SetTooltipContext.Provider value={eventRefs.current.contextEvents}>
				<Component {...props} />
				<Tooltip
					onMouseOver={eventRefs.current.onMouseOver}
					onMouseLeave={eventRefs.current.onMouseLeave}
					message={message}
					containerRef={containerRef}
					state={show}
					scrollElementId='root'
				/>
			</SetTooltipContext.Provider>
		);
	};

export default withTooltip;
