import { useEffect, useState } from 'react';
import ScreenInfoContext from '../Contexts/ScreenInfoContext';
import useCheckScreenInfo from '../Hooks/useCheckScreenInfo';

const withScreenInfoProvider = (Component) =>
  function ScreenInfoProvider() {
    const screenInfo = useCheckScreenInfo();

    const [deviceInfo, setDeviceInfo] = useState(screenInfo);

    useEffect(() => {
      setDeviceInfo(screenInfo);
      console.log('wkwk');
    }, [screenInfo]);

    return (
      <ScreenInfoContext.Provider value={deviceInfo}>
        <Component />
      </ScreenInfoContext.Provider>
    );
  };

export default withScreenInfoProvider;
