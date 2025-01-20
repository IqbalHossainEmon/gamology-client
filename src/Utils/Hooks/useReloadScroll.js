import { useEffect } from 'react';

const useReloadScroll = () => {
	useEffect(() => {
		const root = document.getElementById('root');

		const handleLoad = () => {
			setTimeout(() => {
				const scrollPos = localStorage.getItem('scrollPos');
				if (scrollPos) {
					root.scrollTo(0, parseInt(scrollPos, 10));
					localStorage.removeItem('scrollPos');
				}
			}, 500);
		};

		const handleBeforeUnload = () => {
			localStorage.setItem('scrollPos', root.scrollTop);
		};

		window.addEventListener('load', handleLoad);
		window.addEventListener('beforeunload', handleBeforeUnload);

		return () => {
			window.removeEventListener('load', handleLoad);
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, []);
};

export default useReloadScroll;
