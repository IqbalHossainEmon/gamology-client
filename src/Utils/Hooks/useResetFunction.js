import { useEffect } from 'react';

const useResetFunction = (ref, currentValueRef, setValue, errorShowRef, setError) => {
	useEffect(() => {
		if (ref) {
			ref.current = val => {
				if (val !== currentValueRef.current) {
					setValue(val);
				}
				if (errorShowRef.current) {
					setError('');
				}
			};
			return () => {
				ref.current = null;
			};
		}
	}, [ref, currentValueRef, setValue, errorShowRef, setError]);
};

export default useResetFunction;
