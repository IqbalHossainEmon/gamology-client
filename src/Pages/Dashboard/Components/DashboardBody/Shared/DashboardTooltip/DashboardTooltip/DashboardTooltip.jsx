import useAppearDisappear from '../../../../../../../Utils/Hooks/useAppearDisappear';
import DashboardTooltipBody from '../DashboardTooltipBody/DashboardTooltipBody';

function DashboardTooltip({ state, ...props }) {
	const [show, fadeIn] = useAppearDisappear(state);

	return show && <DashboardTooltipBody fadeIn={fadeIn} state={state} {...props} />;
}
export default DashboardTooltip;
