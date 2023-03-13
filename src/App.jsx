import { memo } from 'react';
import withScreenWidthProvider from './HOC/withScreenWidthProvider';
import Browse from './Pages/Browse/Browse/Browse';
import Footer from './Shared/Footer/Footer';
import Header from './Shared/Header/Header';
import SecondNavbar from './Shared/SecondNavbar/SecondNavBar/SecondNavbar';

function App() {
  return (
    <>
      <Header />
      <main>
        <SecondNavbar />
        <Browse />
      </main>
      <Footer />
    </>
  );
}

export default withScreenWidthProvider(memo(App));
