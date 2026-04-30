import './App.css';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard.jsx';
import FirstNavbar from './Shared/FirstNavbar/FirstNavBar/FirstNavbar';
import useReloadScroll from './Utils/Hooks/useReloadScroll';
import withAppsHOCs from './Utils/HOC/withAppsHOCs.jsx';

function AppMain() {
	useReloadScroll();

	return (
		<>
			<FirstNavbar />
			<Dashboard />
		</>
	);
}

const App = withAppsHOCs(AppMain);

export default App;
