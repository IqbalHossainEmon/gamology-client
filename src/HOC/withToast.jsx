import { useRef, useState } from 'react';
import { HideToastContext, SetToastContext } from '../Contexts/ToastContext';
import Toasts from '../Shared/Toasts/Toasts/Toasts';

const withToast = Component =>
	function InnerComponent(props) {
		const [toasts, setToasts] = useState([
			{
				id: 0,
				toastTitle: 'Successful',
				toastMessage: 'User Deleted Successfully',
				type: 'success',
			},
			{ id: 1, toastTitle: 'Hello', toastMessage: 'This is a toast msg', type: 'error' },
			{ id: 2, toastTitle: 'Hello', toastMessage: 'This is a toast msg', type: 'warning' },
			{ id: 3, toastTitle: 'Hello', toastMessage: 'This is a toast msg', type: 'info' },
		]);

		const eventRefs = useRef(null);

		if (!eventRefs.current) {
			eventRefs.current = {
				hideToastAnimation: id => {
					setToasts(prevState => {
						const newState = [...prevState];
						newState[id].fadeOut = true;
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
						eventRefs.current.hideToastAnimation(toasts.length);
					}
				},
				handleSetToast: toast => {
					if (typeof toast === 'object') {
						if (!toast.toastTitle || toast.toastMessage || toast.type) {
							return;
						}
					} else {
						return;
					}
					let id;
					setToasts(prevState => {
						id = prevState.length;
						return [...prevState, { ...toast, id: prevState.length }];
					});
					return id;
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
