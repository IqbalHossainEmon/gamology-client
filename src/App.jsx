import './App.css';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';
import MainHeader from './Shared/MainHeader/MainHeader';
import withAppsHOCs from './Utils/HOC/withAppsHOCs';

function AppMain() {
	return (
		<>
			<MainHeader />
			<Dashboard />
		</>
	);
}

const App = withAppsHOCs(AppMain);

export default App;
