import { memo } from 'react';
import withModal from './withModal';
import withScreenWidthProvider from './withScreenWidthProvider';
import withToast from './withToast';
import withTooltip from './withTooltip';

const withAppsHOCs = Component =>
	withScreenWidthProvider(withTooltip(withModal(withToast(memo(Component)))));

export default withAppsHOCs;
