import { useRef, useState } from 'react';
import { HideToastContext, SetToastContext } from '../Contexts/ToastContext';
import Toasts from '../Shared/Toasts/Toasts/Toasts';

const withToast = Component =>
	function InnerComponent(props) {
		const [toasts, setToasts] = useState([]);

		const toastsRef = useRef(toasts);
		toastsRef.current = toasts;

		const toastIdRef = useRef(7);

		const eventRefs = useRef(null);

		if (!eventRefs.current) {
			eventRefs.current = {
				hideToastAnimation: id => {
					setToasts(prevState => {
						const newState = [...prevState];

						newState[newState.findIndex(toast => toast.id === id)].fadeOut = true;
						setTimeout(() => {
							setToasts(prev => prev.filter(toast => toast.id !== id));
						}, 500);
						return newState;
					});
				},
				handleHideToast: id => {
					if (id) {
						eventRefs.current.hideToastAnimation(id);
					} else {
						eventRefs.current.hideToastAnimation(toastsRef.current[0].id);
					}
				},
				handleSetToast: toast => {
					if (typeof toast === 'object') {
						if (!toast.toastTitle || !toast.toastMessage || !toast.type) {
							return;
						}
					} else {
						return;
					}

					setToasts(prevState => {
						toastIdRef.current++;

						if (toastsRef.current.length > 3) {
							for (let i = 0; i < toastsRef.current.length - 3; i++) {
								eventRefs.current.hideToastAnimation(toastsRef.current[i].id);
							}
						}
						return [...prevState, { ...toast, id: toastIdRef.current }];
					});
					return toastIdRef.current;
				},
			};
		}
		return (
			<SetToastContext.Provider value={eventRefs.current.handleSetToast}>
				<HideToastContext.Provider value={eventRefs.current.handleHideToast}>
					<Component {...props}>
						<Toasts toasts={toasts} />
					</Component>
				</HideToastContext.Provider>
			</SetToastContext.Provider>
		);
	};

export default withToast;
