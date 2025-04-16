import { useCallback, useEffect, useRef } from 'react';

const useDropDownHide = setState => {
	const element = useRef(null);
	const stateRef = useRef(setState);
	const listenersAttachedRef = useRef(false);
	const handlersRef = useRef({});

	// Keep setState reference up to date
	useEffect(() => {
		stateRef.current = setState;
	}, [setState]);

	// Remove event listeners
	const removeEvents = useCallback(() => {
		if (
			listenersAttachedRef.current &&
			handlersRef.current.clickOutside &&
			handlersRef.current.blur
		) {
			document.removeEventListener('click', handlersRef.current.clickOutside);
			window.removeEventListener('blur', handlersRef.current.blur);
			listenersAttachedRef.current = false;
		}
	}, []);

	// Handle click outside
	useEffect(() => {
		handlersRef.current.clickOutside = e => {
			// Check element.current directly to avoid stale closure
			const isMultiple = Array.isArray(element.current);
			const clickedOutside = isMultiple
				? !element.current.some(ele => ele?.contains(e.target))
				: element.current && !element.current.contains(e.target);

			if (clickedOutside && listenersAttachedRef.current) {
				stateRef.current(false, e);
				removeEvents();
			}
		};

		handlersRef.current.blur = e => {
			if (listenersAttachedRef.current) {
				stateRef.current(false, e);
				removeEvents();
			}
		};
	}, [removeEvents]);

	// Cleanup on unmount
	useEffect(() => {
		const handlers = handlersRef.current;
		return () => {
			if (listenersAttachedRef.current && handlers.clickOutside && handlers.blur) {
				document.removeEventListener('click', handlers.clickOutside);
				window.removeEventListener('blur', handlers.blur);
			}
		};
	}, []);

	const showMenu = useCallback(() => {
		if (
			!listenersAttachedRef.current &&
			handlersRef.current.clickOutside &&
			handlersRef.current.blur
		) {
			document.addEventListener('click', handlersRef.current.clickOutside);
			window.addEventListener('blur', handlersRef.current.blur);
			listenersAttachedRef.current = true;
		}
	}, []);

	const setElement = useCallback(ele => {
		element.current = ele;
	}, []);

	return {
		showMenu,
		setElement,
		removeEvents,
	};
};

export default useDropDownHide;
