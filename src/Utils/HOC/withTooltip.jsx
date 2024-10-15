import Tooltip from '../../Shared/Tooltip/Tooltip/Tooltip';
import SetTooltipContext from '../Contexts/TooltipContext';
import useToastLogics from '../Hooks/useToastLogics';

const withTooltip = Component =>
	function InnerComponent(props) {
		const { show, message, containerRef, eventRefs } = useToastLogics();

		return (
			<SetTooltipContext.Provider value={eventRefs.current.contextEvents}>
				<Component {...props} />
				<Tooltip message={message} containerRef={containerRef} state={show} />
			</SetTooltipContext.Provider>
		);
	};

export default withTooltip;
