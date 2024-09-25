import { useRef } from 'react';

const useDropDownHide = setState => {
	const element = useRef();
	const eventRefs = useRef(null);

	if (!eventRefs.current) {
		eventRefs.current = {
			closeMenu: e => {
				switch (Array.isArray(element.current)) {
					case true:
						if (!element.current.some(ele => ele?.contains(e.target)) && e) {
							document.removeEventListener('mousedown', eventRefs.current.closeMenu);
							window.removeEventListener('blur', eventRefs.current.closeMenuBlur);
							setState(false);
						}
						break;
					default:
						if (element.current && e && !element.current.contains(e.target)) {
							document.removeEventListener('mousedown', eventRefs.current.closeMenu);
							window.removeEventListener('blur', eventRefs.current.closeMenuBlur);
							setState(false);
						}
						break;
				}
			},

			closeMenuBlur: () => {
				setState(false);
				window.removeEventListener('blur', eventRefs.current.closeMenuBlur);
				document.removeEventListener('mousedown', eventRefs.current.closeMenu);
			},

			stopMenu: () => {
				document.removeEventListener('mousedown', eventRefs.current.closeMenu);
				window.removeEventListener('blur', eventRefs.current.closeMenuBlur);
			},

			setElement: ele => {
				element.current = ele;
			},

			showMenu: () => {
				document.addEventListener('mousedown', eventRefs.current.closeMenu);
				window.addEventListener('blur', eventRefs.current.closeMenuBlur);
			},
		};
	}
	return {
		showMenu: eventRefs.current.showMenu,
		setElement: eventRefs.current.setElement,
		stopMenu: eventRefs.current.stopMenu,
	};
};

export default useDropDownHide;
