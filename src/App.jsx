import './App.css';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';
import MainHeader from './Shared/MainHeader/MainHeader';
import withAppsHOCs from './Utils/HOC/withAppsHOCs';

function App({ children }) {
	return (
		<>
			<MainHeader />
			<Dashboard />
			{children}
		</>
	);
}

const EnhancedApp = withAppsHOCs(App);

export default EnhancedApp;
