import { useCallback, useRef, useState } from 'react';
import Tooltips from '../../Shared/Tooltips/Tooltips/Tooltips';
import SetTooltipContext from '../Contexts/TooltipContext';

const withTooltip = Component =>
	function InnerComponent(props) {
		const [tooltips, setTooltips] = useState([]);
		const timeIdRef = useRef(null);
		const idRef = useRef(0);
		const elementOnHideListRef = useRef([]);

		const handleCheckAndDelete = useCallback(() => {
			if (timeIdRef.current) clearTimeout(timeIdRef.current);

			timeIdRef.current = setTimeout(() => {
				setTooltips(prev => prev.filter(element => element.show));
				timeIdRef.current = undefined;
			}, 300);
		}, []);

		const hideTooltip = useCallback(
			container => {
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

				handleCheckAndDelete();
			},
			[handleCheckAndDelete]
		);

		const tooltipInteractionHandlers = useCallback(
			({ current }) => {
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
								id: idRef.current++,
								container,
								show: true,
								message,
								preferPosition,
							});
						}
						return [...prev];
					});
					return hideTooltip;
				}
			},
			[hideTooltip]
		);

		return (
			<SetTooltipContext.Provider value={tooltipInteractionHandlers}>
				<Component {...props} />
				<Tooltips tooltips={tooltips} />
			</SetTooltipContext.Provider>
		);
	};

export default withTooltip;
