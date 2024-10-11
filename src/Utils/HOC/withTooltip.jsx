import { useEffect, useRef, useState } from 'react';
import Tooltip from '../../Shared/Tooltip/Tooltip/Tooltip';
import SetTooltipContext from '../Contexts/TooltipContext';
import useScreenWidth from '../Hooks/useScreenWidth';

const withTooltip = Component =>
	function InnerComponent(props) {
		const [show, setShow] = useState(false);

		const [message, setMessage] = useState('');

		const showRef = useRef(show);
		showRef.current = show;

		const containerRef = useRef(null);

		const eventRefs = useRef(null);

		if (!eventRefs.current) {
			eventRefs.current = {
				onMouseMove: e => {
					if (!showRef.current) {
						setShow(true);
						containerRef.current = e.target;
					}
				},
				onMouseLeave: () => {
					if (showRef.current) {
						setShow(false);
						containerRef.current = null;
					}
				},

				contextEvents: (element, msg) => {
					setMessage(msg);

					element.addEventListener('mousemove', eventRefs.current.onMouseMove);
					element.addEventListener('mouseleave', eventRefs.current.onMouseLeave);
				},
			};
		}

		const screenWidth = useScreenWidth();

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
			[screenWidth]
		);

		useEffect(() => () => {}, [containerRef]);

		return (
			<SetTooltipContext.Provider value={eventRefs.current.contextEvents}>
				<Component {...props}>
					{show && <Tooltip message={message} containerRef={containerRef} />}
				</Component>
			</SetTooltipContext.Provider>
		);
	};

export default withTooltip;
