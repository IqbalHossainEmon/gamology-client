import { memo } from 'react';
import './App.css';
import withScreenWidthProvider from './HOC/withScreenWidthProvider';
import AddGame from './Pages/AddGame/AddGame/AddGame';
import Footer from './Shared/Footer/Footer';
import MainHeader from './Shared/MainHeader/MainHeader';

function App() {
  return (
    <>
      <MainHeader />
      <AddGame />
      <Footer />
    </>
  );
}

export default withScreenWidthProvider(memo(App));
