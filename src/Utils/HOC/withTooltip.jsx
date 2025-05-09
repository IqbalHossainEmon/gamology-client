import { useRef, useState } from 'react';
import Tooltips from '../../Shared/Tooltips/Tooltips/Tooltips';
import SetTooltipContext from '../Contexts/TooltipContext';

const withTooltip = Component =>
	function InnerComponent(props) {
		const [tooltips, setTooltips] = useState([]);

		const eventRefs = useRef(null);

		const elementOnHideListRef = useRef([]);

		if (!eventRefs.current) {
			let timerId;
			let id = 0;
			eventRefs.current = {
				handleCheckAndDelete: () => {
					if (timerId) clearTimeout(timerId);

					timerId = setTimeout(() => {
						setTooltips(prev => prev.filter(element => element.show));
						timerId = undefined;
					}, 300);
				},
				hideTooltip: container => {
					const bundle = {
						container,
						timerId: setTimeout(() => {
							elementOnHideListRef.current.filter(t => t.container !== container);

							setTooltips(prev => {
								const index = prev.findIndex(t => t.container === container);
								if (index > -1) {
									prev[index] = {
										...prev[index],
										show: false,
									};
								}
								return [...prev];
							});
						}, 200),
					};
					elementOnHideListRef.current.push(bundle);

					eventRefs.current.handleCheckAndDelete();
				},
				tooltipInteractionHandlers: ({ current }) => {
					const { container, message, position: preferPosition } = current;
					const doesNeedToHide = elementOnHideListRef.current.find(
						t => t.container === container
					);
					if (doesNeedToHide) {
						clearTimeout(doesNeedToHide.timerId);
						elementOnHideListRef.current = elementOnHideListRef.current.filter(
							t => t.container !== container
						);
					}

					if (!!container && !!message) {
						setTooltips(prev => {
							const index = prev.findIndex(t => t.container === container);
							if (index > -1) {
								prev[index] = {
									...prev[index],
									container,
									show: true,
									message,
									preferPosition,
								};
							} else {
								prev.push({
									id: id++,
									container,
									show: true,
									message,
									preferPosition,
								});
							}
							return [...prev];
						});
						return eventRefs.current.hideTooltip;
					}
				},
			};
		}

		return (
			<SetTooltipContext.Provider value={eventRefs.current.tooltipInteractionHandlers}>
				<Component {...props} />
				<Tooltips tooltips={tooltips} />
			</SetTooltipContext.Provider>
		);
	};

export default withTooltip;
