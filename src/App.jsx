import { memo } from 'react';
import withScreenWidthProvider from './HOC/withScreenWidthProvider';
import IndividualGame from './Pages/IndividualGame/IndividualGame/IndividualGame';
import Footer from './Shared/Footer/Footer';
import Header from './Shared/Header/Header';
import SecondNavbar from './Shared/SecondNavbar/SecondNavBar/SecondNavbar';

function App() {
  return (
    <>
      <Header />
      <SecondNavbar />
      <main>
        <IndividualGame />
      </main>
      <Footer />
    </>
  );
}

export default withScreenWidthProvider(memo(App));
