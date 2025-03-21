import { forwardRef, useCallback, useEffect, useRef } from 'react';
import useScreenWidth from '../../../Utils/Hooks/useScreenWidth';

function TextArea({ onChange, ...rest }, ref) {
	const textFieldRef = useRef(null);

	const debounce = (func, wait) => {
		let timeout;
		return (...args) => {
			clearTimeout(timeout);
			timeout = setTimeout(() => func(...args), wait);
		};
	};

	const { remHeightInPixels } = useScreenWidth();

	const adjustHeight = useCallback(() => {
		if (textFieldRef.current) {
			textFieldRef.current.style.height = 'auto';
			textFieldRef.current.style.height = `${textFieldRef.current.scrollHeight / remHeightInPixels}rem`;
		}
	}, [remHeightInPixels]);

	const debouncedAdjustHeight = useCallback(() => debounce(adjustHeight, 100)(), [adjustHeight]);

	useEffect(() => {
		window.addEventListener('resize', debouncedAdjustHeight);
	}, [debouncedAdjustHeight]);

	const checkHeight = e => {
		onChange(e);
		debouncedAdjustHeight();
	};

	return (
		<textarea
			onChange={checkHeight}
			style={{ height: 'auto' }}
			ref={e => {
				textFieldRef.current = e;
				if (ref) {
					ref.current = e;
				}
			}}
			{...rest}
		/>
	);
}

export default forwardRef(TextArea);
