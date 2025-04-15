import { useContext } from 'react';

import { HideToastContext, SetToastContext } from '../Contexts/ToastContext';

export default function useToast() {
	const setToast = useContext(SetToastContext);
	const hideToast = useContext(HideToastContext);

	return { setToast, hideToast };
}
