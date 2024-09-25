import { memo } from 'react';
import './App.css';
import MainContent from './Pages/MainContent/MainContent/MainContent';
import MainHeader from './Shared/MainHeader/MainHeader';
import withScreenWidthProvider from './Utils/HOC/withScreenWidthProvider';
import withToast from './Utils/HOC/withToast';

function App({ children }) {
	return (
		<>
			<MainHeader />
			<MainContent />
			{children}
		</>
	);
}

const EnhancedApp = withScreenWidthProvider(withToast(memo(App)));

export default EnhancedApp;
