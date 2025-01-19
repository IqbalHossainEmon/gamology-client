import { useContext } from 'react';
import ScreenWidthContext from '../Contexts/ScreenWidthContext';

function useScreenWidth() {
	const { remsInPixel, widthInRem, widthInPixels } = useContext(ScreenWidthContext);

	return { remsInPixel, widthInRem, widthInPixels };
}

export default useScreenWidth;
