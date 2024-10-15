import { useContext } from 'react';
import SetDashboardTooltipContext from '../Contexts/DashboardTooltipContext';

export default function useDashboardTooltip() {
	return useContext(SetDashboardTooltipContext);
}
