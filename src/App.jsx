import withScreenInfoProvider from './HOC/withScreenInfoProvider';
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

export default withScreenInfoProvider(App);
