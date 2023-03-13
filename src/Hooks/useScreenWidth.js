import { useContext } from 'react';
import ScreenWidthContext from '../Contexts/ScreenWidthContext';

const useScreenWidth = () => useContext(ScreenWidthContext);

export default useScreenWidth;
