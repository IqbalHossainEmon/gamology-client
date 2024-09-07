import { useContext } from 'react';
import { ScreenWidthContext, ScreenWidthRefContext } from '../Contexts/ScreenWidthContext';

function useScreenWidth() {
	const screenWidth = useContext(ScreenWidthContext);
	const screenWidthRef = useContext(ScreenWidthRefContext);

	return { screenWidth, screenWidthRef };
}

export default useScreenWidth;
