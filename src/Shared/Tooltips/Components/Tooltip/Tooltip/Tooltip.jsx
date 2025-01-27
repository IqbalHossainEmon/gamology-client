import useAppearDisappear from '../../../../../Utils/Hooks/useAppearDisappear';
import TooltipBody from '../TooltipBody/TooltipBody';

function Tooltip({ state, ...props }) {
	const [show, fadeIn] = useAppearDisappear(state);

	return show && <TooltipBody fadeIn={fadeIn} state={state} {...props} />;
}
export default Tooltip;
