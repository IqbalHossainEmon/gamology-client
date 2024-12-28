import './App.css';
import MainContent from './Pages/MainContent/MainContent/MainContent';
import FirstNavbar from './Shared/FirstNavbar/FirstNavBar/FirstNavbar';
import withAppsHOCs from './Utils/HOC/withAppsHOCs';

function AppMain() {
	return (
		<>
			<FirstNavbar />
			<MainContent />
		</>
	);
}

const App = withAppsHOCs(AppMain);

export default App;
