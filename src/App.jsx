import { memo } from 'react';
import './App.css';
import withScreenWidthProvider from './HOC/withScreenWidthProvider';
import withToast from './HOC/withToast';
import MainContent from './Pages/MainContent/MainContent/MainContent';
import MainHeader from './Shared/MainHeader/MainHeader';

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
