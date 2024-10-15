import Tooltip from '../../../../Shared/Tooltip/Tooltip/Tooltip';
import useToastLogics from '../../../../Utils/Hooks/useToastLogics';
import SetDashboardTooltipContext from '../Contexts/DashboardTooltipContext';

const withDashboardTooltip = Component =>
	function InnerComponent(props) {
		const { show, message, containerRef, eventRefs } = useToastLogics();

		return (
			<SetDashboardTooltipContext.Provider value={eventRefs.current.contextEvents}>
				<Component {...props} />
				<Tooltip
					message={message}
					containerRef={containerRef}
					state={show}
					extra={48}
					scrollElementId='dashboard-innerBody'
				/>
			</SetDashboardTooltipContext.Provider>
		);
	};

export default withDashboardTooltip;
