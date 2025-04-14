import { useCallback, useEffect, useRef } from 'react';

const useDropDownHide = setState => {
	const element = useRef(null);
	const stopMenuRef = useRef(null);
	const closeMenuRef = useRef(null);

	const removeEvents = useCallback((stopMenu, closeMenu) => {
		document.removeEventListener('click', closeMenu);
		window.removeEventListener('blur', stopMenu);
	}, []);

	const closeMenu = useCallback(e => {
		const isMultiple = Array.isArray(element.current);
		const clickedOutside = isMultiple
			? !element.current.some(ele => ele?.contains(e.target))
			: element.current && !element.current.contains(e.target);

		if (clickedOutside) {
			stopMenuRef.current?.(e);
		}
	}, []);

	const stopMenu = useCallback(
		e => {
			setState(false, e);
			removeEvents(stopMenuRef.current, closeMenuRef.current);
		},
		[removeEvents, setState]
	);

	useEffect(() => {
		stopMenuRef.current = stopMenu;
		closeMenuRef.current = closeMenu;
	}, [stopMenu, closeMenu]);

	const showMenu = useCallback(() => {
		document.addEventListener('click', closeMenuRef.current);
		window.addEventListener('blur', stopMenuRef.current);
	}, []);

	return {
		showMenu,
		setElement: useCallback(ele => {
			element.current = ele;
		}, []),
		removeEvents,
	};
};

export default useDropDownHide;
