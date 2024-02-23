import { memo } from 'react';
import './App.css';
import withScreenWidthProvider from './HOC/withScreenWidthProvider';
import Dashboard from './Pages/Dashboard/Components/AddGame/AddGame/AddGame';
import Footer from './Shared/Footer/Footer';
import MainHeader from './Shared/MainHeader/MainHeader';

function App() {
  return (
    <>
      <MainHeader />
      <Dashboard />
      <Footer />
    </>
  );
}

export default withScreenWidthProvider(memo(App));
