import { useEffect, useRef, useState } from 'react';
import styles from './RangeInputField.module.css';

export default function RangeInputField({ inputRef, disabled, state, handleEnter, name, float }) {
	const [value, setValue] = useState(0);
	const eventRef = useRef({
		handleMouseDown: () => {},
	});

	useEffect(() => {
		setValue(state.toFixed(float));
	}, [float, state]);

	eventRef.current.handleMouseDown = e => {
		if (e.target !== inputRef.current) {
			inputRef.current.blur();
			document.removeEventListener('mousedown', eventRef.current.handleMouseDown);
		}
	};

	return (
		<input
			className={styles.input}
			disabled={disabled}
			name={name}
			onChange={e => {
				if (e.target.value === '' || /^\d{1,}(\.\d{0,2})?$/.test(e.target.value)) {
					setValue(e.target.value);
				}
			}}
			onFocus={e => {
				document.addEventListener('mousedown', eventRef.current.handleMouseDown);
				e.target.select();
			}}
			onKeyDown={handleEnter}
			ref={inputRef}
			type='text'
			value={value}
		/>
	);
}
