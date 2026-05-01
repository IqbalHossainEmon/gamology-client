import './App.css';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';
import FirstNavbar from './Shared/FirstNavbar/FirstNavbar/FirstNavbar';
import useReloadScroll from './Utils/Hooks/useReloadScroll';
import withAppsHOCs from './Utils/HOC/withAppsHOCs';

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
