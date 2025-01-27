import { useEffect, useRef, useState } from 'react';
import Tooltips from '../../Shared/Tooltips/Tooltips/Tooltips';
import SetTooltipContext from '../Contexts/TooltipContext';

const withTooltip = Component =>
	function InnerComponent(props) {
		const [show, setShow] = useState(false);
		const [tooltips, setTooltips] = useState([]);

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
						setMessage(e.currentTarget.tooltipMsg);
						return;
					}

					containerRef.current = e.currentTarget;
					setMessage(e.currentTarget.tooltipMsg);
					eventRefs.current.handleShow();
				},
				onMouseLeave: () => {
					eventRefs.current.removeShowTimer();
					eventRefs.current.handleHide();
				},
				contextEvents: (element, msg, position) => {
					if (element && msg) {
						element.addEventListener('mouseover', eventRefs.current.onMouseOver);
						element.tooltipMsg = msg;
						element.tooltipPreferPosition = position;
						element.addEventListener('mouseout', eventRefs.current.onMouseLeave);
					} else if (element && !msg) {
						if (showRef.current) {
							setShow(false);
						}
						setMessage('');
						element.removeEventListener('mouseover', eventRefs.current.onMouseOver);
						delete element.tooltipMsg;
						delete element.tooltipPreferPosition;
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
				<Tooltips
					onMouseOver={eventRefs.current.onMouseOver}
					onMouseLeave={eventRefs.current.onMouseLeave}
					tooltips={tooltips}
					containerRef={containerRef}
					state={show}
					scrollElementId='root'
					preferPosition={
						containerRef.current ? containerRef.current.tooltipPreferPosition : ''
					}
				/>
			</SetTooltipContext.Provider>
		);
	};

export default withTooltip;
