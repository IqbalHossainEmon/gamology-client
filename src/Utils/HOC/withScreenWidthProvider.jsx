import { useCallback, useEffect, useState } from 'react';
import ScreenWidthContext from '../Contexts/ScreenWidthContext';

const withScreenWidthProvider = Component =>
	function InnerComponent({ ...props }) {
		const [screenWidth, setScreenWidth] = useState({
			widthInPixels: window.innerWidth,
			widthInRem:
				window.innerWidth / parseFloat(getComputedStyle(document.documentElement).fontSize),
			remHeightInPixels: parseFloat(getComputedStyle(document.documentElement).fontSize),
		});

		const handleChange = useCallback(() => {
			setScreenWidth({
				widthInPixels: window.innerWidth,
				widthInRem:
					window.innerWidth /
					parseFloat(getComputedStyle(document.documentElement).fontSize),
				remHeightInPixels: parseFloat(getComputedStyle(document.documentElement).fontSize),
				heightInPixels: window.innerHeight,
				heightInRem:
					window.innerHeight /
					parseFloat(getComputedStyle(document.documentElement).fontSize),
			});
		}, []);

		useEffect(() => {
			window.addEventListener('resize', handleChange);
			const observer = new ResizeObserver(handleChange);
			observer.observe(document.documentElement);

			return () => {
				window.removeEventListener('resize', handleChange);
				observer.disconnect();
			};
		}, [handleChange]);

		return (
			<ScreenWidthContext.Provider value={screenWidth}>
				<Component {...props} />
			</ScreenWidthContext.Provider>
		);
	};

export default withScreenWidthProvider;
