import { useEffect } from 'react';
import './App.css';
import MainContent from './Pages/MainContent/MainContent/MainContent';
import FirstNavbar from './Shared/FirstNavbar/FirstNavBar/FirstNavbar';
import withAppsHOCs from './Utils/HOC/withAppsHOCs';

function AppMain() {
	useEffect(() => {
		const root = document.getElementById('root');

		const handleLoad = () => {
			setTimeout(() => {
				const scrollPos = sessionStorage.getItem('scrollPos');
				if (scrollPos) {
					root.scrollTo(0, parseInt(scrollPos, 10));
				}
			}, 500);
		};

		const handleBeforeUnload = () => {
			sessionStorage.setItem('scrollPos', root.scrollTop);
		};

		window.addEventListener('load', handleLoad);
		window.addEventListener('beforeunload', handleBeforeUnload);

		return () => {
			window.removeEventListener('load', handleLoad);
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, []);
	return (
		<>
			<FirstNavbar />
			<MainContent />
		</>
	);
}

const App = withAppsHOCs(AppMain);

export default App;
