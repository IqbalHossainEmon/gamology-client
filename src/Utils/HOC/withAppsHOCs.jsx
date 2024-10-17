import { memo } from 'react';
import SetTooltipContext from '../Contexts/TooltipContext';
import withScreenWidthProvider from './withScreenWidthProvider';
import withToast from './withToast';
import withTooltip from './withTooltip';

const withAppsHOCs = Component =>
	withScreenWidthProvider(withToast(withTooltip(memo(Component), SetTooltipContext)));

export default withAppsHOCs;
