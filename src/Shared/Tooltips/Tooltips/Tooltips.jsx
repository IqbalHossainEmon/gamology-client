import Tooltip from '../Components/Tooltip/Tooltip/Tooltip';

const Tooltips = ({ tooltips }) =>
	tooltips.length > 0 &&
	tooltips.map(tooltip => <Tooltip key={tooltip.id} data={tooltip} show />);
export default Tooltips;
