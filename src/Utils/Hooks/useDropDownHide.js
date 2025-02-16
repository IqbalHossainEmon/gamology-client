import { useRef } from 'react';

const useDropDownHide = setState => {
	const element = useRef(null);
	const eventRefs = useRef(null);

	if (!eventRefs.current) {
		eventRefs.current = {
			setElement: ele => {
				element.current = ele;
			},
			closeMenu: e => {
				switch (Array.isArray(element.current)) {
					case true:
						if (!element.current.some(ele => ele?.contains(e.target)) && e) {
							eventRefs.current.stopMenu();
						}
						break;
					default:
						if (element.current && e && !element.current.contains(e.target)) {
							eventRefs.current.stopMenu();
						}
						break;
				}
			},
			showMenu: () => {
				document.addEventListener('click', eventRefs.current.closeMenu);
				window.addEventListener('blur', eventRefs.current.stopMenu);
			},
			removeEvents: () => {
				document.removeEventListener('click', eventRefs.current.closeMenu);
				window.removeEventListener('blur', eventRefs.current.stopMenu);
			},
			stopMenu: e => {
				setState(false, e);
				eventRefs.current.removeEvents();
			},
		};
	}
	return {
		showMenu: eventRefs.current.showMenu,
		setElement: eventRefs.current.setElement,
		onHide: eventRefs.current.removeEvents,
	};
};

export default useDropDownHide;
