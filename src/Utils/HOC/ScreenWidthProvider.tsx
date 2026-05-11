import { useCallback, useEffect, useState } from "react";

import ScreenWidthContext from "../Contexts/ScreenWidthContext";

const getScreenWidth = () => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return {
      widthInPixels: 0,
      widthInRem: 0,
      remHeightInPixels: 0,
      heightInPixels: 0,
      heightInRem: 0,
    };
  }

  const remSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize,
  );

  return {
    widthInPixels: window.innerWidth,
    widthInRem: window.innerWidth / remSize,
    remHeightInPixels: remSize,
    heightInPixels: window.innerHeight,
    heightInRem: window.innerHeight / remSize,
  };
};

const ScreenWidthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [screenWidth, setScreenWidth] = useState(getScreenWidth);

  const handleChange = useCallback(() => {
    setScreenWidth(getScreenWidth());
  }, []);

  useEffect(() => {
    handleChange();

    const observer =
      "ResizeObserver" in window ? new ResizeObserver(handleChange) : null;
    observer?.observe(document.documentElement);

    return () => {
      observer?.disconnect();
    };
  }, [handleChange]);

  return (
    <ScreenWidthContext.Provider value={screenWidth}>
      {children}
    </ScreenWidthContext.Provider>
  );
};

export default ScreenWidthProvider;