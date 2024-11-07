import { useRef } from 'react';
import './App.css';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';
import MainHeader from './Shared/MainHeader/MainHeader';
import ScrollBar from './Shared/ScrollBar/ScrollBar/ScrollBar';
import withAppsHOCs from './Utils/HOC/withAppsHOCs';

function AppMain() {
	const scrollContainer = useRef(null);
	return (
		<ScrollBar scrollContainer={scrollContainer}>
			<MainHeader scrollContainer={scrollContainer} />
			<Dashboard />
		</ScrollBar>
	);
}

const App = withAppsHOCs(AppMain);

export default App;
