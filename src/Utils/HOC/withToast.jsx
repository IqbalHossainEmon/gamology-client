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
			setToasts(prevState => {
				const newState = [...prevState];

				newState[newState.findIndex(toast => toast.id === id)].fadeOut = true;
				setTimeout(() => {
					setToasts(prev => prev.filter(toast => toast.id !== id));
				}, 500);
				return newState;
			});
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

					if (toastsRef.current.length > 3) {
						for (let i = 0; i < toastsRef.current.length - 3; i++) {
							hideToastAnimation(toastsRef.current[i].id);
						}
					}
					return [...prevState, { ...toast, id: toastIdRef.current }];
				});
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
