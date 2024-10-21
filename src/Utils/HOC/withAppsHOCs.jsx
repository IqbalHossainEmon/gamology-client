import { memo } from 'react';
import SetTooltipContext from '../Contexts/TooltipContext';
import withModal from './withModal';
import withScreenWidthProvider from './withScreenWidthProvider';
import withToast from './withToast';
import withTooltip from './withTooltip';

const withAppsHOCs = Component =>
	withScreenWidthProvider(withToast(withModal(withTooltip(memo(Component), SetTooltipContext))));

export default withAppsHOCs;
