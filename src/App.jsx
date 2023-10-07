import { memo } from 'react';
import './App.css';
import withScreenWidthProvider from './HOC/withScreenWidthProvider';
import AddGame from './Pages/AddGame/AddGame/AddGame';
import Footer from './Shared/Footer/Footer';
import Header from './Shared/Header/Header';

function App() {
  return (
    <>
      <Header />
      <AddGame />
      <Footer />
    </>
  );
}

export default withScreenWidthProvider(memo(App));
