import { useContext } from 'react';
import {
	SetContentDashboardModalContext,
	SetDashboardModalContext,
} from '../Contexts/DashboardModalContext';

export default () => ({
	setDashboardContent: useContext(SetContentDashboardModalContext),
	setDashboardModal: useContext(SetDashboardModalContext),
});
