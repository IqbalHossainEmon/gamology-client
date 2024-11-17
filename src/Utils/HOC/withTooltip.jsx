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
				handleShow: shouldAlwaysStart => {
					if (!showRef.current || shouldAlwaysStart) {
						hoverTimerRef.current = setTimeout(
							() => {
								setShow(true);
								hoverTimerRef.current = null;
							},
							shouldAlwaysStart ? 250 : 200
						);
					}
				},
				handleHide: () => {
					if (showRef.current) {
						leaveTimerRef.current = setTimeout(() => {
							setShow(false);
							leaveTimerRef.current = null;
						}, 200);
					}
				},
				removeShowTimer: () => {
					if (hoverTimerRef.current) {
						clearTimeout(hoverTimerRef.current);
						hoverTimerRef.current = null;
					}
				},
				removeHideTimer: () => {
					if (leaveTimerRef.current) {
						clearTimeout(leaveTimerRef.current);
						leaveTimerRef.current = null;
					}
				},

				onMouseOver: (e, isTooltip) => {
					eventRefs.current.removeHideTimer();

					if (
						isTooltip ||
						(containerRef.current === e.currentTarget && showRef.current)
					) {
						return;
					}

					if (!isTooltip && containerRef.current !== e.currentTarget && showRef.current) {
						setShow(false);
						eventRefs.current.handleShow(true);
						containerRef.current = e.currentTarget;
						setMessage(e.currentTarget.toolTipMsg);
						return;
					}

					containerRef.current = e.currentTarget;
					setMessage(e.currentTarget.toolTipMsg);
					eventRefs.current.handleShow();
				},
				onMouseLeave: () => {
					eventRefs.current.removeShowTimer();
					eventRefs.current.handleHide();
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
