import { useContext } from 'react';

import ScreenWidthContext from '../Contexts/ScreenWidthContext';

function useScreenWidth() {
	const { remHeightInPixels, widthInRem, widthInPixels, heightInPixels, heightInRem } =
		useContext(ScreenWidthContext);

	return { remHeightInPixels, widthInRem, widthInPixels, heightInPixels, heightInRem };
}

export default useScreenWidth;
