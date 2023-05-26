import { memo } from 'react';
import withScreenWidthProvider from './HOC/withScreenWidthProvider';
import Discover from './Pages/Discover/Discover/Discover';
import Footer from './Shared/Footer/Footer';
import Header from './Shared/Header/Header';
import SecondNavbar from './Shared/SecondNavbar/SecondNavBar/SecondNavbar';

function App() {
  return (
    <>
      <Header />
      <SecondNavbar />
      <main>
        <Discover />
      </main>
      <Footer />
    </>
  );
}

export default withScreenWidthProvider(memo(App));
