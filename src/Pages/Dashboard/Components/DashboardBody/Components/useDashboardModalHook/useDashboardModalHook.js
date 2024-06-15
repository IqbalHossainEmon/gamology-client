import { useContext } from 'react';
import {
	DashboardModalContextSetContent,
	DashboardModalContextSetShow,
} from '../../../../../../Contexts/DashboardModalContext';

export default () => ({
	setDashboardContent: useContext(DashboardModalContextSetContent),
	setDashboardModal: useContext(DashboardModalContextSetShow),
});
