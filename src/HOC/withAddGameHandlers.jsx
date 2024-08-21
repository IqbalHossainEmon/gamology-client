import { useState } from 'react';

const withAddGameHandlers = Component =>
	function InnerComponent({ setMainState }) {
		const [value, setValue] = useState({});
		const handleBlur = () => {
			setMainState(value);
		};
		const handleSetValue = (v, name) => {
			setValue(prev => ({ ...prev, [name]: v }));
		};

		return <Component handleBlur={handleBlur} handleSetValue={handleSetValue} />;
	};

export default withAddGameHandlers;
