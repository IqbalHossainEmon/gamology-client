import { useCallback, useEffect, useState } from 'react';
import ScreenWidthContext from '../Contexts/ScreenWidthContext';

const withScreenWidthProvider = (Component) =>
  function ScreenWidthProvider() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const handleChange = useCallback(() => {
      setScreenWidth(window.innerWidth);
    }, []);

    useEffect(() => {
      window.addEventListener('resize', handleChange);

      return () => window.removeEventListener('resize', handleChange);
    }, [handleChange]);

    return (
      <ScreenWidthContext.Provider value={screenWidth}>
        <Component />
      </ScreenWidthContext.Provider>
    );
  };

export default withScreenWidthProvider;
