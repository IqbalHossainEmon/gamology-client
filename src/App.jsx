import './App.css';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';
import FirstNavbar from './Shared/FirstNavbar/FirstNavBar/FirstNavbar';
import withAppsHOCs from './Utils/HOC/withAppsHOCs';
import useReloadScroll from './Utils/Hooks/useReloadScroll';

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
