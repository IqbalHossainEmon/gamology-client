import useAppearDisappear from '../../../Utils/Hooks/useAppearDisappear';
import TooltipBody from '../TooltipBody/TooltipBody';

function Tooltip({ state, ...props }) {
	const [show, fadeIn] = useAppearDisappear(state, undefined, true, 5000);

	console.log(fadeIn);

	return show && <TooltipBody fadeIn={fadeIn} state={state} {...props} />;
}
export default Tooltip;
