import { memo } from 'react';
import withScreenWidthProvider from './withScreenWidthProvider';
import withToast from './withToast';
import withTooltip from './withTooltip';

const withAppsHOCs = Component => withScreenWidthProvider(withToast(withTooltip(memo(Component))));

export default withAppsHOCs;
