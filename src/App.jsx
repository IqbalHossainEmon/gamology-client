import withScreenInfoProvider from './HOC/withScreenInfoProvider';
import Discover from './Pages/Discover/Discover/Discover';
import Footer from './Shared/Footer/Footer';
import Header from './Shared/Header/Header';
import SecondNavbar from './Shared/SecondNavbar/SecondNavBar/SecondNavbar';

function App() {
  return (
    <>
      <Header />
      <main>
        <SecondNavbar />
        <Discover />
      </main>
      <Footer />
    </>
  );
}

export default withScreenInfoProvider(App);
