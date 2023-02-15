import { createContext } from 'react';

const ScreenInfoContext = createContext({
  screenWidth: window.innerWidth,
  touchAble:
    'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0,
});

export default ScreenInfoContext;
