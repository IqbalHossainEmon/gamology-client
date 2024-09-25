import { useContext } from 'react';
import {
	SetContentDashboardModalContext,
	SetDashboardModalContext,
} from '../Contexts/DashboardModalContext';

export default () => ({
	setDashboardModalContent: useContext(SetContentDashboardModalContext),
	setDashboardModal: useContext(SetDashboardModalContext),
});
