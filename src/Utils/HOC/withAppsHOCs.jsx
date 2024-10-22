import { memo } from 'react';
import withModal from './withModal';
import withScreenWidthProvider from './withScreenWidthProvider';
import withToast from './withToast';

const withAppsHOCs = Component => withScreenWidthProvider(withModal(withToast(memo(Component))));

export default withAppsHOCs;
