import { memo } from 'react';
import './App.css';
import withScreenWidthProvider from './HOC/withScreenWidthProvider';
import MainContent from './Pages/MainContent/MainContent/MainContent';
import MainHeader from './Shared/MainHeader/MainHeader';

function App() {
    return (
        <>
            <MainHeader />
            <MainContent />
        </>
    );
}

export default withScreenWidthProvider(memo(App));
