import { memo } from 'react';
import './App.css';
import withScreenWidthProvider from './HOC/withScreenWidthProvider';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';
import MainHeader from './Shared/MainHeader/MainHeader';

const App = () => {
	return (
		<>
			<MainHeader />
			<Dashboard />
		</>
	);
};

const EnhancedApp = withScreenWidthProvider(memo(App));

export default EnhancedApp;
