import withScreenInfoProvider from './HOC/withScreenInfoProvider';
import Discover from './Pages/Discover/Discover/Discover';

function App() {
  return <Discover />;
}

export default withScreenInfoProvider(App);
