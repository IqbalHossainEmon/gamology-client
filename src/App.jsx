import { memo } from 'react';
import './App.css';
import withScreenWidthProvider from './HOC/withScreenWidthProvider';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';
import MainHeader from './Shared/MainHeader/MainHeader';

function App() {
  return (
    <>
      <MainHeader />
      <Dashboard />
    </>
  );
}

export default withScreenWidthProvider(memo(App));
