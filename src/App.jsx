import { memo } from 'react';
import './App.css';
import withScreenWidthProvider from './HOC/withScreenWidthProvider';
import withToast from './HOC/withToast';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';
import MainHeader from './Shared/MainHeader/MainHeader';

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
