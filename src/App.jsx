import './App.css';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';
import MainHeader from './Shared/MainHeader/MainHeader';
import ScrollBar from './Shared/ScrollBar/ScrollBar';
import withAppsHOCs from './Utils/HOC/withAppsHOCs';

function AppMain() {
	return (
		<>
			<MainHeader />
			<Dashboard />
			<ScrollBar />
		</>
	);
}

const App = withAppsHOCs(AppMain);

export default App;
