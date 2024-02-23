import { memo } from 'react';
import './App.css';
import withScreenWidthProvider from './HOC/withScreenWidthProvider';
import MainContent from './Pages/MainContent/MainContent/MainContent';
import Footer from './Shared/Footer/Footer';
import MainHeader from './Shared/MainHeader/MainHeader';

function App() {
  return (
    <>
      <MainHeader />
      <MainContent />
      <Footer />
    </>
  );
}

export default withScreenWidthProvider(memo(App));
