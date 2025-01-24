import { useEffect } from 'react';

const useReloadScroll = () => {
	useEffect(() => {
		const root = document.getElementById('root');

		const handleLoad = () => {
			setTimeout(() => {
				const loadScroll = localStorage.getItem('loadScroll');
				if (loadScroll) {
					if (window.location.pathname === loadScroll.path) {
						root.scrollTo(0, loadScroll.scroll);
					}
					localStorage.removeItem('loadScroll');
				}
			}, 500);
		};

		const handleBeforeUnload = () => {
			localStorage.setItem('loadScroll', {
				scroll: root.scrollY,
				path: window.location.pathname,
			});
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
