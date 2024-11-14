import './App.css';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';
import FirstNavbar from './Shared/FirstNavbar/FirstNavBar/FirstNavbar';
import withAppsHOCs from './Utils/HOC/withAppsHOCs';

function AppMain() {
	return (
		<>
			<FirstNavbar />
			<Dashboard />
		</>
	);
}

const App = withAppsHOCs(AppMain);

export default App;
