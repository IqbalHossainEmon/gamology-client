import { useRef } from 'react';

const useDropDownHide = setState => {
	const element = useRef();
	const eventRefs = useRef(null);

	if (!eventRefs.current) {
		eventRefs.current = {
			setElement: ele => {
				element.current = ele;
			},
			showMenu: () => {
				document.addEventListener('mousedown', eventRefs.current.closeMenu);
				window.addEventListener('blur', eventRefs.current.stopMenu);
			},
			removeEvents: () => {
				document.removeEventListener('mousedown', eventRefs.current.closeMenu);
				window.removeEventListener('blur', eventRefs.current.stopMenu);
			},
			stopMenu: () => {
				setState(false);
				eventRefs.current.removeEvents();
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
		};
	}
	return {
		showMenu: eventRefs.current.showMenu,
		setElement: eventRefs.current.setElement,
		onHide: eventRefs.current.removeEvents,
	};
};

export default useDropDownHide;
