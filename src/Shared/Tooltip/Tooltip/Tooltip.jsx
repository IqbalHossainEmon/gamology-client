import { useEffect, useState } from 'react';
import TooltipBody from '../TooltipBody/TooltipBody';

function Tooltip({ state, ...props }) {
	const [show, setShow] = useState(false);

	useEffect(() => {
		if (state) {
			setShow(true);
		}
	}, [state]);

	return show && <TooltipBody setShow={setShow} state={state} {...props} />;
}
export default Tooltip;
