import { useEffect, useRef, useState } from 'react';
import { ScreenWidthContext, ScreenWidthRefContext } from '../Contexts/ScreenWidthContext';

const withScreenWidthProvider = Component =>
	function InnerComponent({ ...props }) {
		const [screenWidth, setScreenWidth] = useState(window.innerWidth);

		const screenWidthRef = useRef(screenWidth);
		screenWidthRef.current = screenWidth;

		const handleChange = useRef(null);

		if (!handleChange.current) {
			handleChange.current = () => {
				setScreenWidth(window.innerWidth);
			};
		}

		useEffect(() => {
			window.addEventListener('resize', handleChange.current);
			return () => window.removeEventListener('resize', handleChange.current);
		}, []);

		return (
			<ScreenWidthContext.Provider value={screenWidth}>
				<ScreenWidthRefContext.Provider value={screenWidthRef}>
					<Component {...props} />
				</ScreenWidthRefContext.Provider>
			</ScreenWidthContext.Provider>
		);
	};

export default withScreenWidthProvider;
