import ScreenInfoContext from '../Contexts/ScreenInfoContext';
import useCheckScreenInfo from '../Hooks/useCheckScreenInfo';

const withScreenInfoProvider = (Component) =>
  function ScreenInfoProvider() {
    const screenInfo = useCheckScreenInfo();

    return (
      <ScreenInfoContext.Provider value={screenInfo}>
        <Component />
      </ScreenInfoContext.Provider>
    );
  };

export default withScreenInfoProvider;
