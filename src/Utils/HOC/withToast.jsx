import { useCallback, useRef, useState } from 'react';

import Toasts from '../../Shared/Toasts/Toasts/Toasts';
import { HideToastContext, SetToastContext } from '../Contexts/ToastContext';

const withToast = Component =>
	function InnerComponent(props) {
		const [toasts, setToasts] = useState([]);

		const toastsRef = useRef(toasts);
		toastsRef.current = toasts;

		const toastIdRef = useRef(0);

		const hideToastAnimation = useCallback(id => {
			const transitionTime = 500; // ms
			setToasts(prevState => {
				const newState = [...prevState];

				newState[newState.findIndex(toast => toast.id === id)].fadeOut = true;
				return newState;
			});
			setTimeout(() => {
				setToasts(prev => prev.filter(toast => toast.id !== id));
			}, transitionTime);
		}, []);

		const handleHideToast = useCallback(
			id => {
				if (id) {
					hideToastAnimation(id);
				} else {
					hideToastAnimation(toastsRef.current[0].id);
				}
			},
			[hideToastAnimation]
		);
		const handleSetToast = useCallback(
			toast => {
				if (typeof toast === 'object') {
					if (!toast.title || !toast.message || !toast.type) {
						return;
					}
				} else {
					return;
				}

				setToasts(prevState => {
					toastIdRef.current++;

					return [...prevState, { ...toast, id: toastIdRef.current }];
				});

				const toastThreshold = 3; // Maximum number of toasts to show at once

				if (toastsRef.current.length > toastThreshold) {
					for (let i = 0; i < toastsRef.current.length - toastThreshold; i++) {
						hideToastAnimation(toastsRef.current[i].id);
					}
				}
				return toastIdRef.current;
			},
			[hideToastAnimation]
		);

		return (
			<SetToastContext.Provider value={handleSetToast}>
				<HideToastContext.Provider value={handleHideToast}>
					<Component {...props} />
					<Toasts toasts={toasts} />
				</HideToastContext.Provider>
			</SetToastContext.Provider>
		);
	};

export default withToast;
