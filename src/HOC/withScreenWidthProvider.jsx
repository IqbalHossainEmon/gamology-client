import { useEffect, useRef, useState } from 'react';
import ScreenWidthContext from '../Contexts/ScreenWidthContext';

const withScreenWidthProvider = Component =>
	function InnerComponent() {
		const [screenWidth, setScreenWidth] = useState(window.innerWidth),

		 handleChange = useRef(null);

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
        <Component />
    </ScreenWidthContext.Provider>
		);
	};

export default withScreenWidthProvider;
