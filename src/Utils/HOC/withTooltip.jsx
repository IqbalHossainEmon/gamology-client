import { useRef, useState } from 'react';
import Tooltips from '../../Shared/Tooltips/Tooltips/Tooltips';
import SetTooltipContext from '../Contexts/TooltipContext';

const withTooltip = Component =>
	function InnerComponent(props) {
		const [tooltips, setTooltips] = useState([]);

		const eventRefs = useRef(null);

		if (!eventRefs.current) {
			eventRefs.current = {
				hideTooltip: container => {
					setTooltips(prev => {
						const index = prev.findIndex(t => t.container === container);
						if (index > -1) {
							prev[index] = {
								...prev[index],
								show: false,
								timerId: setTimeout(() => {
									setTooltips(innerPrev => {
										innerPrev.splice(index, 1);
										return [...innerPrev];
									});
								}, 300),
							};
						}
						return [...prev];
					});
				},
				tooltipInteractionHandlers: (container, message, preferPosition) => {
					let currentTooltipIndex;
					/* console.log('container', container); */

					setTooltips(prev => {
						const index = prev.findIndex(t => t.container === container);
						if (index > -1) {
							currentTooltipIndex = index;

							if (prev[index].timerId) {
								clearTimeout(prev[index].timerId);
							}

							delete prev[index].timerId;

							prev[index] = {
								...prev[index],
								container,
								message,
								preferPosition,
							};
						} else {
							currentTooltipIndex = prev.length;
							prev.push({
								id: prev.length,
								container,
								show: true,
								message,
								preferPosition,
							});
						}
						return [...prev];
					});

					return currentTooltipIndex;
				},
			};
		}

		return (
			<SetTooltipContext.Provider value={eventRefs.current.tooltipInteractionHandlers}>
				<Component {...props} />
				<Tooltips tooltips={tooltips} scrollElementId='root' />
			</SetTooltipContext.Provider>
		);
	};

export default withTooltip;
