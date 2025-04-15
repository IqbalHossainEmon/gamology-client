import { useContext } from 'react';

import SetTooltipContext from '../Contexts/TooltipContext';

export default function useTooltip() {
	return useContext(SetTooltipContext);
}
