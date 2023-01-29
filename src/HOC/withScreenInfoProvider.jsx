import { useEffect, useState } from 'react';
import ScreenInfoContext from '../Contexts/ScreenInfoContext';
import useCheckDeviceType from '../Hooks/useCheckDeviceType';
import useCheckScreenWidth from '../Hooks/useCheckScreenWidth';

const withScreenInfoProvider = (Component) =>
  function ScreenInfoProvider() {
    const screenWidth = useCheckScreenWidth();
    const touchAble = useCheckDeviceType(screenWidth);

    const [deviceInfo, setDeviceInfo] = useState({ screenWidth, touchAble });

    useEffect(() => {
      setDeviceInfo({ screenWidth, touchAble });
    }, [screenWidth, touchAble]);

    return (
      <ScreenInfoContext.Provider value={deviceInfo}>
        <Component />
      </ScreenInfoContext.Provider>
    );
  };

export default withScreenInfoProvider;
