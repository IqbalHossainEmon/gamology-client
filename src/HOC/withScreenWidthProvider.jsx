import { useEffect, useRef, useState } from 'react';
import { ScreenWidthContext, ScreenWidthRefContext } from '../Contexts/ScreenWidthContext';

const withScreenWidthProvider = Component =>
	function InnerComponent() {
		const [screenWidth, setScreenWidth] = useState(window.innerWidth);

		const screenWidthRef = useRef(screenWidth);
		screenWidthRef.current = screenWidthRef;

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
				<ScreenWidthRefContext.Provider value={screenWidthRef.current}>
					<Component />
				</ScreenWidthRefContext.Provider>
			</ScreenWidthContext.Provider>
		);
	};

export default withScreenWidthProvider;
