import { createContext } from 'react';

const ScreenInfoContext = createContext({
  screenWidth: window.innerWidth,
  touchAble: window.matchMedia('(pointer: coarse)').matches,
});

export default ScreenInfoContext;
