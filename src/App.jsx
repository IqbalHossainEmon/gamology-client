import './App.css';
import MainContent from './Pages/MainContent/MainContent/MainContent';
import MainHeader from './Shared/MainHeader/MainHeader';
import withAppsHOCs from './Utils/HOC/withAppsHOCs';

function AppMain() {
	return (
		<>
			<MainHeader />
			<MainContent />
		</>
	);
}

const App = withAppsHOCs(AppMain);

export default App;
