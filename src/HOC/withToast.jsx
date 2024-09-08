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
				handleHideToast: id => {
					setToasts(prevState => prevState.filter(toast => toast.id !== id));
				},
				handleSetToast: toast => {
					setToasts(prevState => [...prevState, { ...toast, id: prevState.length }]);
					return toast.id;
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
