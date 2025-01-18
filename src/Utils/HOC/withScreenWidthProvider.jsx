import { useEffect, useRef, useState } from 'react';
import ScreenWidthContext from '../Contexts/ScreenWidthContext';

const withScreenWidthProvider = Component =>
	function InnerComponent({ ...props }) {
		const [screenWidth, setScreenWidth] = useState({
			widthInPixels: window.innerWidth,
			widthInRem:
				window.innerWidth / parseFloat(getComputedStyle(document.documentElement).fontSize),
			remsInPixel: parseFloat(getComputedStyle(document.documentElement).fontSize),
		});

		const handleChange = useRef(null);

		if (!handleChange.current) {
			handleChange.current = () => {
				setScreenWidth({
					widthInPixels: window.innerWidth,
					widthInRem:
						window.innerWidth /
						parseFloat(getComputedStyle(document.documentElement).fontSize),
					remsInPixel: parseFloat(getComputedStyle(document.documentElement).fontSize),
				});
			};
		}

		useEffect(() => {
			window.addEventListener('resize', handleChange.current);
			const observer = new ResizeObserver(handleChange.current);
			observer.observe(document.documentElement);

			return () => {
				window.removeEventListener('resize', handleChange.current);
				observer.disconnect();
			};
		}, []);

		return (
			<ScreenWidthContext.Provider value={screenWidth}>
				<Component {...props} />
			</ScreenWidthContext.Provider>
		);
	};

export default withScreenWidthProvider;
