import { useEffect, useRef, useState } from 'react';
import ScreenWidthContext from '../Contexts/ScreenWidthContext';

const withScreenWidthProvider = Component =>
	function InnerComponent({ ...props }) {
		const [screenWidth, setScreenWidth] = useState(window.innerWidth);

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
				<Component {...props} />
			</ScreenWidthContext.Provider>
		);
	};

export default withScreenWidthProvider;
