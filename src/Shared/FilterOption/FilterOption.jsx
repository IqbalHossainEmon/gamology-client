import { useRef } from 'react';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import styles from './FilterOption.module.css';

function FilterOption({ text, setState, border, state, name }) {
	const eventRef = useRef(null);

	const btnRef = useRef(null);

	if (!eventRef.current) {
		eventRef.current = {
			handleClick: e => {
				// Check if the event is on the btnRef
				if (btnRef.current.contains(e.target)) {
					setState(prev => ({ ...prev, [name]: !prev[name] }), name);
				}
			},
		};
	}

	return (
		<button
			className={`${border && styles.borderBot ? `${styles.borderBot} ` : ''}${
				styles.filterOption
			} ${styles.shadow}`}
			onMouseDown={el => {
				el.preventDefault();
				document.addEventListener('mouseup', eventRef.current.handleClick, { once: true });
			}}
			ref={btnRef}
			type="button"
		>
			<p className={styles.text}>{text}</p>
			<div className={styles.toggleButtonContainer}>
				<ToggleSwitch
					event={eventRef.current.handleClick}
					name={name}
					setState={setState}
					state={state}
				/>
			</div>
		</button>
	);
}

export default FilterOption;
