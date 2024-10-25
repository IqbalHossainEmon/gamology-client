import { useContext } from 'react';
import ScreenWidthContext from '../Contexts/ScreenWidthContext';

function useScreenWidth() {
	const screenWidth = useContext(ScreenWidthContext);

	return screenWidth;
}

export default useScreenWidth;
