import { useContext } from 'react';
import {
	DashboardBodyModalContextSetContent,
	DashboardBodyModalContextSetShow,
} from '../../../../../../Contexts/DashboardBodyModalContext';

export default () => ({
	setDashboardContent: useContext(DashboardBodyModalContextSetContent),
	setDashboardModal: useContext(DashboardBodyModalContextSetShow),
});
