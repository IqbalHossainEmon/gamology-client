import './App.css';
import MainContent from './Pages/MainContent/MainContent/MainContent';
import MainHeader from './Shared/MainHeader/MainHeader';
import withAppsHOCs from './Utils/HOC/withAppsHOCs';

function App() {
	return (
		<>
			<MainHeader />
			<MainContent />
		</>
	);
}

const EnhancedApp = withAppsHOCs(App);

export default EnhancedApp;
