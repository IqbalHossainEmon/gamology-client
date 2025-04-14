import { useCallback } from 'react';

const useCalculateTextSize = () =>
	useCallback((val, font = '1rem Inter') => {
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');
		context.font = font;
		const { width } = context.measureText(val);
		return width;
	}, []);

export default useCalculateTextSize;
