import { memo } from 'react';
import './App.css';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';
import MainHeader from './Shared/MainHeader/MainHeader';
import withScreenWidthProvider from './Utils/HOC/withScreenWidthProvider';
import withToast from './Utils/HOC/withToast';

function App({ children }) {
	return (
		<>
			<MainHeader />
			<Dashboard />
			{children}
		</>
	);
}

const EnhancedApp = withScreenWidthProvider(withToast(memo(App)));

export default EnhancedApp;
