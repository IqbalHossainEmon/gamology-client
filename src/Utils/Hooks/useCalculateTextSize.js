import { useRef } from 'react';

const useCalculateTextSize = () => {
	const eventRef = useRef(null);

	if (!eventRef.current) {
		eventRef.current = (val, font = '1rem Inter') => {
			const canvas = document.createElement('canvas');
			const context = canvas.getContext('2d');
			context.font = font;
			const { width } = context.measureText(val);
			return width;
		};
	}
	return eventRef.current;
};

export default useCalculateTextSize;
