import { useContext } from 'react';
import ScreenInfoContext from '../Contexts/ScreenInfoContext';

const useScreenInfo = () => useContext(ScreenInfoContext);

export default useScreenInfo;
